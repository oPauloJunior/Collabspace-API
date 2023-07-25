import { Request, Response } from "express";
import { container } from "tsyringe";
import { AcceptRequestUseCase } from "./acceptRequestUseCase";

class AcceptRequestController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { id } = req.params as { id: string };

    const acceptedRequestUseCase = container.resolve(AcceptRequestUseCase);

    const result = await acceptedRequestUseCase.execute({
      usrId,
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { AcceptRequestController };
