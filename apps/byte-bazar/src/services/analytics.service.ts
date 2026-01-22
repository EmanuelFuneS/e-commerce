import { AnalyticsRepository } from "../repositories/analytics.repository";

export class AnalyticsService {
  private repository: AnalyticsRepository;
  private tableProducts = "products";
  private tableCategories = "categories";
  private tableBrands = "brands";
  private tableUsers = "users";
  private tableOrders = "orders";

  constructor() {
    this.repository = new AnalyticsRepository();
  }

  async getCountProducts() {
    return await this.repository.countTable(this.tableProducts);
  }

  async getCountCategories() {
    return await this.repository.countTable(this.tableCategories);
  }

  async getCountBrands() {
    return await this.repository.countTable(this.tableBrands);
  }

  getCountUsers() {
    return this.repository.countTable(this.tableUsers);
  }

  async getCountOrders() {
    return await this.repository.countTable(this.tableOrders);
  }

  async getMonthlyStatsProducts() {
    return await this.repository.getMonthlyStatsTable(this.tableProducts);
  }

  async getMonthlyStatsCategories() {
    return await this.repository.getMonthlyStatsTable(this.tableCategories);
  }

  async getMonthlyStatsBrands() {
    return await this.repository.getMonthlyStatsTable(this.tableBrands);
  }

  async getMonthlyStatsUsers() {
    return await this.repository.getMonthlyStatsTable(this.tableUsers);
  }

  async getMonthlyStatsOrders() {
    return await this.repository.getMonthlyStatsTable(this.tableOrders);
  }
}
