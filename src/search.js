const search = {};

search.getSearchQueryObject = function(fname, lname, city) {
	const result = {};
	if (fname != '_') {
		result.nameEn = fname.toLowerCase();
	}
	if (lname != '_') {
		result.lastNameEn = lname.toLowerCase();
	}
	if (!isNaN(+city)) {
		result.place = +city;
	} else {
		if (!result.nameEn && !result.lastNameEn) {
			result.place = Math.round(Math.random() * 10);
		}
	}

	return result;
};

module.exports = search;
