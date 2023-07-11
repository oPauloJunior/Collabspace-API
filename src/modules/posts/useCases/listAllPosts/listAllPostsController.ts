import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllPostsUseCase } from "./listAllPostsUseCase";

class ListAllPostsController {
  async handle(req: Request, res: Response) {
    const { page, limit } = req.query as { page: string; limit: string };

    const listAllPostsUseCase = container.resolve(ListAllPostsUseCase);

    const result = await listAllPostsUseCase.execute({ page, limit });

    return res.status(result.statusCode).json(result);
  }
}

export { ListAllPostsController };
