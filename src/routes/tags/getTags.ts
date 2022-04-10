
import express, { Request, Response } from 'express';
import Tag from '../../entities/Tag';
const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const { skip, take } = req.query;

    const tags = await Tag.find({
      take: Number.isSafeInteger(take) ? Number.parseInt(take as string) : 20,
      skip: Number.isSafeInteger(skip) ? Number.parseInt(skip as string) : 0
    });

    if (!tags) {
      return res.json({
        message: 'no tags found'
      });
    }

    return res.json({tags: tags});
    
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to find tags',
        message: error.message
      });
    }
    // unknown (typeorm error?)
    return res.json({
      error: 'Unable to find tags',
      message: 'unknown error'
    });
  }
});

export default router;