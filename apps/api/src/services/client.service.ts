import { UserRepository } from "@workspace/repository";

export class ClientService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getClients() {
    return await this.userRepository.getClients();
  }

  async getClientById(id: string) {
    return await this.userRepository.getClientById(id);
  }
}
