import humanize from "./humanize";

export default function titleize(word) {
  return humanize(
    this.underscore(word)
  ).replace(/(^|[\s¿/]+)([a-z])/g, function(
    match,
    boundary,
    letter,
    idx,
    string
  ) {
    return match.replace(letter, letter.toUpperCase());
  });
}
