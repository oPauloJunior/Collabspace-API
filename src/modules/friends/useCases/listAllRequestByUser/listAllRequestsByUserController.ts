import { Request, Response } from "express";

import { container } from "tsyringe";
import { ListAllRequestsByUserUseCase } from "./listAllRequestsByUserUseCase";

class ListAllRequestsByUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    const listAllRequestsByUserUseCase = container.resolve(
      ListAllRequestsByUserUseCase
    );

    const result = await listAllRequestsByUserUseCase.execute({
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { ListAllRequestsByUserController };
