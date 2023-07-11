import { Request, Response } from "express";
import { container } from "tsyringe";
import { InactivateUserUseCase } from "./inactivateUserUseCase";

class InactivateUserController {
  async handle(req: Request, res: Response) {
    const id = req.usrId;

    const inactivateUserUseCase = container.resolve(InactivateUserUseCase);

    const result = await inactivateUserUseCase.execute({
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { InactivateUserController };
