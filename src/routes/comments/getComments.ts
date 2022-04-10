import express, { Request, Response } from 'express';
import Comment from '../../entities/Comment';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { postId, skip, take } = req.query;

    // const posts = await Post.find({
    //   take: Number.isSafeInteger(take) ? Number.parseInt(take as string) : 20,
    //   skip: Number.isSafeInteger(skip) ? Number.parseInt(skip as string) : 0,
    //   relations: ['author'],
    //   order: {
    //     createdAt: 'DESC'
    //   }
    // });

    const commentsQuery = Comment.createQueryBuilder('comment')
      .innerJoinAndSelect('post.id', 'post')
      .limit(Number.isSafeInteger(take) ? Number.parseInt(take as string) : 20)
      .offset(Number.isSafeInteger(skip) ? Number.parseInt(skip as string) : 0);

    if (postId != undefined) {
      commentsQuery.where('post.id = :id', { postId: postId });
    }

    const comments = await commentsQuery.getMany();

    return res.json({ comments: comments });

  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to find comments',
        message: error.message
      });
    }
    // unknown (typeorm error?)
    return res.json({
      error: 'Unable to find comments',
      message: 'unknown error'
    });
  }
});

export default router;