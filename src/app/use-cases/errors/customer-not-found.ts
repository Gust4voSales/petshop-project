export class CustomerNotFound extends Error {
  constructor(id?: string) {
    super(`Customer ${id ? `with id ${id}` : ''} not found`);
  }
}