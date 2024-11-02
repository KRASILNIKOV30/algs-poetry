function reduceRec<T, U>(
    rec: Record<string, T>,
    callback: (prev: U, cur: [string, T]) => U,
    initValue: U,
): U {
    return Object.entries(rec).reduce(callback, initValue)
}

function forEachRec<T>(
    rec: Record<string, T>,
    callback: (cur: [string, T]) => void,
) {
    Object.entries(rec).forEach(callback)
}

export {
    reduceRec,
    forEachRec,
}
