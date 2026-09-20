#!/usr/bin/env bash
# Every site builds, passes its own check, and the committed HTML is what the build produces.
# Usage: ./scripts/check.sh [site]   — no argument checks every site.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if [ $# -gt 0 ]; then
  [ -d "sites/$1" ] || { echo "no such site: $1 (have: $(ls -1 sites | tr '\n' ' '))" >&2; exit 1; }
  SITES=$1
else
  SITES=$(ls -1 sites)
fi

for s in $SITES; do
  for f in hosts nginx.conf Dockerfile check.mjs; do
    [ -f "sites/$s/$f" ] || { echo "sites/$s: missing $f — every site owns its own" >&2; exit 1; }
  done
  # A site with a build step declares what that build writes, and must have
  # committed exactly that — otherwise the deployed page is not the page in git.
  if [ -f "sites/$s/build.mjs" ]; then
    [ -f "sites/$s/built" ] || { echo "sites/$s: has build.mjs but no 'built' file listing what it writes" >&2; exit 1; }
    (cd "sites/$s" && node build.mjs)
    BUILT=$(sed "s|[^ ]*|sites/$s/&|g" "sites/$s/built")
    git diff --exit-code --stat -- $BUILT >/dev/null ||
      { echo "$s: built files differ from the committed ones; commit the build." >&2; exit 1; }
  fi
  (cd "sites/$s" && node check.mjs)
done
echo "check passed"
