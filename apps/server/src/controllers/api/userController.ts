import { Request, Response, Router } from "express";
import { AuthenticateUser } from "../../middleware/authMiddleware";
import { updateProfile } from "../../services";

type ProfileType = {
  bio: string;
  image: string;
  userId: string;
};

export default function userController(): Router {
  const router = Router();

  router.post("/profile", AuthenticateUser, async (req: Request, res: Response) => {
    const { bio, image } = req.headers as ProfileType & { username: string };
    const userId = res.getHeader("userId");
    try {
      if (!(userId && (bio || image))) throw Error("Incomplete data");
      const profile = await updateProfile(Number(userId), { bio, image });
      res.status(200).send({
        profile,
      });
    } catch (error: any) {
      res.status(401).send({
        message: error.message,
      });
    }
  });

  return router;
}
