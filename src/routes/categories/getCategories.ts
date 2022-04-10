
import express, { Request, Response } from 'express';
import Category from '../../entities/Category';
const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const { skip, take } = req.query;

    const categories = await Category.find({
      take: Number.isSafeInteger(take) ? Number.parseInt(take as string) : 20,
      skip: Number.isSafeInteger(skip) ? Number.parseInt(skip as string) : 0
    });

    if (!categories) {
      return res.json({
        message: 'no categories found'
      });
    }

    return res.json({categories: categories});
    
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to find categories',
        message: error.message
      });
    }
    // unknown (typeorm error?)
    return res.json({
      error: 'Unable to find categories',
      message: 'unknown error'
    });
  }
});

export default router;