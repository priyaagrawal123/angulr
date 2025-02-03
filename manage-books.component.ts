import { Component, OnInit } from '@angular/core';
import { BookService } from './books.service';

// Define the Book interface
interface Book {
  id: string;
  authorName: string;
  title: string;
  genre: string;
  publishedYear: string;
}

@Component({
  selector: 'managebooks',
  templateUrl: './manage-books.component.html',
  // styleUrls: ['./manage-books.component.css'],
})
export class ManageBooksComponent implements OnInit {
  books: Book[] = [];  // Ensure books are typed as an array of Book objects
  form: Omit<Book, 'id'> = {  // Ensure form doesn't require the 'id' property initially
    authorName: '',
    title: '',
    genre: '',
    publishedYear: '',
  };
  isEditing: boolean = false;
  editingId: string | null = null;
  showForm: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  // Fetch books from Open Library API
  fetchBooks(searchTitle: string = 'the lord of the rings'): void {
    this.bookService.fetchBooks(searchTitle).subscribe((response: any) => {
      this.books = response.docs.slice(0, 10).map((book: any) => ({
        id: book.key,
        authorName: book.author_name ? book.author_name[0] : 'Unknown',
        title: book.title,
        genre: book.subject ? book.subject[0] : 'Unknown',
        publishedYear: book.first_publish_year || 'Unknown',
      }));
    });
  }

  // Add a new book
  addBook(): void {
    const newBook: Book = {
      id: Date.now().toString(),  // Ensure an id is generated when adding a new book
      ...this.form,  // Spread the form values into the new book object
    };
    this.books.push(newBook);
    alert('Book added successfully!');
    this.resetForm();
  }

  // Update an existing book
  updateBook(): void {
    this.books = this.books.map((book) =>
      book.id === this.editingId ? { ...book, ...this.form } : book
    );
    alert('Book updated successfully!');
    this.resetForm();
  }

  // Delete a book
  deleteBook(id: string): void {
    this.books = this.books.filter((book) => book.id !== id);
    alert('Book deleted successfully!');
  }

  // Handle form submission
  handleSubmit(): void {
    if (this.isEditing) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  // Handle input changes
  handleChange(event: Event): void {  // Event is explicitly typed
    const input = event.target as HTMLInputElement;  // Cast to HTMLInputElement to access name and value
    this.form[input.name as keyof typeof this.form] = input.value;  // Safely update the form
  }

  // Handle edit button click
  handleEdit(book: Book): void {  // Ensure book parameter is typed as Book
    this.form = { ...book };  // Populate the form with the book's details
    this.isEditing = true;
    this.editingId = book.id;
    this.showForm = true;
  }

  // Reset form and close popup
  resetForm(): void {
    this.form = {
      authorName: '',
      title: '',
      genre: '',
      publishedYear: '',
    };
    this.isEditing = false;
    this.editingId = null;
    this.showForm = false;
  }
}
