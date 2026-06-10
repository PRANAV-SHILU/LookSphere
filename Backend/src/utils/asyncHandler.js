export const asyncHandler = (controllerName, fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(`${controllerName} controller error:`, err);
      res.status(500).json({ message: err.message });
    }
  };
};
