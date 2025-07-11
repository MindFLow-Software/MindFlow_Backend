export class Entity<T> {
  protected constructor(protected props: T) {}

  toJSON(): T {
    return {
      ...this.props,
    }
  }
}
