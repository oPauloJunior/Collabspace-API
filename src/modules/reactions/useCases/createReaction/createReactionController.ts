import { Request, Response } from "express";
import { container } from "tsyringe";
import { IRequestCreateReaction } from "@modules/reactions/dtos/reactions";
import { CreateReactionUseCase } from "./createReactionUseCase";

class CreateReactionController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { postId, commentId, entityType } =
      request.body as IRequestCreateReaction;

    const createReactionUseCase = container.resolve(CreateReactionUseCase);

    const result = await createReactionUseCase.execute({
      usrId,
      postId,
      commentId,
      entityType,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateReactionController };
