# Deployment

One Swarm service per site on the Hostinger VPS (`ssh hoid`, network `dokploy-network`): `applications-<site>`, built from `sites/<site>/Dockerfile` with the repo root as context. Each site's `hosts` file drives its own Traefik router (`/etc/dokploy/traefik/dynamic/applications-<site>.yml`) with Let's Encrypt; aliases like `nouscandidate` and `37signals` 301 inside that site's own `nginx.conf`.

```bash
./scripts/deploy.sh nousresearch                        # check that site, build <sha>, roll out, wait for /healthz
./scripts/deploy.sh omarchy
ssh hoid docker service rollback applications-omarchy   # undo, one site at a time
```

A deploy never touches another site's service, image or router, so two sessions can work here at the same time. The retired single `applications` service and its `applications.yml` are gone; nothing should recreate them.
