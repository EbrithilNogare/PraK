/**
 * Dive into object by given path
 * @param	{Object}	obj
 * @param	{String}	path
 * @returns	value at the location defined by path
 */
const DeepValue = (obj, path) => {
    const arrayPath = path.split('[%]')
    for (
        let i = 0, path = arrayPath[0].split('.'), len = path.length;
        i < len;
        i++
    ) {
        if (obj === undefined) return undefined
        obj = obj[path[i]]
    }
    if (arrayPath.length === 1) {
        return obj
    }

    const toReturn = []

    if (!Array.isArray(obj)) {
        console.warn(
            'failure in DeepValue(obj, path), obj is not array',
            obj,
            path
        )
        return []
    }

    obj.forEach((value, key) => {
        for (
            let i = 1, path = arrayPath[1].split('.'), len = path.length;
            i < len;
            i++
        ) {
            value = value[path[i]]
        }
        toReturn.push(value)
    })
    return toReturn
}

export default DeepValue
