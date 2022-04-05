import express, { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import Category from '../../entities/Category';
const router = express.Router();

interface CategoryInput {
    title: string;
    
  }
  
  router.post('/', async (req: Request, res: Response) => {
    try {
      let {
        title
      } = req.body as CategoryInput;
  
      // TODO: validation for inputs
  
      const category = new Category();
      category.id = uuidV4();
      category.title = title;
      
      let newCategory = await category.save();
      if (!newCategory) {
        throw new Error();
      }

      console.log({ user: newCategory }, 'New category was created');
  
      return res.json(newCategory);
    } catch (error) {
      console.log ( { error: error, input: req.body }, 'Unable to create Category');
  
      if (error instanceof Error) {
  
        return res.json({
          error: 'Unable to create new user',
          message: error.message
        });
      }
  
      return res.json({
        error: 'Unable to create new category',
        message: 'unknown error'
      });
    }
  });

export default router;