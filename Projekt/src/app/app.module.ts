import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectlistComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectlistComponent,
    ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
