import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserByIdUseCase } from "./listUserByIdUseCase";

class ListUserByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    const listUserByIdUseCase = container.resolve(ListUserByIdUseCase);

    const result = await listUserByIdUseCase.execute({ id });

    return res.status(result.statusCode).json(result);
  }
}

export { ListUserByIdController };
