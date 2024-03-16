import { Request, Response, Router } from "express";
import { GetDefaultData } from "../../services/defaultService";

export default function defaultController(): Router {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    const { username } = req.headers as { username: string };

    const user_data = await GetDefaultData(username);
    res.status(200).send({
      user_data,
    });
  });

  return router;
}
