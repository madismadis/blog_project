import express, { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import Tag from '../../entities/Tag';
const router = express.Router();

interface TagInput {
    title: string;

  }
  
  router.post('/', async (req: Request, res: Response) => {
    try {
      let {
        title
      } = req.body as TagInput;
  
      // TODO: validation for inputs
  
      const tag = new Tag();
      tag.id = uuidV4();
      tag.title = title;
      
      let newTag = await tag.save();
      if (!newTag) {
        throw new Error();
      }

      console.log({ user: newTag }, 'New tag was created');
  
      return res.json(newTag);
    } catch (error) {
      console.log ( { error: error, input: req.body }, 'Unable to create Tag');
  
      if (error instanceof Error) {
  
        return res.json({
          error: 'Unable to create new tag',
          message: error.message
        });
      }
  
      return res.json({
        error: 'Unable to create new tag',
        message: 'unknown error'
      });
    }
  });

export default router;