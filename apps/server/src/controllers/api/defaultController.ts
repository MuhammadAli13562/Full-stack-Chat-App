import { Request, Response, Router } from "express";
import { GetHistoricalData } from "../../services/historicalService";

export default function defaultController(): Router {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    const { username } = req.headers as { username: string };

    const user_data = await GetHistoricalData(username);
    res.status(200).send({
      user_data,
    });
  });

  return router;
}
