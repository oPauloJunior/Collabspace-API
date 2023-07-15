import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCommentUseCase } from "./deleteCommentUseCase";

class DeleteCommentController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;
    const { id, postId } = req.params as { id: string; postId: string };

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    const result = await deleteCommentUseCase.execute({
      usrId,
      postId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { DeleteCommentController };
