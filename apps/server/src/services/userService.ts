import prisma from "../prisma/prismaClient";
import { contactSelect, profileSelect, userSelect } from "../utils/functions/PrismaSelections";
import generateHash from "../utils/functions/generateHash";
import { ProfileDatatype, userInfotype } from "../utils/types";

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
      select: userSelect,
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

export const updateProfile = async (userId: number, profileData: ProfileDatatype) => {
  try {
    const newprofile = {
      userId,
      ...profileData,
    };
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: newprofile,
      create: newprofile,
      select: profileSelect,
    });

    if (!profile) throw Error("Error creating profile");
    return profile;
  } catch (error: any) {
    console.log("Error : ", error.message);
    throw error;
  }
};

export const addtoContacts = async (userId: number, contact_username: string) => {
  try {
    const contact = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        contacts: {
          connect: {
            username: contact_username,
          },
        },
      },
      select: contactSelect,
    });
    if (!contact) throw Error("Cant update contacts");
    console.log("New Contact Created");

    return contact;
  } catch (error: any) {
    console.log("Error : ", error.message);
    return null;
  }
};
