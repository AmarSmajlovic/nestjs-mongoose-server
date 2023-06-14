export interface JwtPayload {
  aud: string;
  jti: string;
  iat: number;
  nbf: number;
  sub: string;
  scopes: string[];
  exp: number;
}
