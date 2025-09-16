import { Routes, CanActivateFn } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { isLoggedGuard } from './core/guards/is-logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
    title: 'Signin',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup',
  },
  {
    path: 'notes',
    canActivate: [isLoggedGuard],
    component: NotesComponent,
    title: 'Notes',
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Signin',
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Notfound',
  },
];
