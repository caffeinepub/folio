/**
 * Ensures a URL has a protocol prefix.
 * If the URL already starts with http:// or https://, returns it as-is.
 * Otherwise prepends https://.
 */
export function ensureUrl(url: string | undefined): string {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("mailto:")) return url;
  return `https://${url}`;
}
