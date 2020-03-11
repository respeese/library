class Library {
	constructor(){
		this.library = [];
		this.newBookForm = document.querySelector('#new-book-form');
	}

	addBookToLibrary(titleVal, authorVal, numPagesVal, readVal){
		let newBook = new Book(titleVal, authorVal, numPagesVal, readVal);
		this.library.push(newBook);
		this.render(newBook);
	}	

	render(book) {
		const books_table = document.querySelector('#books-table');

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
		new_row.setAttribute("data-library-index", (this.library.length - 1));

		title_cell.innerHTML = book.title;
		author_cell.innerHTML = book.author;
		numPages_cell.innerHTML = book.numPages;
		haveRead_cell.innerHTML = book.haveRead;
		deleteButton.innerHTML = "Delete";
		readButton.innerHTML = "Change";

		deleteButton.onclick = () => {
			let libraryIndex = new_row.dataset.libraryIndex;
			new_row.remove();
			this.library.splice(libraryIndex, 1);

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

	addNewBookBtn(){
		const newBookButton = document.querySelector('#new-book-btn');


		newBookButton.addEventListener('click', () => {
			if(this.newBookForm.style.display == "none") {
				this.newBookForm.style.display = "block";
			} else {
				this.newBookForm.style.display = "none";
			}
		})
	}

	addSubmitBtn(){
		const submitBtn = document.querySelector('#book-submit');


		submitBtn.addEventListener('click', (e) => {
			e.preventDefault();
			let titleValue = document.querySelector('#title').value;
			let authorValue = document.querySelector('#author').value;
			let numPagesValue = document.querySelector('#num-pages').value;
			let readValue = "No";
			if(document.querySelector('#yes-read').checked) {
				readValue = document.querySelector('#yes-read').value;
			}

			this.newBookForm.reset();
			this.newBookForm.style.display = "none";
			myLibrary.addBookToLibrary(titleValue, authorValue, numPagesValue, readValue);
		})
	}
}

class Book {
	constructor(title, author, numPages, haveRead){
		this.title = title;
		this.author = author;
		this.numPages = numPages;
		this.haveRead = haveRead;
	}
}

let myLibrary = new Library();
myLibrary.addNewBookBtn();
myLibrary.addSubmitBtn();



