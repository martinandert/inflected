import underscore from "./underscore";

export default function toConstantCase(word) {
  return underscore(word).toUpperCase().replace(/\s+/g, "_");
}
