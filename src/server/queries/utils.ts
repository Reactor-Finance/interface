/**
 * Joins a filter object into a where clause
 * ex. where:{$a:a, $b:b}
 */
export function joinWheres(filter: Record<string, string | number | boolean>) {
  const whereConditions = [];
  for (const key in filter) {
    if (filter[key] !== undefined) {
      whereConditions.push(`${key}: $${key}`);
    }
  }
  const whereClause = whereConditions.length
    ? `where: { ${whereConditions.join(", ")} }`
    : "";
  return whereClause;
}
