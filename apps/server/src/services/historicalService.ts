import { PrismaClient } from "@prisma/client";
import { HistoricalDataSelect } from "../utils/PrismaSelections";

const prisma = new PrismaClient();

const GetHistoricalData = async (username: string) => {
  const data = await prisma.user.findUnique({
    where: {
      username,
    },
    select: HistoricalDataSelect,
  });

  return data;
};

export { GetHistoricalData };

// GetHistoricalData
// >>> Fetches default data for a user <<<
// -Fetches User's Rooms with latest 5 messages and all participants ,
// -Fetches User's Contacts
// -Fetches User's Profile
