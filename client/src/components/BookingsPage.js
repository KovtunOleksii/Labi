import React, { useEffect, useState } from 'react';
import PaymentModal from './PaymentModal';

function BookingsPage({ user }) {
  const [bookings, setBookings] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/trainers')
      .then(res => res.json())
      .then(data => setTrainers(data));

    fetch('http://localhost:4000/api/bookings', {
      headers: { 'user-id': user?.id },
    })
      .then(res => res.json())
      .then(data => setBookings(data));
  }, [user]);

  const handlePayClick = (booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };

  const handlePay = async (bookingId, applicantName, phoneNumber, receiptFileName) => {
    try {
      const response = await fetch('http://localhost:4000/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user.id,
        },
        body: JSON.stringify({ bookingId, applicantName, phoneNumber, receiptFileName }),
      });
      if (!response.ok) throw new Error('Не вдалося оплатити');
      const updatedBookings = await fetch('http://localhost:4000/api/bookings', {
        headers: { 'user-id': user.id },
      }).then(res => res.json());
      setBookings(updatedBookings);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDownloadReceipt = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/receipt/${bookingId}`, {
        headers: { 'user-id': user.id },
      });
      if (!response.ok) throw new Error('Не вдалося завантажити квитанцію');
      const data = await response.json();
      window.open(`http://localhost:4000/${data.receiptPath}`, '_blank');
    } catch (err) {
      console.error(err);
      alert('Помилка при завантаженні квитанції');
    }
  };

  return (
    <div>
      <h2>Мої записи</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Секція</th>
            <th>Тренер</th>
            <th>Дата заявки</th>
            <th>Період оплати</th>
            <th>ПІБ заявника</th>
            <th>Статус оплати</th>
            <th>Дата оплати</th>
            <th>Квитанція</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => {
            const trainer = trainers.find(t => t.id === booking.trainerId);
            return (
              <tr key={booking.id}>
                <td>{booking.section}</td>
                <td>{trainer?.name || 'Тренер'}</td>
                <td>{new Date(booking.applicationDate).toLocaleString()}</td>
                <td>
                  {booking.paymentPeriod === 'monthly' ? 'Помісячна' :
                   booking.paymentPeriod === 'halfYear' ? 'Півроку' : 'Річна'}
                </td>
                <td>{booking.applicantName || '-'}</td>
                <td>{booking.paid ? 'Оплачено' : 'Не оплачено'}</td>
                <td>{booking.paymentDate ? new Date(booking.paymentDate).toLocaleString() : '-'}</td>
                <td>
                  {booking.paid && booking.receiptPath ? (
                    <button
                      className="btn btn-sm btn-link"
                      onClick={() => handleDownloadReceipt(booking.id)}
                    >
                      Завантажити
                    </button>
                  ) : '-'}
                </td>
                <td>
                  {!booking.paid && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlePayClick(booking)}
                    >
                      Оплатити
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPaymentModal && selectedBooking && (
        <PaymentModal
          show={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPay={handlePay}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}

export default BookingsPage;