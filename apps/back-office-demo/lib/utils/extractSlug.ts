/**
 * Extracts the slug from a path.
 */
function extractSlug(path: string): number {
  const segments = path.split("/");
  const slug = segments[2];
  return Number(slug);
}

export default extractSlug;
