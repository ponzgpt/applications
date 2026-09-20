#!/usr/bin/env bash
# Every site builds, passes its own check, and the committed HTML is what the build produces.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
(cd nousresearch && node build.mjs && node check.mjs)
git diff --exit-code --stat -- nousresearch/index.html nousresearch/es nousresearch/zh nousresearch/sitemap.xml || { echo "nousresearch: built HTML differs from the committed files; commit the build." >&2; exit 1; }
(cd omarchy && node check.mjs)
echo "check passed"
