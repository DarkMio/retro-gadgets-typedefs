/*
 * Based on IntRange from here:
 * https://stackoverflow.com/a/39495173
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

/*
 * From:
 * https://gist.github.com/mstn/5f75651100556dbe30e405691471afe3
 */
/**
 * An array in a fixed size of `N` of type `T`
 */
type FixedSizeArray<N extends number, T> = {
    //@ts-expect-error not sure how to fix this but the type still works if we just ignore the error
    readonly [k in Enumerate<N>]: T;
} & { length: N };

/**
 * A read-only array in a fixed size of `N` of type `T`
 */
type ReadOnlyFixedSizeArray<N extends number, T> = FixedSizeArray<N, T> & Readonly<T[]>;


//https://stackoverflow.com/a/63918062
type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;
type EnumerateInternal<A extends Array<unknown>, N extends number> = { 0: A, 1: EnumerateInternal<PrependNextNum<A>, N> }[N extends A['length'] ? 0 : 1];
export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;
export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;