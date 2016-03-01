(function () {
	var table = window.document.querySelector(".stud-list");
	var studentsList;

	function Student(options) {
		this.name = options.name || '';
		this.date = options.date || (moment().format("DD-MM-YYYY"));
		this.age = options.age || 0
		this.mark = options.mark || 0;
	};

	function getList() {
		if (window.localStorage.getItem("students")){
			return JSON.parse(window.localStorage.getItem("students"));
		} else {
			return [];
		};
	};

	function checkForSaved() {
		studentsList = getList();
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

		if (validateInfo(info)){
			addStudent(options);
			clearInfo();
		} else {
			var errortype = validateInfo(options);
		};

	};

	function validateInfo(options) {
		var checkName = /^[A-Za-z]{3,16}$/;
		var checkNumber = /^[0-9]{0,3}$/;
		var maxNumber = 100;

		return true;

	};

	function clearInfo() {
		window.document.querySelector("#stud-name").value = '';
		window.document.querySelector("#regist-date").value = '';
		window.document.querySelector("#stud-age").value = '';
		window.document.querySelector("#stud-mark").value = '';
	};

	function addStudent(info) {
		debugger;
		studentsList = getList();
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
		
		// Create table row
		var TR = window.document.createElement('tr');
		TR.setAttribute('data-index', i);

		//Create table cell with student's number and append it to the table row
		var TDIndex = window.document.createElement('td');
		TDIndex.innerHTML = '<td>' + (i+1) + '</td>';
		TR.appendChild(TDIndex);

		// Create table cells with information about student and append it to the table row
		for(key in stud) {
			var TD = window.document.createElement('td');
			var info = window.document.createElement('span');
			var input = window.document.createElement('input');
			if (key === 'name') {var type = 'text'}
			else if (key === 'date') {var type = key}
			else {var type = 'number'};

			info.textContent = stud[key];

			input.setAttribute('class', 'onEdit-' + key + '-' + i + ' hide');
			input.type = type;
			input.value = stud[key];

			TD.appendChild(info);
			TD.appendChild(input);
			TR.appendChild(TD);
		};

		// Create table cell with action buttons (edit and delete)
		var btns = {'trash': 'delete-stud', 'pencil': 'edit-stud', 'floppy-o': 'save-stud hide'};
		var TDbtns = window.document.createElement('td');
		for(key in btns) {
			var btn = window.document.createElement('button');
			btn.setAttribute('class', btns[key]);
			btn.setAttribute("data-index", i);
			btn.innerHTML = '<i class="fa fa-' + key + ' action-btn"></i>';
			TDbtns.appendChild(btn);
		};
		TR.appendChild(TDbtns);

		// Append table row with all information to table
		table.appendChild(TR);
	};

	function renderTable(list) {
		debugger;
		// Clear students list before rendering
		trDel = table.querySelectorAll('tr[data-index]')
		for(n = 0; n < trDel.length; n++) {
			debugger;
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
		var edit = window.document.querySelector('[data-editting="true"]');
		if (edit) {
			var studentsNumber = edit.getAttribute('data-index');
			saveStudent(studentsNumber);
		}
	};

	function editStudent(index) {
		debugger;
		checkForEditing();
		var TR = window.document.querySelector('tr[data-index="' + index + '"]');
		var inputs = TR.querySelectorAll('input');
		var spans = TR.querySelectorAll('span');
		var buttons = TR.querySelectorAll('button');

		for (var k = 0; k < inputs.length; k++) {
			inputs[k].classList.toggle('hide');
			spans[k].classList.toggle('hide');
		};

		for (var b = 0; b < buttons.length; b++) {
			buttons[b].classList.toggle('hide');
		};
	};

	function saveStudent(index) {
		debugger;
		var trEdit = window.document.querySelector('tr[data-index="' + index + '"]');
		var optionNew = {
			name: String(trEdit.querySelector('[class^="onEdit-name"]').value) || '',
			date: trEdit.querySelector('[class^="onEdit-date"]').value || (moment().format("DD-MM-YYYY")),
			age: trEdit.querySelector('[class^="onEdit-age"]').value || 0,
			mark: trEdit.querySelector('[class^="onEdit-mark"]').value || 0,
		};

		if (validateInfo(optionNew)) {
			studentsList[index] = new Student(optionNew);
			saveLocal(studentsList);
			renderTable(studentsList);
		} else {
			var errortype = validateInfo(options);
		}
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

	students.getList = getList;
	students.checkForSaved = checkForSaved;
	students.getStudentInfo = getStudentInfo;
	students.clearInfo = clearInfo;
	students.validateInfo = validateInfo;
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
		var target = e.target;
		var parent = target.parentNode.parentNode.nodeName;
		if (parent === 'TH') {
			var sortType = target.getAttribute('data-type')
			sortArr(sortType);
		} else {
			if (target.nodeName === 'BUTTON') {
				var className = target.className;
				var index = target.getAttribute('data-index');
			} else {
				var className = target.parentNode.className;
				var index = target.parentNode.getAttribute('data-index');
			};

			if (className === 'edit-stud') {
				editStudent(index);
			} else if (className === 'delete-stud') {
				deleteStudent(index);
			} else if (className === 'save-stud') {
				saveStudent(index);
			};

		};
	};

}());

window.students.checkForSaved();