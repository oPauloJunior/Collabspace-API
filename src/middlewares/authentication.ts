import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { prisma } from "@libs/prismaClient";
import { AppError } from "@helpers/errorsHandler";

interface ITokenPayload {
  tokenPayload: {
    id: string;
  };
}

async function authentication(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError({
        statusCode: 401,
        message: "O token está faltando!",
      });
    }

    const [, token] = authHeader.split(" ");

    const { tokenPayload } = verify(
      token,
      process.env.JWT_SECRET_TOKEN
    ) as ITokenPayload;

    const listUserById = await prisma.users.findFirst({
      where: { id: tokenPayload.id },
    });

    if (!listUserById) {
      throw new AppError({
        statusCode: 401,
        message: "Usuário não encontrado!",
      });
    }

    request.usrId = listUserById.id;

    return next();
  } catch (error) {
    throw new AppError({
      statusCode: 401,
      message: "Token é inválido!",
    });
  }
}

export { authentication };
