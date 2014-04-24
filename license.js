var alpha = 		["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "*"];
var code  = 		[ 1,   2,   3,   4,   5,   6,   7,   8,   9,   1,   2,   3,   4,   5,   6,   7,   8,   9,   2,   3,   4,   5,   6,   7,   8,   9,   0 ];

var month_out = 	["B", "C", "D", "J", "K", "L", "M", "N", "O", "P", "Q", "R"];
var alt_month_out = ["S", "T", "U", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var day_out =   	["A", "B", "C", "D", "E", "F", "G", "H", "Z", "S", "J", "K", "L", "M", "N", "W", "P", "Q", "R", "O", "1", "2", "3", "4", "5", "2", "7", "8", "9", "T", "U"]

function calculate (form) {
	var year = parseInt(form.year.value);
	var month = parseInt(form.month.value);
	var day = parseInt(form.day.value);
	var first = formatname(form.firstname.value, 1);
	var middle = formatname(form.middlename.value, 1);
	var last = formatname(form.lastname.value, 5);
	var monthcode = getmonthcode(month);
	var altmonthcode = getaltmonthcode(month);
	var daycode = getdaycode(day);
	var yearcode = getyearcode(year);
	var check = getcheck(yearcode, monthcode, daycode, first, middle, last);
	var altcheck = getcheck(yearcode, altmonthcode, daycode, first, middle, last);
	alert(last+first+middle+yearcode+check+monthcode+daycode + '\n' + last+first+middle+yearcode+altcheck+altmonthcode+daycode);
};

function formatname(value, length) {
	name = value.toUpperCase().trim()
	if (name.length < length) {
		name = name + (new Array(length-name.length+1)).join("*");	//Truncate with asterisks if value is shorter than length
	} else if (name.length > length) {
		name = name.substr(0,length)
	}
	return name
}

function getcheck(yearcode, monthcode, daycode, first, middle, last) {
	checkstr = last + first + middle + yearcode + monthcode + daycode;
	check = 0;
	for (var i = 0; i < checkstr.length; i++) {
		multiplier = i%2 == 0 ? +1 : -1;
		check += getnumcode(checkstr[i]) * multiplier; 
	}
	return check % 10;
}

function getyearcode(year) {
	year = 100 - year%100;
	if (year == 100) {
		return "00"
	} else if (year < 10) {
		return "0" + year.toString();
	} else {
		return year.toString();
	}
}

function getnumcode(char) {
	if (!(isNaN(char))) {
		return parseInt(char)
	}
	return match(char, alpha, code);
}

function getmonthcode(month) {
	return month_out[month-1];
};

function getaltmonthcode(month) {
	return alt_month_out[month-1];
};

function getdaycode(day) {
	return day_out[day-1];
};

function match(key, input, output) {
	for (var i = 0; i < input.length; i++) {
		if (input[i] == key) {
			return output[i]
		}
	}
}