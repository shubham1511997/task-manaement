// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { restrictedForLoggedIn: true }, // redirect logged-in users
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { restrictedForLoggedIn: true },
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard], // only accessible if logged in
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
