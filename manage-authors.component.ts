import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Author {
  id: string | number;
  name: string;
  bio: string;
  year: string;
}

@Component({
  selector: 'app-manage-authors',
  templateUrl: './manage-authors.component.html',
  styleUrls: ['./manage-authors.component.scss'],
})
export class ManageAuthorsComponent implements OnInit {
  authors: Author[] = [];
  newAuthor = { name: '', bio: '', year: '' };
  isEditing = false;
  editingAuthorId: number | null = null;
  showPopup = false;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.http
      .get<any>('http://openlibrary.org/search.json?author=tolkien')
      .subscribe({
        next: (response) => {
          const authorDocs = response.docs.slice(0, 10); // Limit to 10 results
          const mappedAuthors = authorDocs.map((doc: any, index: number) => ({
            id: index,
            name: doc.author_name?.[0] || 'Unknown Author',
            bio: doc.title || 'No Bio Available',
            year: doc.publish_year?.[0] || 'Unknown Year',
          }));
          this.authors = mappedAuthors;
        },
        error: (err) => {
          console.error('Error fetching authors!', err);
        },
      });
  }

  handleDelete(id: string | number): void {
    this.authors = this.authors.filter((author) => author.id !== id);
    alert('Author deleted successfully (local simulation)');
  }

  handleSave(): void {
    if (!this.newAuthor.name || !this.newAuthor.bio || !this.newAuthor.year) {
      alert('All fields (name, bio, and year) are required!');
      return;
    }

    if (this.isEditing && this.editingAuthorId !== null) {
      this.authors = this.authors.map((author) =>
        author.id === (this.editingAuthorId != null ? this.editingAuthorId : -1)
          ? { ...author, ...this.newAuthor }
          : author
      );
      alert('Author updated successfully');
    } else {
      const newId = this.authors.length
        ? (Number(this.authors[this.authors.length - 1].id) + 1)
        : 0;
      this.authors.push({ id: newId, ...this.newAuthor });
      alert('Author added successfully');
    }
    this.closePopup();
  }

  openPopup(author: Author | null = null): void {
    this.showPopup = true;
    if (author) {
      this.isEditing = true;
      this.editingAuthorId = typeof author.id === 'string' ? +author.id : author.id;
      this.newAuthor = { name: author.name, bio: author.bio, year: author.year };
    } else {
      this.isEditing = false;
      this.editingAuthorId = null;
      this.newAuthor = { name: '', bio: '', year: '' };
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.newAuthor = { name: '', bio: '', year: '' };
    this.isEditing = false;
    this.editingAuthorId = null;
  }
}
