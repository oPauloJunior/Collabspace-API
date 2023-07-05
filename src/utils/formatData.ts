function telephoneFormat(telephone: string | null): string | undefined {
  return telephone
    ? telephone
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")
        .replaceAll("-", "")
    : undefined;
}

export { telephoneFormat };
