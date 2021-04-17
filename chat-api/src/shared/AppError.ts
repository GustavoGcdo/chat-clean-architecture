export namespace AppError {
  export class UnexpectedError extends Error {
    constructor(err: any) {
      super(err.toString());

      console.log('[AppError]: An unexpected error occurred');
      console.error(err);
    }
  }
}
