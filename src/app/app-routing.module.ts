import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './features/book-detail/book-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './login.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'book', component: DashboardComponent, canActivate: [LoginGuard]
  },
  {
    path: 'book/:id', component: BookDetailComponent
  },
  {
    path: '', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
