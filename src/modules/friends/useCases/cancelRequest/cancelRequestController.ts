import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelRequestUseCase } from "./cancelRequestUseCase";

class CancelRequestController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { id } = req.params as { id: string };

    const cancelRequestUseCase = container.resolve(CancelRequestUseCase);

    const result = await cancelRequestUseCase.execute({
      usrId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { CancelRequestController };
