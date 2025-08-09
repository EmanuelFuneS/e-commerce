export function serializeDecimals<T>(obj: T) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (
        value &&
        typeof value === "object" &&
        value.constructor?.name === "Decimal"
      ) {
        return value.toString();
      }
      return value;
    })
  );
}
