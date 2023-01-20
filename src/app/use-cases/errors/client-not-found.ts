export class ClientNotFound extends Error {
  constructor(id?: string) {
    super(`Client ${id ? `with id ${id}` : ''} not found`);
  }
}