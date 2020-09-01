const verifyStringValue = (value) => {
    return value
    // if (typeof value === 'string' || value === null) return value;
    // else throw new Error(`The value ${value} is not of type string.`);
}

const verifyNumberValue = (value) => {
    return value
    // if (typeof value === 'number' || value === null) return value;
    // else throw new Error(`The value ${value} is not of type number.`);
}

export {
    verifyStringValue,
    verifyNumberValue
}