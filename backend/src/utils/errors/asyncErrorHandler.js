// asyncErrorHandler -- handler to catch all the async errors
export const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => next(error));
    
  };
};
