import { v4 as uuidV4, validate } from "uuid";

import { IUuidProvider } from "../IUuidProvider";

class UuidProvider implements IUuidProvider {
  createUUID(): string {
    return uuidV4();
  }

  validateUUID(uuid: string): boolean {
    return validate(uuid);
  }
}

export { UuidProvider };
