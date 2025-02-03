import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { HomepageComponent } from './homepage/homepage.component';// You can create this for your homepage
import { ManageAuthorsComponent } from './manage-authors/manage-authors.component';
const routes: Routes = [
  { path: '', component: HomepageComponent }, // Home route
  { path: 'manageauthors', component: ManageAuthorsComponent }, // Manage Books route
  { path: 'managebooks', component: ManageBooksComponent }, // Manage Books route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
