/** Returns true if the object is not null, and false otherwise.
 * Lets typescript know that about it with the use of a user defined type guard. */
export function isNonNullable<T>(item: T): item is NonNullable<T> {
  return item !== null && item !== undefined;
}

/** Returns a mapped version of the array without any null values */
export function mapFilterNull<T>(
  array: Array<T>,
  func: (item: T) => T | null
): Array<T> {
  return array.map(func).filter(isNonNullable);
}
