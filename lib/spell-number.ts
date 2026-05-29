/**
 * Small spelled-out number map used by section subtitles where the wording
 * reads better than digits. Falls back to the numeric form when the value
 * is outside the curated range.
 */
const WORDS: Record<"en" | "vi", Record<number, string>> = {
  en: {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
  },
  vi: {
    1: "Một",
    2: "Hai",
    3: "Ba",
    4: "Bốn",
    5: "Năm",
    6: "Sáu",
    7: "Bảy",
    8: "Tám",
    9: "Chín",
    10: "Mười",
  },
};

export function spellNumber(n: number, locale: string): string {
  const dict = locale === "vi" ? WORDS.vi : WORDS.en;
  return dict[n] ?? String(n);
}
