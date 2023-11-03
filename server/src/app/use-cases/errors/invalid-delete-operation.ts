export class InvalidDeleteOperation extends Error {
  constructor(message?: string) {
    super(message ?? "Cannot delete entity because they have related relations.");
  }
}