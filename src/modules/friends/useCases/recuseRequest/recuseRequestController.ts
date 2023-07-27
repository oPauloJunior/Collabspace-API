import { Request, Response } from "express";
import { container } from "tsyringe";
import { RecuseRequestUseCase } from "./recuseRequestUseCase";

class RecuseRequestController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { id } = req.params as { id: string };

    const recuseRequestUseCase = container.resolve(RecuseRequestUseCase);

    const result = await recuseRequestUseCase.execute({
      usrId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { RecuseRequestController };
