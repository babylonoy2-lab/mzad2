export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}
export function clampPageSize(requested: number, maximum = 50): number {
  return Math.max(1, Math.min(Math.trunc(requested), maximum));
}
