import prisma from "../prisma/prismaClient";
import generateHash from "../utils/generateHash";

type userInfotype = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type profileDatatype = {
  bio?: string;
  image?: string;
};

export const CreateNewUser = async (userInfo: userInfotype) => {
  const { name, username, password, email } = userInfo;
  const passwordHash = generateHash(username, password);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        passwordHash,
      },
    });
    return user;
  } catch (error: any) {
    console.log("Error Occured :", error.message);
  }
  return null;
};

export const isUserRegistered = async (userInfo: userInfotype) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: userInfo.username,
        },
        {
          email: userInfo.email,
        },
      ],
    },
  });

  return users.length !== 0;
};

export const updateProfile = async (
  userId: number,
  profileData: profileDatatype
) => {
  const newprofile = {
    userId,
    ...profileData,
  };
  try {
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: newprofile,
      create: newprofile,
    });

    if (!profile) throw Error("Error creating profile");
    return profile;
  } catch (error: any) {
    console.log("Error : ", error.message);
    return null;
  }
};

export const addtoContacts = async (userId: number, contactId: number) => {
  try {
    const contact = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        contacts: {
          connect: {
            id: contactId,
          },
        },
      },
    });
    if (!contact) throw Error("Cant update contacts");
    return contact;
  } catch (error: any) {
    console.log("Error : ", error.message);
    return null;
  }
};
