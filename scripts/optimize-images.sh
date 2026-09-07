#!/usr/bin/env bash
# Convert every PNG/JPG under public/images/ to compressed WebP and delete the original.
# Resolution is preserved in full (diagrams are dense — they must stay readable when zoomed).
#
#   ./scripts/optimize-images.sh              # whole public/images tree
#   ./scripts/optimize-images.sh databases    # just one chapter folder
#
# Requires: cwebp  ->  brew install webp
set -euo pipefail

cd "$(dirname "$0")/.."
TARGET="public/images/${1:-}"
QUALITY="${QUALITY:-86}"

if ! command -v cwebp >/dev/null; then
  echo "cwebp not found. Install it with:  brew install webp" >&2
  exit 1
fi

found=0
while IFS= read -r -d '' img; do
  found=1
  out="${img%.*}.webp"
  before=$(du -h "$img" | cut -f1)
  cwebp -quiet -q "$QUALITY" -m 6 -sharp_yuv "$img" -o "$out"
  after=$(du -h "$out" | cut -f1)
  rm "$img"
  echo "✓ $(basename "$img")  ${before} -> ${after}   $(basename "$out")"
done < <(find "$TARGET" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

[ "$found" -eq 0 ] && echo "Nothing to convert in $TARGET" || echo "Done."
