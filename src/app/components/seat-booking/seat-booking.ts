import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Booking, Event, Seat } from '../../services/booking';

@Component({
  selector: 'app-seat-booking',
  imports: [CommonModule],
  templateUrl: './seat-booking.html',
  styleUrl: './seat-booking.css',
})
export class SeatBooking implements OnInit {
  events: Event[] = [];
  selectedEvent: Event | null = null;
  seats: Seat[] = [];
  selectedSeats: string[] = [];
  currentUser: any = null;
  bookingSuccess: string = '';

  constructor(
    private bookingService: Booking,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = user;
    this.events = this.bookingService.getEvents();
  }

  selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.seats = this.bookingService.getSeats(event.id);
    this.selectedSeats = [];
    this.bookingSuccess = '';
  }

  toggleSeat(seat: Seat): void {
    if (seat.isBooked) {
      return;
    }

    const index = this.selectedSeats.indexOf(seat.seatNumber);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat.seatNumber);
    }
  }

  isSeatSelected(seatNumber: string): boolean {
    return this.selectedSeats.includes(seatNumber);
  }

  bookSeats(): void {
    if (!this.selectedEvent || this.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const failedBookings: string[] = [];
    
    for (let seatNumber of this.selectedSeats) {
      const success = this.bookingService.bookSeat(
        this.selectedEvent.id,
        seatNumber,
        this.currentUser.id
      );
      if (!success) {
        failedBookings.push(seatNumber);
      }
    }

    if (failedBookings.length === 0) {
      this.bookingSuccess = `Successfully booked ${this.selectedSeats.length} seat(s)!`;
      this.selectedSeats = [];
      this.seats = this.bookingService.getSeats(this.selectedEvent.id);
      
      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 2000);
    } else {
      alert(`Failed to book seats: ${failedBookings.join(', ')}`);
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  isSeatBooked(seat: Seat): boolean {
    return seat.isBooked;
  }

  getAvailableSeatsCount(): number {
    return this.seats.filter(s => !s.isBooked).length;
  }

  getTotalSeatsCount(): number {
    return this.seats.length;
  }
}
