import express, { Request, Response } from 'express';
import Category from '../../entities/Category';
import bunyan from 'bunyan';
const log = bunyan.createLogger({name: __filename}); //???

const router = express.Router();


interface CategoryDeleteInput {
    id: string;
 }
  

router.delete('/', async (req: Request, res: Response)=> {
    try{
      const { id } = req.body as CategoryDeleteInput;
      const category = await Category.findOne({where: { id: id }});

      if(!category){
        return res.json({
          error: 'Unable to delete category',
          message: 'No category with given id found'
        });
      }
      
      const deletedCategory = await category.softRemove();
      log.info({tag: deletedCategory}, 'Category was deleted');

      return res.json(deletedCategory);
    }catch(error){
      log.error(error, 'Error when deleting category');

      if (error instanceof Error) {
        return res.json({
          error: 'Unable to find category',
          message: error.message
        });
      }
      // unknown (typeorm error?)
      return res.json({
        error: 'Unable to delete category',
        message: 'unknown error'
      });
    }
});

export default router;