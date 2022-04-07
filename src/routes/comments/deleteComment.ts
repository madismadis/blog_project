import express, { Request, Response } from 'express';
import Comment from '../../entities/Comment';
import bunyan from 'bunyan';
const log = bunyan.createLogger({name: __filename}); //???

const router = express.Router();


interface CommentDeleteInput {
    id: string;
 }
  

router.delete('/', async (req: Request, res: Response)=> {
    try{
      const { id } = req.body as CommentDeleteInput;
      const comment = await Comment.findOne({where: { id: id }});

      if(!comment){
        return res.json({
          error: 'Unable to delete comment',
          message: 'No tag with given id found'
        });
      }
      
      const deletedComment = await comment.softRemove();
      log.info({tag: deletedComment}, 'Tag was deleted');

      return res.json(deletedComment);
    }catch(error){
      log.error(error, 'Error when deleting comment');

      if (error instanceof Error) {
        return res.json({
          error: 'Unable to find comment',
          message: error.message
        });
      }
      // unknown (typeorm error?)
      return res.json({
        error: 'Unable to delete comment',
        message: 'unknown error'
      });
    }
});

export default router;