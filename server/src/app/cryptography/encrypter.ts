export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>, options: { expiresIn: string | number }): Promise<string>
}
