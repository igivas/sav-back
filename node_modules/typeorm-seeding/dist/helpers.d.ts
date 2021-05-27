/**
 * Times repeats a function n times
 */
export declare const times: <TResult>(n: number, iteratee: (index: number) => Promise<TResult>) => Promise<TResult[]>;
