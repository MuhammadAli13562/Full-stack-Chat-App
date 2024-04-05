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

export type ProfileDatatype = {
  bio?: string;
  image?: string;
};

export type MessageInfotype = {
  content: string;
  roomId: number;
};

export type GroupInfoType = {
  contactIds: number[];
  name: string;
};

export type ReadMessageType = {
  roomId: number;
  messageIds: number[];
};
