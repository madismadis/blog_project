import express, { Request, Response } from 'express';
import User from '../../entities/User';
import { v4 as uuidV4 } from 'uuid';
const router = express.Router();

interface UserInput {
  firstName: string;
  middleName?: string;
  lastName: string;
  mobile: string;
  email: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    let {
      firstName,
      middleName,
      lastName,
      mobile,
      email
    } = req.body as UserInput;

    // TODO: validation for inputs

    const user = new User();
    user.id = uuidV4();
    user.firstName = firstName;
    user.middleName = middleName = !null ? middleName : '';
    user.lastName = lastName;
    user.mobile = mobile;
    user.email = email;

    let newUser = await user.save();
    if (!newUser) {
      throw new Error();
    }

    return res.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error: error.message });
      return res.json({
        error: 'Unable to create new user',
        message: error.message
      });
    }

    return res.json({
      error: 'Unable to create new user',
      message: 'unknown error'
    });
  }
});

export default router;