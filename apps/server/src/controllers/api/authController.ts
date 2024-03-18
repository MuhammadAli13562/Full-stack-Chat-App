import { Request, Response, Router } from "express";
import {
  CreateNewUser,
  generateJwtToken,
  isUserRegistered,
  verifyJwtToken,
  verifyLogin,
} from "../../services";

export default function authController(): Router {
  const router = Router();

  router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.headers as {
      username: string;
      password: string;
    };

    console.log("login request received");

    if (username && password) {
      const isVerified = await verifyLogin(username, password);
      if (isVerified) {
        const token = generateJwtToken(username, password);
        res.set("token", token);
        console.log("token issued");

        res.status(200).send({ status: "Authorized - Token Issued" });
        return;
      }
    }

    res.status(401).send({ status: "Invalid Username & Password" });
  });
  router.post("/register", async (req: Request, res: Response) => {
    const { name, username, email, password } = req.headers as {
      name: string;
      username: string;
      email: string;
      password: string;
    };

    console.log("in register");

    if (name && username && password && email) {
      const userInfo = { name, username, password, email };
      const isRegistered = await isUserRegistered(userInfo);

      if (isRegistered) {
        res.status(401).send({ status: "Email or Username Already in use !" });
        return;
      }

      const user = await CreateNewUser(userInfo);
      if (user) {
        res.status(200).send({ status: "New User Created Successfully !" });
        return;
      }
      res.status(401).send({ status: "Error Creating New User ! Try again !" });
      return;
    }

    res.status(401).send({
      status: "Incomplete Registration data",
    });
  });
  router.post("/verify", async (req: Request, res: Response) => {
    const { token } = req.headers as { token: string };
    const isVerified = await verifyJwtToken(token);

    if (isVerified) {
      res.status(200).send({ status: "Verified" });
      return;
    }

    res.status(401).send({ status: "Unverified" });
  });

  return router;
}
