// Selectors
const taskInput = document.querySelector(".input-task");
const addBtn = document.querySelector(".add-btn")
const todoList = document.querySelector(".task-box");
const allClearBtn = document.querySelector(".clear-btn");

// todos
const getTodosFromStorage = () => {
	const storage = JSON.parse(localStorage.getItem("todos"));
	return (storage) ? storage : [];
}

const todos = getTodosFromStorage();


// function getTodoPage
const getTodoPage = () => {
	todos.map(todo => {
		createTodo(todo)
	})
}

window.addEventListener("load", () => {
	getTodoPage();
})


const saveStorage = (todo) => {
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos))
	createTodo(todo)
}

// function deleteStorage
const deleteStorage = (todo) => {
	const index = todos.indexOf(todo);
	todos.splice(index,1)
	localStorage.setItem("todos", JSON.stringify(todos))
}


// function deleteTodo 
const deleteTodo = (target) => {
	const todo = target.parentNode.parentNode.childNodes[0].childNodes[1].innerHTML
	deleteStorage(todo);
	target.parentNode.parentNode.remove()
}


// function CheckTodo
const checkTodo = (target) => {
	target.classList.toggle("complated")
	target.parentNode.childNodes[0].classList.toggle("dBlock")
	
}


// events
// addBtn
addBtn.addEventListener("click", () => {
	const todoInput = taskInput.value;
	if(todoInput.trim() === "") {
		 $(".error").toast("show"); 
	}
	else if (todoInput) saveStorage(todoInput);
	$(".success").toast("show");;
	taskInput.value = "";
})
// clearBtn
allClearBtn.addEventListener("click", () => {
	console.log(todos)
	localStorage.clear();
	window.location.reload(true)
})




// function createTodo
const createTodo = (text) => {

	// Create Li
	const createLi = document.createElement("li");
	createLi.classList.add("task");
	// Create Label Div
	const createLabel = document.createElement("div");
	createLabel.classList.add("label")
	// Create İnput
	const createInput = document.createElement("i");
	createInput.classList.add("fa-solid");
	createInput.classList.add("fa-check");
	// Create P
	const createP = document.createElement("p");
	createP.setAttribute("onclick", "checkTodo(this)")
	createP.innerHTML = text;
	// Add Element in Label
	createLabel.appendChild(createInput);
	createLabel.appendChild(createP);

	//Create Div
	const createDiv = document.createElement("div");
	createDiv.classList.add("settings")

	// Create Buttons
	const deleteBtn = document.createElement("button");
	deleteBtn.innerHTML = "Delete"
	deleteBtn.classList.add("task-btn")
	deleteBtn.classList.add("delete-btn")
	deleteBtn.setAttribute("onclick", "deleteTodo(this)");

	// Add Element in Div
	createDiv.appendChild(deleteBtn);

	// Add Element in Li
	createLi.appendChild(createLabel);
	createLi.appendChild(createDiv);

	// Add TodoList
	todoList.appendChild(createLi)

}




