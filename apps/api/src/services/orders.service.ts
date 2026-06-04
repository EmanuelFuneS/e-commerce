import { OrderRepository } from "@workspace/repository";

export class OrderService {
  private repository: OrderRepository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async getOrders() {
    return await this.repository.findMany();
  }

  async getByClient(userId: string) {
    return await this.repository.findByClient(userId);
  }

  async createOrder(data: any, clientId: string) {
    return await this.repository.create(data, clientId);
  }

  async cancelOrder(id: string) {
    return await this.repository.cancelOrder(id);
  }
}
