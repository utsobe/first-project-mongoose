import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate the request body using the provided schema
      await schema.parseAsync({ body: req.body });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
