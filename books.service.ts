import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://openlibrary.org/search.json?title=';

  constructor(private http: HttpClient) {}

  // Fetch books from Open Library API
  fetchBooks(searchTitle: string = 'the lord of the rings'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${searchTitle}`);
  }
}
