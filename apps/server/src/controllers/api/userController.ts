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

  router.post(
    "/profile",
    AuthenticateUser,
    async (req: Request, res: Response) => {
      const { bio, image } = req.headers as ProfileType;
      const { userId } = req as any;
      if (userId && (bio || image)) {
        const profile = await updateProfile(Number(userId), { bio, image });
        res.status(200).send({
          profile,
        });
        return;
      }

      res.status(401).send({
        status: "Invalid data",
      });
    }
  );

  return router;
}
