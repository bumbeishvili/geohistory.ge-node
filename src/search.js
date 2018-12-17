const search = {};

search.getSearchQueryObject = function(fname, lname, city) {
	const result = {};
	if (fname != '_') {
		result.nameGe = new RegExp(`.*${fname.toLowerCase()}.*`, "u");
	}
	if (lname != '_') {
		result.lastNameGe = new RegExp(`.*${lname.toLowerCase()}.*`, "u");
	}
	if (!isNaN(+city)) {
		result.place = +city;
	} else {
		if (!result.nameGe && !result.lastNameGe) {
			result.place = Math.round(Math.random() * 10);
		}
	}

	return result;
};

module.exports = search;
