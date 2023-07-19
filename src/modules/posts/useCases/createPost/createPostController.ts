import { IRequestCreatePost } from "@modules/posts/dtos/posts";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./createPostUseCase";

class CreatePostController {
  async handle(request: Request, response: Response) {
    const userId = request.usrId;
    const { content, tags, visibility } = request.body as IRequestCreatePost;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const result = await createPostUseCase.execute({
      userId,
      content,
      tags,
      visibility,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreatePostController };
