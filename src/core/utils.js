// Pure functions

// input => onInput
export function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}

// string => String
function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
      return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}