function Students() {
	debugger;
	var parent = this;
	var studentsList;
	var table = $('.stud-list');

	function Student(info) {
		this.name = info.name || '';
		this.date = info.date || (new Date().getFullYear() + '-' + (new Date().getMonth()<9 ? '0' + (new Date().getMonth() + 1):(new Date().getMonth() + 1)) + '-' + new Date().getDate());
		this.age = info.age || '';
		this.mark = info.mark || '';
	};

	this.getStudentInfo = function() {
		var info = {
			name: window.document.querySelector('#stud-name').val(),
			mark: window.document.querySelector('#stud-mark').val(),
			date: window.document.querySelector('#regist-date').val(),
			age: window.document.querySelector('#stud-age').val(),
		};
		parent.addStudent(info);
	};

	this.addStudent = function(info) {
		parent.studentsList[parent.index] = new Student(info);
		parent.saveLocal(parent.studentsList);
		parent.createTR(parent.studentsList[parent.index], parent.index);
	};

	this.saveLocal = function(list) {
		list = JSON.stringify(list);
		window.localStorage.setItem("students", list);
	};

	this.isEmpty = function(list) {
		if (list.length === 0) {
			table.empty();
			return true;
		} else {
			return false;
		}
	};

	this.createTR = function (stud, index) {
		var tableData = $("<td>" + (index+1) + "</td><td>" + stud.name + "</td><td>" + stud.date + "</td><td>" + stud.age + "</td><td>" + stud.mark + "</td>");
		var delButton = $("<button type='button'>X</button>").attr("data-index", index);
		delButton.addClass("delete-stud");
		var editButton = $("<button type='button'>Edit</button>").attr("data-index", index);
		editButton.addClass("edit-stud");
		
		var tableRow = $("<tr></tr>").attr("data-index", index);

		tableRow.append(tableData);
		($("<td class='action-btns'></td>").append(delButton, editButton)).appendTo(tableRow);
		table.append(tableRow);
	};

	this.renderTable = function(list) {
		table.empty();

		if (!parent.isEmpty(list)) {

			$("<tr><th>№</th><th>Name<button type=\"button\" data-type=\"AZ\">&#8911</button><button type=\"button\" data-type=\"ZA\">&#8910</button></th><th>Date<button type=\"button\" data-type=\"D\">&#8911</button><button type=\"button\" data-type=\"RD\">&#8910</button></th><th>Age<button type=\"button\" data-type=\"AG\">&#8911</button><button type=\"button\" data-type=\"RAG\">&#8910</button></th><th>Mark<button type=\"button\" data-type=\"M\">&#8911</button><button type=\"button\" data-type=\"RM\">&#8910</button></th><th>Actions</th><tr>").appendTo(table);

			list.forEach(function(item, index) {
				var options = {
					name: item.name,
					date: item.date,
					age: item.age,
					mark: item.mark
				};

				parent.createTR(options, index);

			});
		} else {
			window.document.querySelector('h1').remove();
		};
	};

	this.getStudents = function() {
		debugger;
		if (window.localStorage.getItem('students')) {
			studentsList = JSON.parse(window.localStorage.getItem('students'));
			$('.students-list').prepend('<h1>Students list</h1>');
			index = studentsList.length;
			parent.renderTable(studentsList);
		} else {
			studentsList = [];
			index = studentsList.length;
		}
	};

	this.getStudents();
	

};

new Students();
