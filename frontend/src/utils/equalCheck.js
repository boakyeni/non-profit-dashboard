
/*
    Utility function to deep compare two objects
    Used here to check if any filters are set.
    If no filters are set all contacts should be shown,
    but if a filter is set and no results are shown then no contacts should be shown.
    */
export const isEqual = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (let key of obj1Keys) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            (areObjects && !isEqual(val1, val2)) ||
            (!areObjects && val1 !== val2)
        ) {
            return false;
        }
    }

    return true;
};

const isObject = (object) => {
    return object != null && typeof object === 'object';
};