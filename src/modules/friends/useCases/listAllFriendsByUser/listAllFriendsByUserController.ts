import { Request, Response } from "express";

import { ListAllFriendsByUserUseCase } from "./listAllFriendsByUserUseCase";
import { container } from "tsyringe";

class ListAllFriendsByUserController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;
    const { id } = req.params as { id: string };

    const listAllFriendsByUserUseCase = container.resolve(
      ListAllFriendsByUserUseCase
    );

    const result = await listAllFriendsByUserUseCase.execute({
      usrId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { ListAllFriendsByUserController };
