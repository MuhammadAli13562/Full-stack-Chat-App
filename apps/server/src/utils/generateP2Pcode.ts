const generateP2PRoomCodes = async (userId: number, contactId: number) => {
  // generate peer to peer room codes
  const users = [userId, contactId].sort();
  const code = users.join("_");
  return code;
};

export default generateP2PRoomCodes;
