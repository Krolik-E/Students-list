(function () {
	var table = window.document.querySelector(".stud-list");
	var studentsList;

	function Student(options) {
		this.name = options.name || '';
		this.date = options.date || (moment().format("DD-MM-YYYY"));
		this.age = options.age || 0
		this.mark = options.mark || 0;
	};

	function getInitList() {
		if (window.localStorage.getItem("students")){
			return JSON.parse(window.localStorage.getItem("students"));
		} else {
			return [];
		};
	};

	function checkForSaved() {
		studentsList = getInitList();
		index = studentsList.length;
		if (studentsList.length) {
			renderTable(studentsList);
		}
	};

	function getStudentInfo () {
		var info = {
			name: String(window.document.querySelector('#stud-name').value),
			mark: window.document.querySelector('#stud-mark').value,
			date: window.document.querySelector('#regist-date').value,
			age: window.document.querySelector('#stud-age').value,
		};

		validateInfo(info);
		addStudent(info);

		clearInfo();
	};

	function validateInfo(options) {
		var checkName = /^[A-Za-z]{3,16}$/;
		var checkNumber = /^[0-9]{0,3}$/;
		var maxNumber = 100;

		

	};

	function clearInfo() {
		window.document.querySelector("#stud-name").value = '';
		window.document.querySelector("#regist-date").value = '';
		window.document.querySelector("#stud-age").value = '';
		window.document.querySelector("#stud-mark").value = '';
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
		var btns = {'trash': 'delete-stud', 'pencil': 'edit-stud'};
		var TR = window.document.createElement('tr');
		TR.setAttribute('data-index', i);
		var TDIndex = window.document.createElement('td');
		var TDBtns = window.document.createElement('td');

		TDIndex.innerHTML = '<td>' + (i+1) + '</td>';
		TR.appendChild(TDIndex);

		for(key in stud) {
			var TD = window.document.createElement('td');
			TD.innerHTML = '<td>' + stud[key] + '</td>';
			TR.appendChild(TD);
		};

		for(key in btns) {
			var btn = window.document.createElement('button');
			btn.setAttribute('class', btns[key]);
			btn.setAttribute("data-index", i);
			btn.innerHTML = '<i class="fa fa-"' + key + '" action-btn"></i>';
			TDBtns.appendChild(btn);
		};
		TR.appendChild(TDBtns);

		table.appendChild(TR);
	};

	function renderTable(list) {
		for(i = 1; i<table.children.length; i++) {
			table.removeChild(table.lastChild);
		};
		list.forEach(function(item, index) {
			var options = {
				name: item.name,
				date: item.date,
				age: item.age,
				mark: item.mark
			};

			createTR(options, index);

		});
	};

	function deleteStudent(i) {
	
		studentsList.splice(i, 1);
		saveLocal(studentsList);
		renderTable(studentsList);

	};

	function checkForEditing() {
		debugger;
		var edit = window.document.querySelector('.save-student');
		if (edit.length !== 0) {
			var studentsNumber = edit.getAttribute('data-index');
			saveStudent(studentsNumber);
		}
	};

	function editStudent(index) {
		debugger;
		checkForEditing();
		var TR = window.document.querySelector('tr[data-index=' + index + ']');
		var childArr = TR.children();

		childArr[1].innerHTML="";
		childArr[2].innerHTML="";
		childArr[3].innerHTML="";
		childArr[4].innerHTML="";
		childArr[5].innerHTML = "<button type='button' data-index=" + index + " class=\"save-student\" onClick='window.students.saveStudent(" + index + ")'>Save</button>";

		($('<input type="text" id="edit-stud-name">').val(studentsList[index].name)).appendTo(childArr[1]);
		($('<input type="date" id="edit-regist-date">').val(studentsList[index].date)).appendTo(childArr[2]);
		($('<input type="number" id="edit-stud-age">').val(studentsList[index].age)).appendTo(childArr[3]);
		($('<input type="number" id="edit-stud-mark">').val(studentsList[index].mark)).appendTo(childArr[4]);
	};

	function saveStudent(index) {
		debugger;
		studentsList[index].name = window.document.querySelector('#edit-stud-name').value || '';
		studentsList[index].date = window.document.querySelector('#edit-regist-date').value || (moment().format("DD-MM-YYYY"));
		studentsList[index].age = window.document.querySelector('#edit-stud-age').value || 0;
		studentsList[index].mark = window.document.querySelector('#edit-stud-mark').value || 0;

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
	students.valueateInfo = valueateInfo;
	students.addStudent = addStudent;
	students.saveLocal = saveLocal;
	students.createTR = createTR;
	students.renderTable = renderTable;
	students.deleteStudent = deleteStudent;
	students.checkForEditing = checkForEditing;
	students.editStudent = editStudent;
	students.saveStudent = saveStudent;
	students.Student = Student;
	students.sortArr = sortArr;
	students.sortTypes = sortTypes;

	window.students = students;

	window.document.querySelector(".add-to-list").addEventListener("click", window.students.getStudentInfo);

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