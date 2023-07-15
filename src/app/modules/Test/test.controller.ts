import { NextFunction, Request, Response } from "express";

const TestGet = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Test Get",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const TestController = {
  TestGet,
};
