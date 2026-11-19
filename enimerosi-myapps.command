#!/bin/bash
# =====================================================================
#  Ενημέρωση MyApps — Christos S Magides — έκδοση 19-11-2026
#  Παίρνει από το GitHub ΜΟΝΟ ό,τι άλλαξε και ενημερώνει τους φακέλους
#  μέσα στο ~/Desktop/MyApps. Δεν σβήνει ποτέ τίποτα: αν ένας φάκελος
#  έχει δικές σου αλλαγές, πρώτα τον αντιγράφει στα «ΠΑΛΙΑ ΑΡΧΕΙΑ».
# =====================================================================

MYAPPS="${MYAPPS:-$HOME/Desktop/MyApps}"
OWNER="Christos1354"
REPOS="${REPOS:-innerlife1111 kalimera-mou oktoichos english-4all chords News mnimi-sofia sofoi-4all QR-4all isokratis-4all Ygeia-4all photo-cleanup-4all ypografi}"
PALIA="$MYAPPS/ΠΑΛΙΑ ΑΡΧΕΙΑ"
STIGMI="$(date +%d-%m-%Y_%H-%M)"
export GIT_TERMINAL_PROMPT=0

PRASINO=$'\e[1;32m'; KITRINO=$'\e[1;33m'; KOKKINO=$'\e[1;31m'; MPLE=$'\e[1;36m'; TELOS=$'\e[0m'

clear
echo
echo "${MPLE}   🔄  ΕΝΗΜΕΡΩΣΗ MyApps ΑΠΟ ΤΟ GitHub${TELOS}"
echo "${MPLE}   ─────────────────────────────────${TELOS}"
echo

telos() {
  echo
  echo "   Πάτησε Enter για να κλείσει αυτό το παράθυρο."
  read -r _
  osascript -e 'tell application "Terminal" to close front window' >/dev/null 2>&1 &
  exit 0
}

# 1. Υπάρχει το εργαλείο git της Apple;
if ! xcode-select -p >/dev/null 2>&1; then
  echo "${KITRINO}   Μία φορά μόνο: ο Mac χρειάζεται ένα δωρεάν εργαλείο της Apple.${TELOS}"
  echo "   Σε λίγο θα εμφανιστεί παράθυρο. Πάτα «Εγκατάσταση» και περίμενε να τελειώσει."
  echo "   Μετά κάνε ξανά διπλό κλικ στο εικονίδιο «Ενημέρωση MyApps»."
  xcode-select --install >/dev/null 2>&1
  osascript -e 'display dialog "Πάτα «Εγκατάσταση» στο παράθυρο της Apple.\n\nΌταν τελειώσει, κάνε ξανά διπλό κλικ στο «Ενημέρωση MyApps»." with title "Ενημέρωση MyApps" buttons {"Εντάξει"} default button 1' >/dev/null 2>&1
  telos
fi

# 2. Υπάρχει ο φάκελος MyApps;
if [ ! -d "$MYAPPS" ]; then
  echo "${KOKKINO}   Δεν βρήκα τον φάκελο MyApps στην Επιφάνεια Εργασίας.${TELOS}"
  telos
fi

ENTAXEI=""; ALLAXAN=""; NEA=""; PROVLIMA=""; ANTIGRAFA=""

for R in $REPOS; do
  D="$MYAPPS/$R"
  URL="https://github.com/$OWNER/$R.git"
  printf "   %-22s" "$R"

  # Φάκελος που υπάρχει αλλά δεν είναι συνδεδεμένος με το GitHub:
  # τον φυλάμε ολόκληρο στα ΠΑΛΙΑ ΑΡΧΕΙΑ και φέρνουμε καθαρό αντίγραφο.
  METAKINITHIKE=""
  if [ -d "$D" ] && [ ! -d "$D/.git" ]; then
    mkdir -p "$PALIA"; METAKINITHIKE=1
    mv "$D" "$PALIA/${R}_πριν-τη-σύνδεση_$STIGMI"
    ANTIGRAFA="$ANTIGRAFA $R"
  fi

  if [ ! -d "$D/.git" ]; then
    if git clone -q --depth 1 "$URL" "$D" >/dev/null 2>&1; then
      echo "${PRASINO}✓ κατέβηκε${TELOS}"; NEA="$NEA $R"
    else
      rm -rf "$D" 2>/dev/null
      if [ -n "$METAKINITHIKE" ]; then
        mv "$PALIA/${R}_πριν-τη-σύνδεση_$STIGMI" "$D"
        ANTIGRAFA="${ANTIGRAFA% $R}"
      fi
      echo "${KOKKINO}✗ δεν κατέβηκε (ιδιωτικό ή χωρίς διαδίκτυο)${TELOS}"; PROVLIMA="$PROVLIMA $R"
    fi
    continue
  fi

  cd "$D" || { echo "${KOKKINO}✗${TELOS}"; PROVLIMA="$PROVLIMA $R"; continue; }
  git remote set-url origin "$URL" >/dev/null 2>&1 || git remote add origin "$URL" >/dev/null 2>&1
  if ! git fetch -q --depth 1 origin main >/dev/null 2>&1; then
    echo "${KOKKINO}✗ δεν συνδέθηκε (ιδιωτικό ή χωρίς διαδίκτυο)${TELOS}"; PROVLIMA="$PROVLIMA $R"; continue
  fi
  NEO="$(git rev-parse FETCH_HEAD)"
  if [ "$(git rev-parse HEAD 2>/dev/null)" = "$NEO" ] && [ -z "$(git status --porcelain --untracked-files=no)" ]; then
    echo "✓ ήταν ήδη ενημερωμένο"; ENTAXEI="$ENTAXEI $R"; continue
  fi
  # Αν έχεις αλλάξει κάτι μόνος σου, φυλάμε πρώτα αντίγραφο.
  if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
    mkdir -p "$PALIA"
    cp -R "$D" "$PALIA/${R}_δικές-μου-αλλαγές_$STIGMI"
    ANTIGRAFA="$ANTIGRAFA $R"
  fi
  if git reset -q --hard "$NEO" >/dev/null 2>&1; then
    echo "${PRASINO}✓ ενημερώθηκε${TELOS}"; ALLAXAN="$ALLAXAN $R"
  else
    echo "${KOKKINO}✗ πρόβλημα${TELOS}"; PROVLIMA="$PROVLIMA $R"
  fi
done

echo
echo "${MPLE}   ─────────────────────────────────${TELOS}"
[ -n "$ALLAXAN" ]   && echo "${PRASINO}   Ενημερώθηκαν:${TELOS}$ALLAXAN"
[ -n "$NEA" ]       && echo "${PRASINO}   Κατέβηκαν:${TELOS}$NEA"
[ -n "$ANTIGRAFA" ] && echo "${KITRINO}   Φυλάχτηκε αντίγραφο στα ΠΑΛΙΑ ΑΡΧΕΙΑ:${TELOS}$ANTIGRAFA"
[ -n "$PROVLIMA" ]  && echo "${KOKKINO}   Δεν έγιναν:${TELOS}$PROVLIMA"
echo
echo "${PRASINO}   ✅ ΤΕΛΟΣ${TELOS}"

MINIMA="Ενημερώθηκαν: $(echo $ALLAXAN $NEA | wc -w | tr -d ' ')\nΉταν ήδη εντάξει: $(echo $ENTAXEI | wc -w | tr -d ' ')"
[ -n "$PROVLIMA" ] && MINIMA="$MINIMA\nΔεν έγιναν:$PROVLIMA"
osascript -e "display notification \"$MINIMA\" with title \"Ενημέρωση MyApps\"" >/dev/null 2>&1
telos
