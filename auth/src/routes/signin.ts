import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../utils/password";
import "express-async-errors";
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //check existing user
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError("Invalid credentials!");

    //compare pw
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) throw new BadRequestError("Invalid credentials!");

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.send({});
  }
);

export { router as signinRouter };
