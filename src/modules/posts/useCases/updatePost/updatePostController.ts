import { Request, Response } from "express";
import { container } from "tsyringe";
import { IRequestUpdatePost } from "@modules/posts/dtos/posts";
import { UpdatePostUseCase } from "./updatePostUseCase";

class UpdatePostController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;

    const { id } = request.params as { id: string };
    const { content, tags, visibility } = request.body as IRequestUpdatePost;

    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    const result = await updatePostUseCase.execute({
      usrId,
      id,
      content,
      tags,
      visibility,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdatePostController };
