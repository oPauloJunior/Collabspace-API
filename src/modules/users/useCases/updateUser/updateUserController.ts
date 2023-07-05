import { IRequestUpdateUser } from "@modules/users/dto/users";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./updateUserCase";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { name, telephone, birthDate } = req.body as IRequestUpdateUser;

    const updateUseCase = container.resolve(UpdateUserUseCase);

    const result = await updateUseCase.execute({
      id,
      name,
      telephone,
      birthDate,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { UpdateUserController };
