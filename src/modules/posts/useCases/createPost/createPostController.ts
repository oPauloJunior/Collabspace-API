import { IRequestCreatePost } from "@modules/posts/dtos/posts";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./createPostUseCase";

class CreatePostController {
  async handle(req: Request, res: Response) {
    const userId = req.usrId;
    const { content, tags, visibility } = req.body as IRequestCreatePost;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const result = await createPostUseCase.execute({
      userId,
      content,
      tags,
      visibility,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { CreatePostController };
