import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <-- Add this import
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageAuthorsComponent } from './manage-authors/manage-authors.component';
import { AppRoutingModule } from './app-routing.module';
import { ManageBooksComponent } from './manage-books/manage-books.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    ManageAuthorsComponent,
    ManageBooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // <-- Add FormsModule here
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
