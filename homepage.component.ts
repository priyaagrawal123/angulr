import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  loading: boolean = false;
  selectedBook: any = null;
  page: number = 1;
  hasMore: boolean = true;
  observer: IntersectionObserver | undefined;

  @ViewChild('lastBookElement') lastBookElement!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks(this.page);
  }

  fetchBooks(currentPage: number): void {
    this.loading = true;
    const endpoint = `http://openlibrary.org/search.json?q=${this.searchQuery || 'all'}&limit=10&page=${currentPage}`;
    this.http.get<any>(endpoint).subscribe({
      next: (response) => {
        const filteredResults =
          response.docs?.filter((book: any) => book.title && book.author_name) || [];
        this.searchResults = [...this.searchResults, ...filteredResults];
        this.hasMore = filteredResults.length === 10;
      },
      error: (error) => {
        console.error('Error fetching books:', error.message);
        alert('An error occurred while fetching the books. Please try again.');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  handleSearch(): void {
    if (!this.searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }
    this.page = 1;
    this.searchResults = [];
    this.fetchBooks(1);
  }

  handleBookClick(book: any): void {
    this.selectedBook = book;
  }

  handleClosePopup(): void {
    this.selectedBook = null;
  }

  lastBookElementRef(node: any): void {
    if (this.loading) return;
    if (this.observer) this.observer.disconnect();
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && this.hasMore) {
        this.page++;
        this.fetchBooks(this.page);
      }
    });
    if (node) this.observer.observe(node);
  }
}
