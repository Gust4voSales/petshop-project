export class EntityNotFound extends Error {
  constructor(entity?: string, id?: string) {
    super(`${entity ?? 'Entidade'} ${id ? `with id ${id}` : ''} not found`);
  }
}