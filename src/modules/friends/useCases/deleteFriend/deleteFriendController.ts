import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteFriendUseCase } from "./deleteFriendUseCase";

class DeleteFriendController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { id } = req.params as { id: string };

    const deleteFriendUseCase = container.resolve(DeleteFriendUseCase);

    const result = await deleteFriendUseCase.execute({
      usrId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { DeleteFriendController };
