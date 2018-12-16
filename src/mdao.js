const mongojs = require('mongojs');
const search = require('./search')
const mdao = {};

mdao.getDB = function getDB() {
	var db;
	if (process.env.mongoDBConnection) {
		db = mongojs(process.env.mongoDBConnection);
	} else {
		var secret = require('./secretGitIgnore');
		db = mongojs(secret.mongoDBConnection);
	}
	return db;
};

mdao.getPersons = function(fname, lname, city) {
	var db = mdao.getDB();
	return new Promise((resolve, reject) => {
		const query = search.getSearchQueryObject(fname, lname, city);
		console.log(query)
		const result = db.ww2persons.find(query, function(err, dbData) {
			resolve(dbData.filter((d,i)=>i<500));
		})
		//.limit(5)

		// end of find
	}); //end of promise
};

module.exports = mdao;
