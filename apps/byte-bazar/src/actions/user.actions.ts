"use server";
import { UserService } from "../services/user.service";

const userService = () => {
  return new UserService();
};

export const getClients = async () => {
  return await userService().getClient();
};

export const getClientById = async (id: string) => {
  return await userService().getClientById(id);
};
