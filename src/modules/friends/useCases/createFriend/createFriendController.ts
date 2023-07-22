import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFriendUseCase } from "./createFriendUseCase";

class CreateFriendController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;
    const { targetId } = req.params as { targetId: string };

    const createFriendUseCase = container.resolve(CreateFriendUseCase);

    const result = await createFriendUseCase.execute({
      usrId,
      targetId,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { CreateFriendController };
