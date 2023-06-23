import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'project-details', component: ProjectDetailsComponent },
  { path: 'details/:id', component: ProjectDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
