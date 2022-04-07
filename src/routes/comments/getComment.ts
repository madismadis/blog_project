import express, { Request, Response } from 'express';
import Comment from '../../entities/Comment';
const router = express.Router();

// Find category by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({ id: id });

    if (!comment) {
      return res.json({
        message: 'no category found with given ID'
      });
    }

    return res.json(comment);
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to find comment',
        message: error.message
      });
    }
    // unknown (typeorm error?)
    return res.json({
      error: 'Unable to create new comment',
      message: 'unknown error'
    });
  }
});

export default router;