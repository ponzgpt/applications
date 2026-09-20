#!/usr/bin/env bash
# Build ONE site's HEAD on the VPS and roll it out as its own Swarm service. See DEPLOYMENT.md.
# Usage: ./scripts/deploy.sh <site>
#
# One site, one service, one Traefik file: deploying here cannot ship another
# company's page, so two people (or two sessions) can work in this repo at once.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

SITE=${1:-}
[ -n "$SITE" ] && [ -d "sites/$SITE" ] || { echo "usage: $0 <site>   (one of: $(ls -1 sites | tr '\n' ' '))" >&2; exit 1; }

APP=applications-$SITE
DOMAINS=$(tr '\n' ' ' < "sites/$SITE/hosts")
DOMAIN=${DOMAINS%% *}
RULE=$(printf 'Host("%s") || ' $DOMAINS); RULE="'${RULE% || }'"   # Traefik accepts double-quoted hosts; single quotes keep it one YAML string
PORT=80
HOST=${HOST:-hoid}

[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "Commit first: deploys are tied to a SHA." >&2; exit 1; }
./scripts/check.sh "$SITE"
SHA=$(git rev-parse --short HEAD)

echo "→ $APP:$SHA → $HOST"
git archive --format=tar HEAD | ssh "$HOST" "rm -rf /opt/$APP/$SHA && mkdir -p /opt/$APP/$SHA && tar -x -C /opt/$APP/$SHA"
ssh "$HOST" "docker build -q -f /opt/$APP/$SHA/sites/$SITE/Dockerfile -t $APP:$SHA /opt/$APP/$SHA" >/dev/null

ssh "$HOST" bash -s <<REMOTE
set -euo pipefail
HC="wget -q -O /dev/null http://127.0.0.1:$PORT/healthz || exit 1"
if docker service inspect $APP >/dev/null 2>&1; then
  docker service update --quiet --no-resolve-image --image $APP:$SHA --health-cmd "\$HC" $APP
else
  docker service create --quiet --no-resolve-image --name $APP --network dokploy-network --replicas 1 --update-order start-first --health-cmd "\$HC" $APP:$SHA
fi
cat > /etc/dokploy/traefik/dynamic/$APP.yml <<YML
http:
  routers:
    $APP-http:
      rule: $RULE
      service: $APP-svc
      middlewares: [redirect-to-https]
      entryPoints: [web]
    $APP-https:
      rule: $RULE
      service: $APP-svc
      entryPoints: [websecure]
      tls: { certResolver: letsencrypt }
  services:
    $APP-svc:
      loadBalancer:
        servers: [{ url: "http://$APP:$PORT" }]
        passHostHeader: true
YML
# keep the current and previous build: source trees and images
ls -1dt /opt/$APP/*/ | tail -n +3 | xargs -r rm -rf
docker images $APP --format '{{.Tag}}' | tail -n +3 | xargs -r -I{} docker rmi $APP:{} >/dev/null 2>&1 || true
REMOTE

for _ in $(seq 30); do curl -fsS "https://$DOMAIN/" -o /dev/null && curl -fsS "https://$DOMAIN/healthz" >/dev/null 2>&1 && { echo "✓ https://$DOMAIN"; exit 0; }; sleep 2; done
echo "✗ https://$DOMAIN/healthz not answering; roll back: ssh $HOST docker service rollback $APP" >&2; exit 1
