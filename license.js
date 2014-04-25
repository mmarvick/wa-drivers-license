var alpha = 		["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "*"];
var code  = 		[ 1,   2,   3,   4,   5,   6,   7,   8,   9,   1,   2,   3,   4,   5,   6,   7,   8,   9,   2,   3,   4,   5,   6,   7,   8,   9,   0 ];

var month_out = 	["B", "C", "D", "J", "K", "L", "M", "N", "O", "P", "Q", "R"];
var alt_month_out = ["S", "T", "U", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var day_out =   	["A", "B", "C", "D", "E", "F", "G", "H", "Z", "S", "J", "K", "L", "M", "N", "W", "P", "Q", "R", "O", "1", "2", "3", "4", "5", "2", "7", "8", "9", "T", "U"]

function calculate (form) {
	var errors = [];
	var year = parseInt(form.year.value);
	var month = parseInt(form.month.value);
	var day = parseInt(form.day.value);
	var first = formatname(form.firstname.value, 1);
	var middle = formatname(form.middlename.value, 1);
	var last = formatname(form.lastname.value, 5);

	var monthcode = getmonthcode(month, errors);
	var daycode = getdaycode(day, errors);
	var yearcode = getyearcode(year, errors);
	var check = getcheck(yearcode, monthcode, daycode, first, middle, last);

	var altmonthcode = getaltmonthcode(month);
	var altcheck = getcheck(yearcode, altmonthcode, daycode, first, middle, last);

	var license = last+first+middle+yearcode+check+monthcode+daycode;
	var altlicense = last+first+middle+yearcode+altcheck+altmonthcode+daycode;

	var process

	document.getElementById("form-col").className="eq-height col-sm-6";
	document.getElementById("info-col").style.display = "inline";
	document.getElementById("panel-right").style.height = document.getElementById("panel-left").clientHeight + 'px';
	if (errors.length > 0) {
		displayErrors(errors);
	} else {
		generateHTML(license, altlicense);
	}
};

function generateHTML(license, altlicense) {
	document.getElementById("panel-right").className="panel panel-primary";
	html = "<h4>License Number:</h4>" + license + "<br /><br /><h4>Alternate License Number:</h4>" + altlicense;
	document.getElementById("info").innerHTML = html;
}

function displayErrors(errors) {
	document.getElementById("panel-right").className="panel panel-danger";
	html = "<h4>Errors:</h4><ul>";
	for (var i=0; i<errors.length; i++) {
		html += "<li>" + errors[i] + "</li>";
	}
	html += "</ul>";
	document.getElementById("info").innerHTML = html;
}

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
	return ((check % 10)+10)%10;
}

function getyearcode(year, errors) {
	if (isNaN(year)) {
		errors.push("Invalid year");
		return;
	}
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

function getdaycode(day, errors) {
	if (isNaN(day) || day < 1 || day > 31) {
		errors.push("Invalid day");
		return;
	}
	return day_out[day-1];
};

function match(key, input, output) {
	for (var i = 0; i < input.length; i++) {
		if (input[i] == key) {
			return output[i]
		}
	}
}