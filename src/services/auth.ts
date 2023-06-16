import axios from "axios";
import { api } from "./Client";

export class AuthService {
  async test(): Promise<any> {
    try {
      const res = await api.get("/restaurants");
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async login(): Promise<any> {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: "piki",
        password: "123123",
      });
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export const authService = new AuthService();
