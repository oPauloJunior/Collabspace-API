import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserUseCase = new CreateUserUseCase();

    createUserUseCase.execute();

    res.json({ msg: "Olá mundo" });
  }
}

export { CreateUserController };
