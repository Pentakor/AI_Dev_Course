import { ZodError } from 'zod';

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          status: 'fail',
          errors: err.errors
        });
      } else {
        next(err);
      }
    }
  };
};

export default validate;
