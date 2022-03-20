import { omit } from "../lib/util";
import { prisma } from "../lib/prisma";
import { compare } from "../lib/auth";

export const UserModel = {
  get: async (email: string, propertiesToOmit = "password") => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      return omit(user!, propertiesToOmit);
    } catch (error: any) {
      throw error;
    }
  },
  remove: async ({ email, id }: { email?: string; id?: string }) => {
    try {
      const user = await prisma.user.delete({
        where: {
          email,
          id,
        },
      });
      return omit(user, "password");
    } catch (error: any) {
      throw error;
    }
  },
  validatePassword: async (email: string, password: string) => {
    try {
      const user = await UserModel.get(email, "");
      if (user) {
        const passwordIsSame = await compare(password, user.password);
        return passwordIsSame;
      }
    } catch (error: any) {
      console.error({ error });
      return false;
    }
  },
};
