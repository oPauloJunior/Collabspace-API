import { container } from "tsyringe";

import { IUuidProvider } from "./uuidProvider/IUuidProvider";
import { UuidProvider } from "./uuidProvider/implementation/UuidProvider";
import { IBcryptProvider } from "./bcryptProvider/IBcryptProvider";
import { BcryptProvider } from "./bcryptProvider/implementation/BcryptProvider";

container.registerSingleton<IUuidProvider>("UuidProvider", UuidProvider);
container.registerSingleton<IBcryptProvider>("BcryptProvider", BcryptProvider);
