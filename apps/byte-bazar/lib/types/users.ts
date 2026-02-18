import { ClientWithRelations } from "../../src/repositories/clients.repository";

export interface User extends ClientWithRelations {}

export type Role = "admin" | "user" | "guest";
