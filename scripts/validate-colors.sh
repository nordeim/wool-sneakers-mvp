#!/usr/bin/env bash
# validate-colors.sh
# Checks for raw hex color values inside className/class/className={cn(...)} strings.
# Counts offending lines. Returns exit 1 if any found, exit 0 if clean.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍  Raw-Hex Color Validator (Tailwind v4 Discipline)"
echo "   (Only checks className strings, not style={{..}})"
echo ""

OFFENSES=0

# Find all TSX files
declare -a ALL_FILES=()
while IFS= read -r f; do ALL_FILES+=("$f"); done < <(find src -name '*.tsx' | sort)

for FILE in "${ALL_FILES[@]}"; do
  # Extract className=... content and check for raw hex colors
  # This regex looks for [#[hex]] or #[0-9A-F]{3,6} within className strings
  MATCHES=$(perl -ne '
    next unless /className=/;
    s/\s//g;  # remove all whitespace from line for simpler parsing
    # Find color-[#...], bg-[#...], text-[#...], border-[#...], ring-[#...], etc.
    while (/(([a-z]+:)?(?:bg|text|border|ring|shadow|fill|stroke|decoration|caret)-\[?(?:#[0-9A-Fa-f]{3,6}(?:\/[0-9]+|(?:\.[0-9]+)?)?)\]?)/g) {
      print "$ARGV: $.: $1\n";
    }
' "$FILE" 2>/dev/null || true)

  if [[ -n "$MATCHES" ]]; then
    echo "$MATCHES"
    ((OFFENSES+=$(echo "$MATCHES" | wc -l)))
  fi
done

echo ""
if (( OFFENSES > 0 )); then
  echo "❌  $OFFENSES raw hex values found in className utilities."
  echo "     Replace with @theme token utilities (e.g. text-wool-900)."
  echo ""
  exit 1
else
  echo "✅  Zero raw hex values in className utilities."
  echo ""
  exit 0
fi
