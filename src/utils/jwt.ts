import jwt from "jsonwebtoken";


interface ITokenPayload {
  id: number;
  username: string;
  role: number;
}

const secret: string = "secret";

export function generateToken(payload: ITokenPayload): string {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function decodeToken(token: string): ITokenPayload {
  return jwt.verify(token, secret) as ITokenPayload;
}