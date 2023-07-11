interface IUuidProvider {
  createUUID(): string;
  validateUUID(uuid: string): boolean;
}

export { IUuidProvider };
