import { IRequestUpdateUserAvatar } from "@modules/users/dtos/users";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./updateAvatarUseCase";

class UpdateAvatarController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { avatarUrl } = req.body as IRequestUpdateUserAvatar;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    const result = await updateAvatarUseCase.execute({
      usrId,
      avatarUrl,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { UpdateAvatarController };
