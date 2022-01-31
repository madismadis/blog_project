import express, { Request, Response } from 'express';
import User from '../../entities/User';
const router = express.Router();

// Find user by ID
router.get('/', async (req: Request, res: Response) => {
  try {
    const { skip, take } = req.query;

    const users = await User.find({
      take: Number.isSafeInteger(take) ? Number.parseInt(take as string) : 20,
      skip: Number.isSafeInteger(skip) ? Number.parseInt(skip as string) : 0
    });

    if (!users) {
      return res.json({
        message: 'no user found with given ID'
      });
    }

    return res.json({ users: users });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to find user',
        message: error.message
      });
    }
    // unknown (typeorm error?)
    return res.json({
      error: 'Unable to create new user',
      message: 'unknown error'
    });
  }
});

export default router;