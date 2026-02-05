import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';
import { SeatBooking } from './components/seat-booking/seat-booking';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'seat-booking', component: SeatBooking },
  { path: '**', redirectTo: '/login' }
];
