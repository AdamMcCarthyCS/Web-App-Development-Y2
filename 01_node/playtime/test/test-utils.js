import { assert } from "chai";

export function assertSubset(subset, superset) {
    // if subset is null/undefined, its only a subset if superset is also null/undefined
    if (subset === null || subset === undefined) {
        return superset === null || superset === undefined;
    }

    // if subset is a primative, compare directly
    if (typeof subset !== "object") {
        return subset === superset;
    }

    // if subset is an object but superset is not, they cannot match
    if (typeof superset !== "object" || superset === null) {
        return false;
    }

    // handle Date objects - both must be Dates with equal values
    if (subset instanceof Date) {
        return superset instanceof Date && subset.valueOf() === superset.valueOf();
    }

    // handle arrays - every element in subset must exist in superset
    if (Array.isArray(subset)) {
        assert.isArray(superset, "Expected superset to be an array");

        subset.forEach((subsetItem) => {
            const found = superset.some((supersetItem) =>
            assertSubset(subsetItem, supersetItem)
            );
            assert.isTrue(found, `No matching item found for ${JSON.stringify(subsetItem)}`);
        });
        return true;
    }

    // handle objects - every key-value pair in subset must exist in superset
    return Object.keys(subset).every((key) => {
        // key must exist in superset
        if (!(key in superset)) {
            assert.fail(`Key ${key} not found in superset`);
            return false;
        }

        const subsetValue = subset[key];
        const supersetValue = superset[key];
        assert.equal(subsetValue, supersetValue)
        if (subsetValue !== null && typeof subsetValue === "object") {
            // recursively check if subsetValue is a subset of supersetValue
            return assertSubset(subsetValue, supersetValue)
        }
        return true; 
    });
}