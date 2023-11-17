export class Unauthorized extends Error {
  constructor(message?: string) {
    super(message ?? "User not authorized")
  }
}