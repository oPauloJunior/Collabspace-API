import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePostUseCase } from "./deletePostUseCase";

class DeletePostController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    const result = await deletePostUseCase.execute({
      usrId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { DeletePostController };
