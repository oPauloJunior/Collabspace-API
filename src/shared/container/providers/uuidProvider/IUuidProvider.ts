interface IUuidProvider {
  createUUID(): string;
  validateUUID(uuid: string): Boolean;
}

export { IUuidProvider };
