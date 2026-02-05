import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
}

export interface Seat {
  seatNumber: string;
  row: string;
  isBooked: boolean;
  bookedBy?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Booking {
  private events: Event[] = [];
  private seats: Map<string, Seat[]> = new Map();
  private bookings: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  public bookings$ = this.bookings.asObservable();

  constructor() {
    this.initializeEvents();
    this.initializeSeats();
  }

  private initializeEvents(): void {
    this.events = [
      {
        id: '1',
        name: 'Concert 2026',
        date: '2026-03-15',
        venue: 'Grand Hall'
      },
      {
        id: '2',
        name: 'Movie Premiere',
        date: '2026-04-20',
        venue: 'Cinema Center'
      },
      {
        id: '3',
        name: 'Sports Event',
        date: '2026-05-10',
        venue: 'Sports Arena'
      }
    ];
  }

  private initializeSeats(): void {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 10;

    for (let event of this.events) {
      const eventSeats: Seat[] = [];
      for (let row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
          eventSeats.push({
            seatNumber: `${row}${i}`,
            row: row,
            isBooked: false
          });
        }
      }
      this.seats.set(event.id, eventSeats);
    }
  }

  getEvents(): Event[] {
    return this.events;
  }

  getSeats(eventId: string): Seat[] {
    return this.seats.get(eventId) || [];
  }

  bookSeat(eventId: string, seatNumber: string, userId: string): boolean {
    const seats = this.seats.get(eventId);
    if (!seats) return false;

    const seat = seats.find(s => s.seatNumber === seatNumber);
    if (seat && !seat.isBooked) {
      seat.isBooked = true;
      seat.bookedBy = userId;
      
      const currentBookings = this.bookings.value;
      currentBookings.push({
        eventId,
        seatNumber,
        userId,
        bookingDate: new Date()
      });
      this.bookings.next(currentBookings);
      
      return true;
    }
    return false;
  }

  cancelBooking(eventId: string, seatNumber: string): boolean {
    const seats = this.seats.get(eventId);
    if (!seats) return false;

    const seat = seats.find(s => s.seatNumber === seatNumber);
    if (seat && seat.isBooked) {
      seat.isBooked = false;
      seat.bookedBy = undefined;
      
      const currentBookings = this.bookings.value;
      const index = currentBookings.findIndex(
        b => b.eventId === eventId && b.seatNumber === seatNumber
      );
      if (index > -1) {
        currentBookings.splice(index, 1);
        this.bookings.next(currentBookings);
      }
      return true;
    }
    return false;
  }

  getUserBookings(userId: string): any[] {
    return this.bookings.value.filter(b => b.userId === userId);
  }

  getEventDetails(eventId: string): Event | undefined {
    return this.events.find(e => e.id === eventId);
  }
}
