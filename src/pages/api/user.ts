import { UserCreateSchema } from "../../schemas/User";
import { omit } from "../../lib/util";
import { encrypt } from "../../lib/auth";
import { nc } from "../../lib/next-connect";
import { prisma } from "../../lib/prisma";
import { UserModel } from "../../models/User";

export default nc
  /**
   * Get a User by email, omits password.
   */
  .get(async (req, res) => {
    try {
      const { email } = req.body;

      const foundUser = await UserModel.get(email);

      if (!foundUser) {
        throw new Error("User not found");
      }

      const user = omit(foundUser, "password");

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { email, id } = req.body;

      const user = await UserModel.remove({ email, id });

      return res.status(200);
    } catch (error: any) {
      console.error(error.message);
      return res.status(400).json({ error: "An error occurred." });
    }
  })
  .post(async (req, res) => {
    try {
      const validation = UserCreateSchema.validate(req.body);
      if (validation.error) {
        return res.status(400).json({ error: validation.error.message });
      }

      const { email, password, name } = req.body;

      const fetchedUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      // Error out, user exists.
      if (fetchedUser) {
        return res.status(400).json({
          message: "Email exists.",
        });
      }

      const hashedPassword = await encrypt(password);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const user = omit(newUser, "password");

      return res.status(200).json(user);
    } catch (error: any) {
      console.error(error);
      return res
        .status(404)
        .json({ error: "An error occurred while creating account." });
    }
  });
