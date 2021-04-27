export type Nullable<T> = { [P in keyof T]: T[P] | null | Nullable<T[P]> };
export type AnyFunction<T = void, U = any> = ((...args: U[]) => T) | null;
