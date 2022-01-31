import express, { Request, Response } from 'express';
import Post from '../../entities/Post';
import { v4 as uuidV4 } from 'uuid';
import User from '../../entities/User';
const router = express.Router();

interface PostInput {
  authorId: string;
  title: string;
  summary: string;
  content: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { authorId, title, summary, content } = req.body as PostInput;

    // validation näide
    if (!authorId || !title || !summary || !content) {
      return res.json({ error: 'all fields must be filled' });
    }
    // TODO: valideeri sijsonid (nt. sanitize ja validate)

    const user = await User.findOne({ id: authorId });
    if (!user) {
      return res.json({ message: 'No such user found' });
    }

    const post = Post.create({
      id: uuidV4(),
      authorId: user.id,
      title: title,
      metaTitle: title.replace(/\s/g, '-'),
      summary: summary,
      content: content,
      published: false
    });
    console.log(post);
    const newPost = await post.save();
    if (!newPost) {
      // TODO: parem logger vahevara kasutusele võtta
      console.log({ error: 'unable to save post' });
      // TODO: error handling vahevara luua (ühtlustada errori kuvamine)
      return res.json({
        error: 'Unable to create new post',
        message: 'typeorm save'
      });
    }

    return res.json(newPost);
  } catch (error) {
    console.log('Unknown databse error');
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to create new post',
        message: error.message
      });
    }
    return res.json({
      error: 'Unable to create new post',
      message: 'Unknown error'
    });
  }
});

export default router;