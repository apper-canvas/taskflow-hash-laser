import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  // Simulate API delay
  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.categories].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getById(id) {
    await this.delay();
    const category = this.categories.find(category => category.Id === id);
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  }

  async create(categoryData) {
    await this.delay();
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      ...categoryData,
      orderIndex: this.categories.length + 1
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    const updatedCategory = {
      ...this.categories[index],
      ...updateData
    };
    
    this.categories[index] = updatedCategory;
    return { ...updatedCategory };
  }

  async delete(id) {
    await this.delay();
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    this.categories.splice(index, 1);
    return { success: true };
  }
}

export default new CategoryService();