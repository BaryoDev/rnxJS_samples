#!/usr/bin/env bash
# Assemble dist/ for the playground.
#
#   dist/        the released build, whatever is currently on npm
#   dist/next/   a build from rnxjs main
#
# Both serve the same pages. Only the vendored bundle and the stamped version
# differ, so a difference you see between the two channels is a difference in
# the library and nothing else.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
rnxjs="${RNXJS_REPO:-$HOME/repos/rnxjs}"
dist="$here/dist"

PAGES=(index.html index.css styles.css chat.html dashboard.html datatable.html
       forms.html settings.html shop.html tasks.html LICENSE README.md)
DIRS=(django-demo express-demo)

stamp() {  # stamp() <dir> <version>
  python3 "$here/stamp.py" "$1" "$2"
}

copy_pages() {  # copy_pages <target dir>
  mkdir -p "$1"
  for f in "${PAGES[@]}"; do [ -e "$here/$f" ] && cp "$here/$f" "$1/"; done
  for d in "${DIRS[@]}"; do [ -d "$here/$d" ] && cp -R "$here/$d" "$1/"; done
}

rm -rf "$dist"

# ---- released channel -------------------------------------------------------
released="$(npm view @arnelirobles/rnxjs version)"
echo "released: $released"
copy_pages "$dist"
curl -fsSL "https://cdn.jsdelivr.net/npm/@arnelirobles/rnxjs@${released}/dist/rnx.global.js" \
  -o "$dist/rnx.global.js"
stamp "$dist" "$released"

# ---- main channel -----------------------------------------------------------
# Built from source rather than downloaded, because the point of this channel is
# to show what main does before it is published.
[ -d "$rnxjs" ] || { echo "rnxjs repo not found at $rnxjs" >&2; exit 1; }
sha="$(git -C "$rnxjs" rev-parse --short HEAD)"
echo "main: $sha"
( cd "$rnxjs" && npm run build >/dev/null )
copy_pages "$dist/next"
cp "$rnxjs/dist/rnx.global.js" "$dist/next/rnx.global.js"
stamp "$dist/next" "main@$sha"

echo
echo "dist/       $(du -sh "$dist" | cut -f1)   rnx.global.js $(wc -c < "$dist/rnx.global.js") bytes"
echo "dist/next/  rnx.global.js $(wc -c < "$dist/next/rnx.global.js") bytes"
