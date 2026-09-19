# Deployment

One Swarm service, `applications`, on the Hostinger VPS (`ssh hoid`, network `dokploy-network`). `nginx.conf` picks the site by host; Traefik routes every host in `DOMAINS` (`scripts/deploy.sh`) to it with Let's Encrypt. `nouscandidate.technoir.cloud` 301s to the Nous site.

```bash
./scripts/deploy.sh                                   # check, build <sha> on the VPS, roll out, wait for /healthz
ssh hoid docker service rollback applications         # undo
```
