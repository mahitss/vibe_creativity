export function cn(...classes: Array<false | null | string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

