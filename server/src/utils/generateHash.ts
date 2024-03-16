// generate hash from username and password , save it in the database as passHash
const { createHash } = require("node:crypto");

const generateHash = (partA: string, partB: string) => {
  const hash = createHash("sha256")
    .update(partA + partB)
    .digest("hex");
  return hash;
};

export default generateHash;
