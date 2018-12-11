const search = {};

search.getSearchQueryObject = function(fname, lname, city) {
    const result = {};
    if(!isNaN(+fname)){
        result.name = +fname;
    }else{

    }

    if(!isNaN(+lname)){
        result.lastName = +lname;
    }else{
        
    }

    if(!isNaN(+city)){
        result.place = +city;
    }else{
        
    }

    return result;
};

module.exports = search;
