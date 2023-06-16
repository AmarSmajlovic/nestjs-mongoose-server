import { NextApiResponse } from "next";
import cookie from "cookie";
import { verify, decode, sign, JwtPayload } from "jsonwebtoken";
import { IncomingMessage } from "http";
import axios from "axios";

const setCookie = (tokenName: string, token: string) => {
  const data = decode(token) as any;
  const expiresIn = data.exp;

  const currentTime = Math.floor(Date.now() / 1000);
  const maxAge = expiresIn - currentTime;

  const cookieStr = cookie.serialize(tokenName, token, {
    maxAge,
    path: "/",
  });

  return cookieStr;
};

export const setSession = (
  access_token: string,
  refresh_token?: string,
  res?: NextApiResponse
) => {
  const cookies = [];
  const accesToken = setCookie("access_token", access_token);
  cookies.push(accesToken);
  if (refresh_token) {
    const refreshToken = setCookie("refresh_token", refresh_token as string);
    cookies.push(refreshToken);
  }
  res?.setHeader("Set-Cookie", cookies);
};

export const getSession = (req?: IncomingMessage): any | null => {
  if (req) {
    try {
      const cookies = cookie.parse(req.headers.cookie || "");
      const access_token = cookies.access_token;
      console.log(access_token);
      return access_token as string;
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const refreshSession = async () => {
  try {
    const cookies = cookie.parse(document.cookie);
    const refresh_token = cookies.refresh_token;

    if (refresh_token) {
      const {
        data: { accessToken },
      } = await axios.post("http://localhost:3000/refresh", {
        refresh_token,
      });
      if (accessToken) {
        const res = await axios.post(
          "/api/auth",
          { access_token: accessToken },
          { baseURL: "http://localhost:3001" }
        );

        return accessToken;
      }
    }
  } catch (error) {
    console.error("Error refreshing session:", error);
  }

  return null;
};
