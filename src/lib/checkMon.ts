export function checkMon(symbol: string) {
  if (symbol.toLowerCase() === "wmon") {
    return "MON";
  }
  return symbol;
}
