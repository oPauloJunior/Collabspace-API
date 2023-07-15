import { Request, Response } from "express";
import { container } from "tsyringe";
import { IRequestCreateComment } from "@modules/comments/dtos/comments";
import { CreateCommentUseCase } from "./createCommentUseCase";

class CreateCommentController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };
    const { content } = request.body as IRequestCreateComment;

    const createCommentUseCase = container.resolve(CreateCommentUseCase);

    const result = await createCommentUseCase.execute({
      postId: id,
      usrId,
      content,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateCommentController };
