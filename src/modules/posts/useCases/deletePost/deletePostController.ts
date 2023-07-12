import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePostUseCase } from "./deletePostUseCase";

class DeletePostController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;
    const { id } = req.params as { id: string };

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    const result = await deletePostUseCase.execute({
      usrId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { DeletePostController };
