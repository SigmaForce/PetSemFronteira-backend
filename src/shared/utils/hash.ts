import bcrypt from "bcryptjs";

const saltRounds = 12;

export const createHash = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const verifyHash = async (password: string, hash: string) => {
  try {
    const isValid = bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    return false;
  }
};
