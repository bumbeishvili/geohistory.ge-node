const search = {};

search.getSearchQueryObject = function(fname, lname, city) {
	const result = {};
	if (fname != '_') {
		result.nameGe = new RegExp(`.*${fname.toLowerCase()}.*`, "i");
	}
	if (lname != '_') {
		result.lastNameGe = new RegExp(`.*${lname.toLowerCase()}.*`, "i");
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
