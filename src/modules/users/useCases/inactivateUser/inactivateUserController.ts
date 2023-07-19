import { container } from "tsyringe";
import { Request, Response } from "express";
import { InactivateUserUseCase } from "./inactivateUserUseCase";

class InactivateUserController {
  async handle(request: Request, response: Response) {
    const id = request.usrId;

    const inactivateUserUseCase = container.resolve(InactivateUserUseCase);

    const result = await inactivateUserUseCase.execute({
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { InactivateUserController };
