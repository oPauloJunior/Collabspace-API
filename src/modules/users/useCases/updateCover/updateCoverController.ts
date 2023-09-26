import { IRequestUpdateUserCover } from "@modules/users/dtos/users";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCoverUseCase } from "./updateCoverUseCases";

class UpdateCoverController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { coverUrl } = req.body as IRequestUpdateUserCover;

    const updateCoverUseCase = container.resolve(UpdateCoverUseCase);

    const result = await updateCoverUseCase.execute({
      usrId,
      coverUrl,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { UpdateCoverController };
