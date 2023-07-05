import { v4 as uuidV4, validate } from "uuid";
import { IUuidProvider } from "../IUuidProvider";

class UuidProvider implements IUuidProvider {
  createUUID(): string {
    return uuidV4();
  }

  validateUUID(uuid: string): Boolean {
    return validate(uuid);
  }
}

export { UuidProvider };
