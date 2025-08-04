interface Category {
  id: string;
  name: string;
  description?: string; // Optional field for category description
  parentId?: string; // Optional field for parent category ID, useful for subcategories
}
