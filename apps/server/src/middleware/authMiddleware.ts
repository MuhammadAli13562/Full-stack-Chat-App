import { Response, NextFunction } from "express";
import { verifyJwtToken } from "../services";

export const AuthenticateUser = async (req: any, res: Response, next: NextFunction) => {
  const { token } = req.headers as { token: string };

  if (token) {
    const data = await verifyJwtToken(token);

    if (data) {
      res.setHeader("userId", String(data.id));
      next();
      return;
    }
  }

  res.status(401).send({
    status: "Unauthorized",
  });
};
