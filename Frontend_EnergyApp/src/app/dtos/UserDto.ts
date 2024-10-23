import {Role} from "./Role";

export interface UserDTO {
  id: string;
  firstName: string;
  secondName: string;
  email: string;
  role: Role;
}
