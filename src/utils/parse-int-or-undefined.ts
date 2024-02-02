export function parseIntOrUndefined(queryParam: unknown): number | undefined {
  if (typeof queryParam !== "string") {
    return undefined;
  }

  const parsed = parseInt(queryParam, 10);
  return isNaN(parsed) ? undefined : parsed;
}
