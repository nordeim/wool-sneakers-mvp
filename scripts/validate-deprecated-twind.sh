#!/usr/bin/env bash
# Validates Tailwind v3 → v4 deprecated utility usage
set -euo pipefail
cd "$(dirname "$0")/.."

echo "━━━ Deprecated Tailwind Utilities ━━━"

declare -a FILES=()
while IFS= read -r f; do FILES+=("$f"); done < <(find src -name '*.tsx' | sort)

OFFENSES=0
for file in "${FILES[@]}"; do
  while IFS= read -r line; do
    echo "$line"
    ((OFFENSES++))
  done < <(grep -nP 'bg-gradient-to-(r|l|t|b|tr|tl|br|bl)|outline-none[^-]|flex-shrink-0' "$file" 2>/dev/null || true)
done

if (( OFFENSES > 0 )); then
  echo "❌  $OFFENSES deprecated patterns found."
  exit 1
else
  echo "✅  No deprecated Tailwind utilities found."
  exit 0
fi
