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