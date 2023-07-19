import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteReactionUseCase } from "./deleteReactionUseCase";

class DeleteReactionController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;
    const { id } = req.params as { id: string };

    const deleteReactionUseCase = container.resolve(DeleteReactionUseCase);

    const result = await deleteReactionUseCase.execute({
      usrId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { DeleteReactionController };
