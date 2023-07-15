import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCommentUseCase } from "./updateCommentUseCase";
import { IRequestUpdateComment } from "../../dtos/comments";

class UpdateCommentController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { id } = req.params;
    const { content } = req.body as IRequestUpdateComment;

    const updateCommentUseCase = container.resolve(UpdateCommentUseCase);

    const result = await updateCommentUseCase.execute({
      usrId,
      id,
      content,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { UpdateCommentController };
