import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Request, Response, NextFunction, RequestHandler } from "express";

type ValidationSource = "body" | "query" | "params";

export const validate = (
  schema: any,
  source: ValidationSource = "body"
): RequestHandler => {
  const compiler = TypeCompiler.Compile(schema);

  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[source];
    const valid = compiler.Check(data);

    if (!valid) {
      const errors = [...compiler.Errors(data)];
      res.status(400).json({
        errors: errors.map((error) => ({
          path: error.path,
          message: error.message,
        })),
      });
      return;
    }

    next();
  };
};
