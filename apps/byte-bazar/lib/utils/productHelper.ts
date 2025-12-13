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
    const words = `${name} ${description}`.toLowerCase().split(/\s+/);
    return [...new Set(words.filter((word) => word.length > 3))].slice(0, 10);
  }

  static generateSKU(categoryId: string, brandId: string): string {
    const timestamp = Date.now().toString(36);
    return `${categoryId.slice(0, 3)}-${brandId.slice(0, 3)}-${timestamp}`.toUpperCase();
  }
}
