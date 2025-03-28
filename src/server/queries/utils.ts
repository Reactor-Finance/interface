/**
 * Joins a filter object into a where clause
 * ex. where:{$a:a, $b:b}
 * @filter: obj
 * @exclude: string[] - any filters to exclude from join
 */
export function joinWheres(
  filter: Record<string, string | number | boolean>,
  { exclude, add }: { exclude?: string[]; add?: string[] }
) {
  let whereConditions = [];
  for (const key in filter) {
    if (exclude?.includes(key)) {
      continue;
    }
    if (filter[key] !== undefined) {
      whereConditions.push(`${key}: $${key}`);
    }
  }
  if (add) {
    whereConditions = [...whereConditions, add];
  }
  console.log(whereConditions, "WHERE CONDITIONSKj");
  const whereClause =
    whereConditions.length > 0 ? `${whereConditions.join(", ")}` : "";
  return whereClause;
}
