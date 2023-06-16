import { authService } from "@/services/auth";
import axios from "axios";
import React from "react";

const useAuth = () => {
  const doLogin = async () => {
    try {
      const data = await authService.login();
      const { access_token, refresh_token } = data.user;
      if (data.user) {
        const res = await axios.post(
          "/api/auth",
          { access_token, refresh_token },
          { baseURL: "http://localhost:3001" }
        );
        if (res?.status === 200) {
          // @ts-ignore
          window.location = `/`;
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return { doLogin };
};

export default useAuth;
