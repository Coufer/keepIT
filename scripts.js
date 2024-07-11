const assignmentList = JSON.parse(localStorage.getItem('assignments')) || [];

displayAssignments();

function displayAssignments() {
    let assignmentHTML = '';

    for (let i = 0; i < assignmentList.length; i++) {
        const assignmentObject = assignmentList[i];

        const assignment = assignmentObject.name;
        const dueDate = assignmentObject.dueDate;

        const html = `
            <div>${assignment}</div>
            <div>${dueDate}</div> 
            <button  class="delete-button" onclick="deleteAssignment(${i})">delete</button>`;
        assignmentHTML += html;
    }

    const assignmentListElement = document.querySelector('.js-assignmentList');
    if (assignmentListElement) {
        assignmentListElement.innerHTML = assignmentHTML;
    }
}

function deleteAssignment(index) {
    assignmentList.splice(index, 1);
    updateLocalStorage();
}

function addAssignment() {
    const inputElement = document.querySelector('.js-assignmentName');
    const dateInputElement = document.querySelector('.js-assignmentDate');

    const assignmentName = inputElement.value;
    const dueDate = dateInputElement.value;

    if (assignmentName.trim() && dueDate !== '') {
        assignmentList.push({ name: assignmentName, dueDate: dueDate });
        updateLocalStorage();
        inputElement.value = '';
        dateInputElement.value = '';
    } else {
        alert('Please enter a valid assignment name and due date.');
    }
}

function updateLocalStorage() {
    localStorage.setItem('assignments', JSON.stringify(assignmentList));
    displayAssignments();
}
