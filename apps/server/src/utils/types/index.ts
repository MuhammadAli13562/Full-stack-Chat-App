export type ReactionInfoType = {
  messageId: number;
  type: string;
};

export type userInfotype = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type profileDatatype = {
  bio?: string;
  image?: string;
};

export type MessageInfotype = {
  content: string;
  roomId: number;
};
