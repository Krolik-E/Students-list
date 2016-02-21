var table = $(".stud-list");

if (window.localStorage.getItem("students")){
	var students = JSON.parse(window.localStorage.getItem("students"));
	$(".students-list").prepend("<h1>Students list</h1>");
	renderTable(students);

} else {
	var students = [];
};


var i = students.length || 0;

function student(options) {
	this.name = options.name || '';
	this.date = options.date || (new Date().getFullYear() + '-' + (new Date().getMonth()<9 ? '0' + (new Date().getMonth() + 1):(new Date().getMonth() + 1)) + '-' + new Date().getDate());
	this.age = options.age || '';
	this.mark = options.mark || '';
};

$(".add-to-list").on("click", function () {
	var options = {
		name: $("#stud-name").val(),
		mark: $("#stud-mark").val(),
		date: $("#regist-date").val(),
		age: $("#stud-age").val(),
	}

	addStudentToList(students, i, options);

	i+= 1;
	$("#stud-name").val("");
	$("#regist-date").val("");
	$("#stud-age").val("");
	$("#stud-mark").val("");

});

function isEmpty(arr) {
	debugger;
	if (arr.length === 0) {

		table.empty();
		return true;
	} else {

		return false;
	}
}

function addStudentToList(arr, i, options) {
	debugger;
	if (isEmpty(arr)) {
		$(".students-list").prepend("<h1>Students list</h1>");
		$("<tr><th>№</th><th>Name<button type=\"button\" onClick=\"sortArr('AZ')\">A</button><button type=\"button\" onClick=\"sortArr('ZA')\">Z</button></th><th>Date<button type=\"button\" onClick=\"sortArr('D')\">D</button><button type=\"button\" onClick=\"sortArr('RD')\">RD</button></th><th>Age<button type=\"button\" onClick=\"sortArr('AG')\">AG</button><button type=\"button\" onClick=\"sortArr('RAG')\">RAG</button></th><th>Mark<button type=\"button\" onClick=\"sortArr('M')\">M</button><button type=\"button\" onClick=\"sortArr('RM')\">RM</button></th><th>Actions</th><tr>").appendTo(table);
		i = 0;
	};

	arr[i] = new student(options);

	saveToLocalStorage(arr);
	addTableRow(i, arr[i]);

};

function saveToLocalStorage(arr) {
	debugger;
	arr = JSON.stringify(arr);
	window.localStorage.setItem("students", arr);
}

function addTableRow (i, student) {
	 
	var tableData = $("<td>" + (i+1) + "</td><td>" + student.name + "</td><td>" + student.date + "</td><td>" + student.age + "</td><td>" + student.mark + "</td>");
	var delButton = $("<button type='button'>X</button>").attr("data-index", i);
	delButton.addClass("delete-stud");
	var editButton = $("<button type='button'>Edit</button>").attr("data-index", i);
	editButton.addClass("edit-stud");
	
	var tableRow = $("<tr></tr>").attr("data-index", i);

	tableRow.append(tableData);
	($("<td class='action-btns'></td>").append(delButton, editButton)).appendTo(tableRow);
	table.append(tableRow);
};

function deleteStudent(i) {
	
	students.splice(i, 1);
	saveToLocalStorage(students);
	renderTable(students);

};

function checkForEditing() {
	debugger;
	var edit = $('.save-student');
	if (edit.length !== 0) {
		debugger;
		var studentsNumber = edit.data('index');
		saveStudent(studentsNumber);
	}
};

function editStudent(index) {
	debugger;
	checkForEditing();
	var tableR = $('tr[data-index=' + index + ']');
	var childArr = tableR.children();

	jQuery(childArr[1]).html("");
	jQuery(childArr[2]).html("");
	jQuery(childArr[3]).html("");
	jQuery(childArr[4]).html("");
	jQuery(childArr[5]).html("<button type='button' data-index=" + index + " class=\"save-student\" onClick='saveStudent(" + index + ")'>Save</button>");

	($('<input type="text" id="edit-stud-name">').val(students[index].name)).appendTo(childArr[1]);
	($('<input type="date" id="edit-regist-date">').val(students[index].date)).appendTo(childArr[2]);
	($('<input type="number" id="edit-stud-age">').val(students[index].age)).appendTo(childArr[3]);
	($('<input type="number" id="edit-stud-mark">').val(students[index].mark)).appendTo(childArr[4]);

};

