import { IRequestUpdateComment } from "@modules/comments/dtos/comments";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCommentUseCase } from "./updateCommentUseCase";

class UpdateCommentController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };
    const { content } = request.body as IRequestUpdateComment;

    const updateCommentUseCase = container.resolve(UpdateCommentUseCase);

    const result = await updateCommentUseCase.execute({
      usrId,
      id,
      content,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateCommentController };
