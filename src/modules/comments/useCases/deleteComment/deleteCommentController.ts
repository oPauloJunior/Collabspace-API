import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCommentUseCase } from "./deleteCommentUseCase";

class DeleteCommentController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id, postId } = request.params as { id: string; postId: string };

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    const result = await deleteCommentUseCase.execute({
      usrId,
      postId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { DeleteCommentController };
