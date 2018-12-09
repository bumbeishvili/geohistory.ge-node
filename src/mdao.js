const mongojs = require('mongojs');
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

mdao.getPersons = function(parameters) {
	var db = mdao.getDB();
	return new Promise((resolve, reject) => {
		const result = db.ww2persons
			.find(
				{
					name: 250
				},
				function(err, dbData) {
					 	resolve(dbData);
				}
			)
			
		// end of find
	}); //end of promise
};

module.exports = mdao;
