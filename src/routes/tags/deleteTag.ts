import express, { Request, Response } from 'express';
import Tag from '../../entities/Tag';
import bunyan from 'bunyan';
const log = bunyan.createLogger({name: __filename}); //???

const router = express.Router();


interface TagDeleteInput {
    id: string;
    //title: String;
  }
  

router.delete('/', async (req: Request, res: Response)=> {
    try{
      const { id } = req.body as TagDeleteInput;
      const tag = await Tag.findOne({where: { id: id }});

      if(!tag){
        return res.json({
          error: 'Unable to delete tagr',
          message: 'No tag with given id found'
        });
      }
      
      const deletedTag = await tag.softRemove();
      log.info({tag: deletedTag}, 'Tag was deleted');

      return res.json(deletedTag);
    }catch(error){
      log.error(error, 'Error when deleting tag');

      if (error instanceof Error) {
        return res.json({
          error: 'Unable to find tag',
          message: error.message
        });
      }
      // unknown (typeorm error?)
      return res.json({
        error: 'Unable to delete tag',
        message: 'unknown error'
      });
    }
});

export default router;