export class ClientNotFound extends Error {
  constructor(id?: string) {
    super(`Client ${id ? `with ${id}` : ''} not found`);
  }
}