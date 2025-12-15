export class ProductHelper {
  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  static generateTags(name: string, description: string): string[] {
    const nameWords = name
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 3);
    const descWords = description
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 5)
      .slice(0, 5);
    return [...new Set([...nameWords, ...descWords])];
  }

  static generateSKU(categoryId: string, brandId: string): string {
    const timestamp = Date.now().toString(36);
    return `${categoryId.slice(categoryId.length - 3)}-${brandId.slice(brandId.length - 3)}-${timestamp}`.toUpperCase();
  }
}
