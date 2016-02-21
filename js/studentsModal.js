(function () {
	var table = $(".stud-list");
	var studentsList;
	var index;

	function Student(options) {
		this.name = options.name || '';
		this.date = options.date || (moment().format("DD-MM-YYYY"));
		this.age = options.age || 0
		this.mark = options.mark || 0;
	};

	function getInitList() {
		debugger;
		if (window.localStorage.getItem("students")){
			return studentsList = JSON.parse(window.localStorage.getItem("students"));
		} else {
			return studentsList = [];
		};
	};

	function checkForSaved() {
		debugger;
		studentsList = getInitList();
		index = studentsList.length
		if (studentsList.length) {
			$(".students-list").prepend("<h1>Students list</h1>");
			renderTable(studentsList);
		}
	}

	 function getStudentInfo () {
		var info = {
			name: $('#stud-name').val(),
			mark: $('#stud-mark').val(),
			date: $('#regist-date').val(),
			age: $('#stud-age').val(),
		};

		addStudent(info);

		clearInfo();
	};

	function clearInfo() {
		$("#stud-name").val("");
		$("#regist-date").val("");
		$("#stud-age").val("");
		$("#stud-mark").val("");
	};

	function addStudent(info) {
		debugger;
		studentsList = getInitList();
		index = studentsList.length;
		studentsList[index] = new Student(info);
		saveLocal(studentsList);
		createTR(studentsList[index], index);
	};

	function saveLocal(list) {
		list = JSON.stringify(list);
		window.localStorage.setItem("students", list);
	};

	function createTR(stud, i) {
		var tableData = $("<td>" + (i+1) + "</td><td>" + stud.name + "</td><td>" + stud.date + "</td><td>" + stud.age + "</td><td>" + stud.mark + "</td>");
		var delButton = $("<button type='button'><i class='fa fa-trash action-btn'></i></button>").attr("data-index", i);
		delButton.addClass("delete-stud");
		var editButton = $("<button type='button'><i class='fa fa-pencil action-btn'></i></button>").attr("data-index", i);
		editButton.addClass("edit-stud");
		
		var tableRow = $("<tr></tr>").attr("data-index", i);

		tableRow.append(tableData);
		($("<td class='action-btns'></td>").append(delButton, editButton)).appendTo(tableRow);
		table.append(tableRow);
	};

	function isEmpty(list) {
		if (list.length === 0) {
			return true;
		} else {
			return false;
		}
	};

	function renderTable(list) {
		table.empty();

		if (!isEmpty(list)) {

			$("<tr><th>№</th><th>Name<button type=\"button\" data-type=\"AZ\"><i class='fa fa-sort-alpha-asc sort-btn'></i></button><button type=\"button\" data-type=\"ZA\"><i class='fa fa-sort-alpha-desc sort-btn'></i></button></th><th>Date<button type=\"button\" data-type=\"D\"><i class='fa fa-sort-amount-asc sort-btn'></i></button><button type=\"button\" data-type=\"RD\"><i class='fa fa-sort-amount-desc sort-btn'></i></button></th><th>Age<button type=\"button\" data-type=\"AG\"><i class='fa fa-sort-amount-asc sort-btn'></i></button><button type=\"button\" data-type=\"RAG\"><i class='fa fa-sort-amount-desc sort-btn'></i></button></th><th>Mark<button type=\"button\" data-type=\"M\"><i class='fa fa-sort-amount-asc sort-btn'></i></button><button type=\"button\" data-type=\"RM\"><i class='fa fa-sort-amount-desc sort-btn'></i></button></th><th>Actions</th><tr>").appendTo(table);

			list.forEach(function(item, index) {
				var options = {
					name: item.name,
					date: item.date,
					age: item.age,
					mark: item.mark
				};

				createTR(options, index);

			});
		} else {
			$('h1').remove();
		};
	};

	function deleteStudent(i) {
	
		studentsList.splice(i, 1);
		saveLocal(studentsList);
		renderTable(studentsList);

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
		jQuery(childArr[5]).html("<button type='button' data-index=" + index + " class=\"save-student\" onClick='window.students.saveStudent(" + index + ")'>Save</button>");

		($('<input type="text" id="edit-stud-name">').val(studentsList[index].name)).appendTo(childArr[1]);
		($('<input type="date" id="edit-regist-date">').val(studentsList[index].date)).appendTo(childArr[2]);
		($('<input type="number" id="edit-stud-age">').val(studentsList[index].age)).appendTo(childArr[3]);
		($('<input type="number" id="edit-stud-mark">').val(studentsList[index].mark)).appendTo(childArr[4]);

	};

	function saveStudent(index) {
		debugger;
		studentsList[index].name = $('#edit-stud-name').val() || '';
		studentsList[index].date = ($('#edit-regist-date').val()) || (moment().format("DD-MM-YYYY"));
		studentsList[index].age = ($('#edit-stud-age').val()) || '';
		studentsList[index].mark = ($('#edit-stud-mark').val()) || '';

		saveLocal(studentsList);
		renderTable(studentsList);
	};

	function sortArr(type) {
		debugger;
		switch (type) {
			case 'AZ':
				studentsList.sort(sortTypes.sortAZ)
				break
			case 'ZA':
				studentsList.sort(sortTypes.sortZA)
				break
			case 'D':
				studentsList.sort(sortTypes.sortDate)
				break
			case 'RD':
				studentsList.sort(sortTypes.sortRDate)
				break
			case 'AG':
				studentsList.sort(sortTypes.sortAge)
				break
			case 'RAG':
				studentsList.sort(sortTypes.sortRAge)
				break
			case 'M':
				studentsList.sort(sortTypes.sortMark)
				break
			case 'RM':
				studentsList.sort(sortTypes.sortRMark)
				break
		};

		saveLocal(studentsList);
		renderTable(studentsList);
	};

	var sortTypes = {
		'sortAZ' : function sortAZ(a, b) {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
		},

		'sortZA' : function sortZA(a, b) {
			if (a.name < b.name) return 1;
			if (a.name > b.name) return -1;
		},

		'sortDate' : function sortDate(a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
		},

		'sortRDate' : function sortRDate(a, b) {
			if (a.date < b.date) return 1;
			if (a.date > b.date) return -1;
		},

		'sortAge' : function sortAge(a, b) {
			if (parseInt(a.age) > parseInt(b.age)) return 1;
			if (parseInt(a.age) < parseInt(b.age)) return -1;
		},

		'sortRAge' : function sortRAge(a, b) {
			if (parseInt(a.age) < parseInt(b.age)) return 1;
			if (parseInt(a.age) > parseInt(b.age)) return -1;
		},

		'sortMark' : function sortMark(a, b) {
			debugger;
			if (parseInt(a.mark) > parseInt(b.mark)) return 1;
			if (parseInt(a.mark) < parseInt(b.mark)) return -1;
		},

		'sortRMark' : function sortRMark(a, b) {
			if (parseInt(a.mark) < parseInt(b.mark)) return 1;
			if (parseInt(a.mark) > parseInt(b.mark)) return -1;
		},
	};

	function students() {};

	students.getInitList = getInitList;
	students.checkForSaved = checkForSaved;
	students.getStudentInfo = getStudentInfo;
	students.clearInfo = clearInfo;
	students.addStudent = addStudent;
	students.saveLocal = saveLocal;
	students.createTR = createTR;
	students.isEmpty = isEmpty;
	students.renderTable = renderTable;
	students.deleteStudent = deleteStudent;
	students.checkForEditing = checkForEditing;
	students.editStudent = editStudent;
	students.saveStudent = saveStudent;
	students.Student = Student;
	students.sortArr = sortArr;
	students.sortTypes = sortTypes;

	window.students = students;

	$(".add-to-list").on("click", window.students.getStudentInfo);

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

}());

window.students.checkForSaved();