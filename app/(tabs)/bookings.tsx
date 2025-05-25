import { useState } from 'react';
import { Text, View } from 'react-native';
import { BookingList } from '../../components/BookingList';
import { PaymentModal } from '../../components/PaymentModal';
import { globalStyles } from '../../constants/Styles';
import { Booking, useBookings } from '../../context/BookingContext';

export default function BookingsScreen() {
  const { bookings, updateBooking } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handlePay = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowPayment(true);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.title, { textAlign: 'center' }]}>Мої записи</Text>
      <BookingList bookings={bookings} onPay={handlePay} />
      <PaymentModal
        visible={showPayment}
        booking={selectedBooking}
        onClose={() => setShowPayment(false)}
      />
    </View>
  );
} 