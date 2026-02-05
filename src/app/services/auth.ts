import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private users: User[] = [];
  private currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor() {
    // Initialize with some demo data
    this.users = [
      {
        id: '1',
        email: 'demo@example.com',
        password: 'password123',
        name: 'John Doe',
        phone: '1234567890'
      }
    ];
  }

  register(email: string, password: string, name: string, phone: string): boolean {
    // Check if user already exists
    if (this.users.find(u => u.email === email)) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      name,
      phone
    };
    
    this.users.push(newUser);
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
