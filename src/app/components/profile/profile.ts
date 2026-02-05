import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { Booking } from '../../services/booking';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  currentUser: User | null = null;
  userBookings: any[] = [];

  constructor(
    private authService: Auth,
    private bookingService: Booking,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = user;
    this.userBookings = this.bookingService.getUserBookings(user.id);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToBooking(): void {
    this.router.navigate(['/seat-booking']);
  }

  getEventName(eventId: string): string {
    const event = this.bookingService.getEventDetails(eventId);
    return event ? event.name : 'Unknown Event';
  }

  getEventVenue(eventId: string): string {
    const event = this.bookingService.getEventDetails(eventId);
    return event ? event.venue : 'Unknown Venue';
  }

  cancelBooking(eventId: string, seatNumber: string, index: number): void {
    if (this.bookingService.cancelBooking(eventId, seatNumber)) {
      this.userBookings.splice(index, 1);
    }
  }
}
