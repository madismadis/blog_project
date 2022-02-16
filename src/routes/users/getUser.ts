import express, { Request, Response } from 'express';
import User from '../../entities/User';
const router = express.Router();

// Find user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ id: id });

    if (!user) {
      return res.json({
        message: 'no user found with given ID'
      });
    }

    return res.json(user.userInfo());
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