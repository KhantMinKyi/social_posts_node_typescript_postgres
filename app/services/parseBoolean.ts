export function parseBoolean(string: any) {
  return string === "true" ? true : string === "false" ? false : undefined;
}
