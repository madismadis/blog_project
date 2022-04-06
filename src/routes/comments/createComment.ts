import express, { Request, Response } from 'express';
import Comment from '../../entities/Comment';
import { v4 as uuidV4 } from 'uuid';
const router = express.Router();

interface CommentInput {
  title: string;
  content: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body as CommentInput;

    // validation näide
    if (!title || !content) {
      return res.json({ error: 'all fields must be filled' });
    }
    // TODO: valideeri sijsonid (nt. sanitize ja validate)


    const comment = Comment.create ({
        id: uuidV4(),
        title: title,
        content: content,
        published: false
      });

    console.log(comment);

    const newComment = await comment.save();

    if (!newComment) {
      // TODO: parem logger vahevara kasutusele võtta
      console.log({ error: 'unable to save comment' });
      // TODO: error handling vahevara luua (ühtlustada errori kuvamine)
      return res.json({
        error: 'Unable to create new comment',
        message: 'typeorm save'
      });
    }

    return res.json(newComment);
  } catch (error) {
    console.log('Unknown databse error');
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to create new comment',
        message: error.message
      });
    }
    return res.json({
      error: 'Unable to create new comment',
      message: 'Unknown error'
    });
  }
});

export default router;