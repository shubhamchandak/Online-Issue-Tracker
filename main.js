document.getElementById('issueInputForm').addEventListener("submit", saveIssue);

function saveIssue(e){
	var issueDescription = document.getElementById('issueDescriptionInput').value;
	var issuePriority = document.getElementById('issuePriorityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid();
	var issueStatus = 'Open';

	var issue = {
		id: issueId,
		description: issueDescription,
		priority: issuePriority,
		assignedTo: issueAssignedTo,
		status: issueStatus
	}

	if(localStorage.getItem('issues') == null){
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();

	fetchIssues();

	e.preventDefault();
}

function setStatusClose(id){
	var issues = JSON.parse(localStorage.getItem('issues'));
	for(var i = 0; i < issues.length; i++){
		if(issues[i].id == id){
			issues[i].status = 'Close';
			break;
		}
	}
	localStorage.setItem('issues', JSON.stringify(issues));
	fetchIssues();
}

function deleteIssue(id){
	var issues = JSON.parse(localStorage.getItem('issues'));
	for(var i = 0; i < issues.length; i++){
		if(issues[i].id == id){
			issues.splice(i, 1);
			break;
		}
	}
	localStorage.setItem('issues',JSON.stringify(issues));
	fetchIssues();
}

function fetchIssues(){
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issueList = document.getElementById('issueList');

	issueList.innerHTML = '';

	for(var i = 0; i < issues.length; i++){
		var id = issues[i].id;
		var description = issues[i].description;
		var priority = issues[i].priority;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issueList.innerHTML += '<div class="well">' + 
							'<h6>Issue ID: ' + id + '</h6>' +
							'<p><span class="label label-info">' + status + '</span></p>' +
							'<h3>' + description + '</h3>' + 
							'<p><span class="glyphicon glyphicon-time"></span> ' + priority + '</p>' + 
							'<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
							'<a href="#" onclick="setStatusClose(\''+id+'\')" class="btn btn-warning">Close</a>' + 
							"  " + 
							'<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' + 
							'</div>';	
	}
	

}