function saveStudent(index) {
	debugger;
	students[index].name = $('#edit-stud-name').val() || '';
	students[index].date = ($('#edit-regist-date').val()) || (new Date().getFullYear() + '-' + (new Date().getMonth()<9 ? '0' + (new Date().getMonth() + 1):(new Date().getMonth() + 1)) + '-' + new Date().getDate());
	students[index].age = ($('#edit-stud-age').val()) || '';
	students[index].mark = ($('#edit-stud-mark').val()) || '';

	saveToLocalStorage(students);
	renderTable(students);
};

function renderTable(arr) {

	table.empty();

	if (!isEmpty(arr)) {

		$("<tr><th>№</th><th>Name<button type=\"button\" data-type=\"AZ\">&#8911</button><button type=\"button\" data-type=\"ZA\">&#8910</button></th><th>Date<button type=\"button\" data-type=\"D\">&#8911</button><button type=\"button\" data-type=\"RD\">&#8910</button></th><th>Age<button type=\"button\" data-type=\"AG\">&#8911</button><button type=\"button\" data-type=\"RAG\">&#8910</button></th><th>Mark<button type=\"button\" data-type=\"M\">&#8911</button><button type=\"button\" data-type=\"RM\">&#8910</button></th><th>Actions</th><tr>").appendTo(table);

		arr.forEach(function(item, index) {
			var options = {
				name: item.name,
				date: item.date,
				age: item.age,
				mark: item.mark
			};

			addTableRow(index, options);

		});
	} else {
		$("h1").remove();
	};
};

function sortArr(type) {
	debugger;
	switch (type) {
		case 'AZ':
			students.sort(sortAZ)
			break
		case 'ZA':
			students.sort(sortZA)
			break
		case 'D':
			students.sort(sortDate)
			break
		case 'RD':
			students.sort(sortRDate)
			break
		case 'AG':
			students.sort(sortAge)
			break
		case 'RAG':
			students.sort(sortRAge)
			break
		case 'M':
			students.sort(sortMark)
			break
		case 'RM':
			students.sort(sortRMark)
			break
	};

	saveToLocalStorage(students);
	renderTable(students);
}

function sortAZ(a, b) {
	if (a.name > b.name) return 1;
	if (a.name < b.name) return -1;
};

function sortZA(a, b) {
	if (a.name < b.name) return 1;
	if (a.name > b.name) return -1;
};

function sortDate(a, b) {
	if (a.date > b.date) return 1;
	if (a.date < b.date) return -1;
};

function sortRDate(a, b) {
	if (a.date < b.date) return 1;
	if (a.date > b.date) return -1;
};

function sortAge(a, b) {
	if (parseInt(a.age) > parseInt(b.age)) return 1;
	if (parseInt(a.age) < parseInt(b.age)) return -1;
};

function sortRAge(a, b) {
	if (parseInt(a.age) < parseInt(b.age)) return 1;
	if (parseInt(a.age) > parseInt(b.age)) return -1;
};

function sortMark(a, b) {
	debugger;
	if (parseInt(a.mark) > parseInt(b.mark)) return 1;
	if (parseInt(a.mark) < parseInt(b.mark)) return -1;
};

function sortRMark(a, b) {
	if (parseInt(a.mark) < parseInt(b.mark)) return 1;
	if (parseInt(a.mark) > parseInt(b.mark)) return -1;
};

window.document.querySelector('.stud-list').onclick = function(e) {
	debugger;
	e = e || window.event;
	var target = event.target;
	var parent = target.parentNode.nodeName;
	if (parent === 'TH') {
		var sortType = target.getAttribute('data-type')
		sortArr(sortType);
	} else {
		var className = target.className;
		var index = target.getAttribute('data-index');
		if (className === 'edit-stud') {
			editStudent(index);
		};
		if (className === 'delete-stud') {
			deleteStudent(index);
		};
	};
};
