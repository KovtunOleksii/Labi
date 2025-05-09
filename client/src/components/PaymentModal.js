import React, { useState } from 'react';

function PaymentModal({ show, onClose, onPay, booking }) {
  const [applicantName, setApplicantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);
  const [error, setError] = useState('');

  const paymentAmounts = {
    monthly: 500,
    halfYear: 3000,
    yearly: 6000,
  };

  const amount = paymentAmounts[booking?.paymentPeriod] || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicantName || !phoneNumber || !receiptFile) {
      setError('Заповніть усі поля та завантажте квитанцію');
      return;
    }
    if (!receiptFile.name.endsWith('.pdf')) {
      setError('Квитанція має бути у форматі PDF');
      return;
    }

    try {
      const receiptFileName = `receipt_${booking.id}_${Date.now()}.pdf`;
      await onPay(booking.id, applicantName, phoneNumber, receiptFileName);
      setApplicantName('');
      setPhoneNumber('');
      setReceiptFile(null);
      setError('');
      onClose();
    } catch (err) {
      setError('Помилка при оплаті');
    }
  };

  if (!show || !booking) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="m-0">Оплата бронювання</h5>
          <button 
            type="button" 
            className="btn-close modal-close-btn" 
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="applicantName" className="form-label">ПІБ</label>
            <input
              type="text"
              className="form-control"
              id="applicantName"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Номер телефону</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Сума оплати</label>
            <input
              type="text"
              className="form-control"
              value={`${amount} грн`}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Реквізити для оплати</label>
            <textarea
              className="form-control"
              value="UA233052990000026203904106220 (ПриватБанк) Якщо що реквізити можете перевірити;)"
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="receiptFile" className="form-label">Завантажити квитанцію (PDF)</label>
            <input
              type="file"
              className="form-control"
              id="receiptFile"
              accept="application/pdf"
              onChange={(e) => setReceiptFile(e.target.files[0])}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">Надіслати</button>
        </form>
      </div>
    </>
  );
}

export default PaymentModal;