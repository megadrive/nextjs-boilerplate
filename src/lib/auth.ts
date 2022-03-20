import bcrypt from "bcrypt";

const ENCRYPT_ROUNDS = 12;

export const encrypt = async (text: string) => {
  try {
    const hashed = await bcrypt.hash(text, ENCRYPT_ROUNDS);
    return hashed;
  } catch (err) {
    console.error(err);
    throw new Error("Encryption failed");
  }
};

export const compare = async (plaintext: string, hashed: string) => {
  try {
    const result = await bcrypt.compare(plaintext, hashed);
    return result;
  } catch (error) {
    throw new Error("Couldn't compare passwords.");
  }
};
