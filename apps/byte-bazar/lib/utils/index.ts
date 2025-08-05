export class Utils {
  generateSlug(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  formatPrice(price: number, locale?: string, currency?: string): string {
    return new Intl.NumberFormat(locale || "es-AR", {
      style: "currency",
      currency: currency || "ARS",
    }).format(price);
  }

  formatStock(stock: number): string {
    if (stock === 0) return "Out of stock";
    if (stock < 5) return "Low stock";

    return `${stock} in stock`;
  }
}

export default new Utils();
