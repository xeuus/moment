import extend from '../utils/extend';
import {createUTC} from './utc';
import getParsingFlags from './parsing-flags';
import some from '../utils/some';

export function isValid(m) {
	if (m._isValid == null) {
		const flags = getParsingFlags(m);
		const parsedParts = some.call(flags.parsedDateParts, function (i) {
			return i != null;
		});
		let isNowValid = !isNaN(m._d.getTime()) &&
			flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated &&
			(!flags.meridiem || (flags.meridiem && parsedParts));

		if (m._strict) {
			isNowValid = isNowValid &&
				flags.charsLeftOver === 0 &&
				flags.unusedTokens.length === 0 &&
				flags.bigHour === undefined;
		}

		if (Object.isFrozen == null || !Object.isFrozen(m)) {
			m._isValid = isNowValid;
		}
		else {
			return isNowValid;
		}
	}
	return m._isValid;
}

export function createInvalid(flags) {
	const m = createUTC(NaN);
	if (flags != null) {
		extend(getParsingFlags(m), flags);
	}
	else {
		getParsingFlags(m).userInvalidated = true;
	}

	return m;
}