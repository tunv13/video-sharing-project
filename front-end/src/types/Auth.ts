import { AxiosError } from "axios";

export type IUser = string | null;
export type AuthContextType = {
  user: IUser;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
export type HookAuthType = AuthContextType | null;
export type ErrorResponse = {
  statusCode: number;
  message: string;
};
