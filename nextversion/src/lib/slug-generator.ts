export function generateSlug(title: string, id?: string): string {
  // Convert ID or timestamp to a short hex suffix
  const suffix = (id ?? Date.now().toString())
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 8) // short for readability
    .toLowerCase();

  // Convert suffix to hex for consistency
  const hexSuffix = parseInt(suffix, 36).toString(16);

  // Clean & convert title to slug
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 50); // shorter to leave space for suffix

  return `${baseSlug}-${hexSuffix}`;
}

export function generateShareUrl(slug: string, baseUrl?: string): string {
  const base =
    baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${base}/projects/${slug}`;
}
