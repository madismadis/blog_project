import express, { Request, Response } from 'express';
import Post from '../../entities/Post';
import bunyan from 'bunyan';
const log = bunyan.createLogger({name: __filename}); //???

const router = express.Router();


interface PostDeleteInput {
    id: string;
 }
  

router.delete('/', async (req: Request, res: Response)=> {
    try{
      const { id } = req.body as PostDeleteInput;
      const post = await Post.findOne({where: { id: id }});

      if(!post){
        return res.json({
          error: 'Unable to delete post',
          message: 'No post with given id found'
        });
      }
      
      const deletedPost = await post.softRemove();
      log.info({tag: deletedPost}, 'Post was deleted');

      return res.json(deletedPost);
    }catch(error){
      log.error(error, 'Error when deleting category');

      if (error instanceof Error) {
        return res.json({
          error: 'Unable to find post',
          message: error.message
        });
      }
      // unknown (typeorm error?)
      return res.json({
        error: 'Unable to delete post',
        message: 'unknown error'
      });
    }
});

export default router;