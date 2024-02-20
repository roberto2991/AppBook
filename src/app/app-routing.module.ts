import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './features/book-detail/book-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './login.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]
  },
  {
    path: 'book/:id', component: BookDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
