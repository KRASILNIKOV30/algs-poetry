function reduceRec<T, U>(
    rec: Record<string, T>,
    callback: (prev: U, cur: [string, T]) => U,
    initValue: U,
): U {
    return Object.entries(rec).reduce(callback, initValue)
}

export {
    reduceRec
}
