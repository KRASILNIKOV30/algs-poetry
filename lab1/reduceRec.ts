function reduceRec<T, U>(
	rec: Record<string, T>,
	callback: (prev: U, cur: [string, T], i: number) => U,
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

const size = (rec: Record<string, unknown>) =>
	Object.entries(rec).length

const isEmpty = (rec: Record<string, unknown>) => size(rec) === 0

export {
	reduceRec,
	forEachRec,
	isEmpty,
}
