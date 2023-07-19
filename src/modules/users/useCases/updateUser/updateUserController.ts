import { IRequestUpdateUser } from "@modules/users/dtos/users";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./updateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const id = request.usrId;
    const { name, telephone, birthDate } = request.body as IRequestUpdateUser;

    const updateUseCase = container.resolve(UpdateUserUseCase);

    const result = await updateUseCase.execute({
      id,
      name,
      telephone,
      birthDate,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateUserController };
