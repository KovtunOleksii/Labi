import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Booking {
  id: string;
  section: string;
  coach: string;
  date: string;
  period: string;
  fullName: string;
  paymentStatus: 'Не оплачено' | 'Оплачено';
  paymentDate?: string;
  receiptUrl?: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, data: Partial<Booking>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Booking) => setBookings(prev => [...prev, booking]);
  const updateBooking = (id: string, data: Partial<Booking>) =>
    setBookings(prev => prev.map(b => (b.id === id ? { ...b, ...data } : b)));

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings must be used within BookingProvider');
  return context;
}; 