import { Request, Response, Router } from "express";
import { GetHistoricalData } from "../../services";

export default function defaultController(): Router {
  const router = Router();

  router.get("/default", async (req: Request, res: Response) => {
    const { username } = req.headers as { username: string };
    try {
      if (!username) throw Error("No Username Provided");
      const user_data = await GetHistoricalData(username);
      res.status(200).send({
        user_data,
      });
    } catch (error: any) {
      console.log("Error while fetching historical : ", error.message);
      res.status(401).send({
        message: error.message,
      });
    }
  });

  return router;
}
