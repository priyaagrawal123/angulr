import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  // styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  handleAuthorsClick() {
    this.router.navigate(['/manageauthors']);
  }

  handleBooksClick() {
    this.router.navigate(['/managebooks']);
  }
}
