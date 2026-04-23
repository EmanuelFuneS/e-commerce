import { UserRepository } from "@workspace/repository";

export class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getClient() {
    return await this.userRepository.getClient();
  }

  async getClientById(id: string) {
    return await this.userRepository.getClientById(id);
  }
}
