const books_table = document.querySelector('#books-table');
const newBookButton = document.querySelector('#new-book-btn');
const submitBtn = document.querySelector('#book-submit');
const newBookForm = document.querySelector('#new-book-form');
let myLibrary = [];

function Book(title, author, numPages, haveRead) {
	this.title = title;
	this.author = author;
	this.numPages = numPages;
	this.haveRead = haveRead;
}

function addBookToLibrary(titleVal, authorVal, numPagesVal, readVal) {
	let newBook = new Book(titleVal, authorVal, numPagesVal, readVal);
	myLibrary.push(newBook);
	render(newBook);
}

function render(book) {
	let numRows = books_table.getElementsByTagName('tr').length;
	let new_row = books_table.insertRow(numRows);
	let title_cell = new_row.insertCell(0);
	let author_cell = new_row.insertCell(1);
	let numPages_cell = new_row.insertCell(2);
	let haveRead_cell = new_row.insertCell(3);
	let changeRead_cell = new_row.insertCell(4);
	let delete_cell = new_row.insertCell(5);
	
	let deleteButton = document.createElement('button');
	deleteButton.setAttribute('class', 'delete-btn');
	delete_cell.appendChild(deleteButton);
	let readButton = document.createElement('button');
	readButton.setAttribute('class', 'read-status-btn');
	changeRead_cell.appendChild(readButton);

	let attr = document.createAttribute("data-library-index");
	new_row.setAttribute("data-library-index", (myLibrary.length - 1));

	title_cell.innerHTML = book.title;
	author_cell.innerHTML = book.author;
	numPages_cell.innerHTML = book.numPages;
	haveRead_cell.innerHTML = book.haveRead;
	deleteButton.innerHTML = "Delete";
	readButton.innerHTML = "Change";

	deleteButton.onclick = () => {
		let libraryIndex = new_row.dataset.libraryIndex;
		new_row.remove();
		myLibrary.splice(libraryIndex, 1);

		numRows = books_table.getElementsByTagName('tr').length;
		for(let i = 1; i < numRows; i++) {
			books_table.rows[i].dataset.libraryIndex = (books_table.rows[i].rowIndex - 1);
		}
	}

	readButton.onclick = () => {
		if(book.haveRead == "Yes") {
			book.haveRead = "No";
		}
		else if(book.haveRead == "No") {
			book.haveRead = "Yes";
		}
		haveRead_cell.innerHTML = book.haveRead;
	}
}

newBookButton.addEventListener('click', () => {
	if(newBookForm.style.display == "none") {
		newBookForm.style.display = "block";
	} else {
		newBookForm.style.display = "none";
	}
})

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let titleValue = document.querySelector('#title').value;
	let authorValue = document.querySelector('#author').value;
	let numPagesValue = document.querySelector('#num-pages').value;
	let readValue = "No";
	if(document.querySelector('#yes-read').checked) {
		readValue = document.querySelector('#yes-read').value;
	}

	newBookForm.style.display = "none";
	addBookToLibrary(titleValue, authorValue, numPagesValue, readValue);
})