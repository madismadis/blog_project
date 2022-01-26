import express, { Request, Response } from 'express';
import Post from '../../entities/Post';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId, skip, take } = req.query;

    // const posts = await Post.find({
    //   take: Number.isSafeInteger(take) ? Number.parseInt(take as string) : 20,
    //   skip: Number.isSafeInteger(skip) ? Number.parseInt(skip as string) : 0,
    //   relations: ['author'],
    //   order: {
    //     createdAt: 'DESC'
    //   }
    // });

    const postsQuery = Post.createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .limit(Number.isSafeInteger(take) ? Number.parseInt(take as string) : 20)
      .offset(Number.isSafeInteger(skip) ? Number.parseInt(skip as string) : 0)

      if(userId !=undefined){
      postsQuery.where('author.id=:userId',{userId: userId});

      }

      const posts= await postsQuery.getMany();

    return res.json({ posts: posts });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: 'Unable to find posts',
        message: error.message
      });
    }
    // unknown (typeorm error?)
    return res.json({
      error: 'Unable to find posts',
      message: 'unknown error'
    });
  }
});


export default router;