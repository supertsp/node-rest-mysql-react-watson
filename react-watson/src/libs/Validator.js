/**
 * Objective: ...
 * 
 * Description: ...
 * 
 * @version 1.0.1
 * @author tiago, 30/11/2019, 19:48:17
 * Last update: 07/02/2021, 20:09:00
 */

export default class Validator {

	static isUndefined(variable) {
		return typeof(variable) === 'undefined' || variable === null;
	}


	// +------------+
	// |   STRING   |
	// +------------+

	static isString(variable) {
		return typeof(variable) === 'string';
	}

	static isStringEmpty(variable) {
		return typeof(variable) === 'string' && (variable === "" || variable === null);
	}

	static isStrings(...variables) {
		for (let index = 0; index < variables.length; index++) {
			if (!this.isString(variables[index])) {
				return false;
			}
		};

		return true;

	}
	static isStringsEmpty(...variables) {
		for (let index = 0; index < variables.length; index++) {
			if (!this.isStringEmpty(variables[index])) {
				return false;
			}
		};

		return true;
	}

	static isThereAnyEmptyString(...variables) {
		for (let index = 0; index < variables.length; index++) {
			if (this.isStringEmpty(variables[index])) {
				return true;
			}
		}

		return false;
	}


	// +------------+
	// |   NUMBER   |
	// +------------+

	static isNumber(variable) {
		return typeof(variable) === 'number';
	}

	static isInteger(variable) {
		//for old browsers
		// return Number.isNumber(variable) && ("" + variable).search(/[.]/) === -1;
		return Number.isInteger(variable);
	}

	static isIntegerBetweenInterval(variable, firstLimit, lastLimit) {
		return this.isInteger(variable) &&
			this.isInteger(firstLimit) &&
			this.isInteger(lastLimit) &&
			variable >= firstLimit &&
			variable <= lastLimit;
	}

	static isIntegerBetweenExclusiveInterval(variable, firstLimit, lastLimit) {
		return this.isInteger(variable) &&
			this.isInteger(firstLimit) &&
			this.isInteger(lastLimit) &&
			variable > firstLimit &&
			variable < lastLimit;
	}

	static isIntegerOutOfInterval(variable, firstLimit, lastLimit) {
		return this.isInteger(variable) &&
			this.isInteger(firstLimit) &&
			this.isInteger(lastLimit) &&
			(variable < firstLimit ||
			variable > lastLimit);
	}

	static isIntegerOutOfInclusiveInterval(variable, firstLimit, lastLimit) {
		return this.isInteger(variable) &&
			this.isInteger(firstLimit) &&
			this.isInteger(lastLimit) &&
			(variable <= firstLimit ||
			variable >= lastLimit);
	}

	static isFloat(variable) {
		return this.isNumber(variable);
	}

	static isFloatBetweenInterval(variable, firstLimit, lastLimit) {
		return this.isFloat(variable) &&
			this.isFloat(firstLimit) &&
			this.isFloat(lastLimit) &&
			variable >= firstLimit &&
			variable <= lastLimit;
	}

	static isFloatBetweenExclusiveInterval(variable, firstLimit, lastLimit) {
		return this.isFloat(variable) &&
			this.isFloat(firstLimit) &&
			this.isFloat(lastLimit) &&
			variable > firstLimit &&
			variable < lastLimit;
	}

	static isFloatOutOfInterval(variable, firstLimit, lastLimit) {
		return this.isFloat(variable) &&
			this.isFloat(firstLimit) &&
			this.isFloat(lastLimit) &&
			(variable < firstLimit ||
			variable > lastLimit);
	}

	static isFloatOutOfInclusiveInterval(variable, firstLimit, lastLimit) {
		return this.isFloat(variable) &&
			this.isFloat(firstLimit) &&
			this.isFloat(lastLimit) &&
			(variable <= firstLimit ||
			variable >= lastLimit);
	}

	static isNumberBetweenInterval(variable, firstLimit, lastLimit) {
		return this.isNumber(variable) &&
			this.isNumber(firstLimit) &&
			this.isNumber(lastLimit) &&
			variable >= firstLimit &&
			variable <= lastLimit;
	}

	static isNumberBetweenExclusiveInterval(variable, firstLimit, lastLimit) {
		return this.isNumber(variable) &&
			this.isNumber(firstLimit) &&
			this.isNumber(lastLimit) &&
			variable > firstLimit &&
			variable < lastLimit;
	}

	static isNumberOutOfInterval(variable, firstLimit, lastLimit) {
		return this.isNumber(variable) &&
			this.isNumber(firstLimit) &&
			this.isNumber(lastLimit) &&
			(variable < firstLimit ||
			variable > lastLimit);
	}

	static isNumberOutOfInclusiveInterval(variable, firstLimit, lastLimit) {
		return this.isNumber(variable) &&
			this.isNumber(firstLimit) &&
			this.isNumber(lastLimit) &&
			(variable <= firstLimit ||
			variable >= lastLimit);
	}


	// +-----------------+
	// |   HEXADECIMAL   |
	// +-----------------+

	static isHexaNumber(variable) {
		return this.isString(variable) && /^[0-9a-fA-F]+$/.test(variable);
	}


	// +---------+
	// |   RGB   |
	// +---------+

	static isRgbValue(variable) {
		return this.isString(variable)
			&&
			(variable.length === 6 || variable.length === 7)
			&&
			(/^[0-9a-fA-F]+$/.test(variable)
				|| /^[0-9a-fA-F-#]+$/.test(variable));
	}

	static isRgbaValue(variable) {
		return this.isString(variable)
			&&
			(variable.length === 9 || variable.length === 10)
			&&
			(/^[0-9a-fA-F]+$/.test(variable)
				|| /^[0-9a-fA-F-#]+$/.test(variable));
	}


	// +-------------+
	// |   BOOLEAN   |
	// +-------------+

	static isBoolean(variable) {
		return typeof(variable) === 'boolean';
	}


	// +------------+
	// |   OBJECT   |
	// +------------+

	static isObjectOf(type, variable) {
		return variable instanceof type;
	}


	// +----------+
	// |   LIST   |
	// +----------+

	static isArray(variable) {
		return Array.isArray(variable);
	}

	static isOneOfThoseValues(variable, listOfValues = []){
		return listOfValues.includes(variable);
	}

	static isOneOfThoseValuesWithIgnoreCase(variable, listOfValues = []){
		for (let index = 0; index < listOfValues.length; index++) {
			if (this.isString(variable) && variable.toUpperCase() === listOfValues[index].toUpperCase()) {
				return true;
			}
		}

		return false;
	}

	// +--------------------+
	// |   AXIOS RESPONSE   |
	// +--------------------+

	static isAxiosResponseOk(response) {
		try {
			return response.status === 200;
		}
		catch (error) {
			return false;
		}
	}

	static isAxiosResponseOkAndHasData(response) {
		try {
			return response.status === 200 && response.data;
		}
		catch (error) {
			return false;
		}
	}

}