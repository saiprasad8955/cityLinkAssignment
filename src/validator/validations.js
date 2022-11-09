const isString = (value) => (typeof value === 'string' && value.trim().length !== 0) ? true : false;

const isValidRequestBody = (requestBody) => Object.keys(requestBody).length > 0

const isDefined = (value) => (value === undefined || value == null) ? false : true

const isAllPresent = (obj, dataObj) => {
    for (let key in obj) {

        if (!isDefined(obj[key]))
            return `${key} is missing ,it is mandatory field`

        if (dataObj && dataObj[key]) {
            switch (dataObj[key]) {
                case "obj": if ({}.toString.call(obj[key]) != "[object Object]")
                    return `${key} should have object datatype`; break;

                case "num": if (typeof obj[key] != 'number')
                    return `${key} should have number datatype`; break;
            }
        }
        else if (typeof obj[key] != 'string')
            return `${key} should have string datatype`;
    }
}

module.exports = { isString, isValidRequestBody, isDefined, isAllPresent }
