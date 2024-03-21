import prisma from "../prisma/prismaClient";
import generateHash from "../utils/generateHash";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "123";

interface tokenPayload {
  username: string;
  passwordHash: string;
}

const verifyLogin = async (username: string, password: string) => {
  const passHashfromLogin = generateHash(username, password);
  const data = await prisma.user.findUnique({
    where: {
      username,
      passwordHash: passHashfromLogin,
    },
  });

  return data !== null;
};

const verifyJwtToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, secret) as tokenPayload;
    const { username, passwordHash } = decoded;

    const data = await prisma.user.findUnique({
      where: {
        username,
        passwordHash,
      },
      select: {
        id: true,
      },
    });

    return data;
  } catch (error: any) {
    console.log("Verification Error : ", error.message);
  }
  return false;
};

const generateJwtToken = (username: string, password: string) => {
  const passwordHash = generateHash(username, password);
  const payload: tokenPayload = { username, passwordHash };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};

export { verifyJwtToken, verifyLogin, generateJwtToken };
