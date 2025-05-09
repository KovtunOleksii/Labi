import React, { useState } from 'react';

function BookingModal({ show, onClose, onBook, sections, trainers, user }) {
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState('monthly');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user.id,
        },
        body: JSON.stringify({
          section: selectedSection,
          trainerId: selectedTrainer,
          paymentPeriod,
        }),
      });
      if (!response.ok) {
        throw new Error('Не вдалося створити бронювання');
      }
      const bookingData = await response.json();
      onBook(bookingData);
      setSelectedSection('');
      setSelectedTrainer('');
      setPaymentPeriod('monthly');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Помилка при створенні бронювання');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="m-0">Запис на заняття</h5>
          <button 
            type="button" 
            className="btn-close modal-close-btn" 
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="section" className="form-label">Секція</label>
            <select
              className="form-select"
              id="section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              required
            >
              <option value="">Виберіть секцію</option>
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="trainer" className="form-label">Тренер</label>
            <select
              className="form-select"
              id="trainer"
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              required
            >
              <option value="">Виберіть тренера</option>
              {trainers
                .filter(trainer => !selectedSection || trainer.sport === selectedSection)
                .map(trainer => (
                  <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Спосіб оплати</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentPeriod"
                id="monthly"
                value="monthly"
                checked={paymentPeriod === 'monthly'}
                onChange={(e) => setPaymentPeriod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="monthly">
                Помісячна оплата
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentPeriod"
                id="halfYear"
                value="halfYear"
                checked={paymentPeriod === 'halfYear'}
                onChange={(e) => setPaymentPeriod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="halfYear">
                Оплата за півроку
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentPeriod"
                id="yearly"
                value="yearly"
                checked={paymentPeriod === 'yearly'}
                onChange={(e) => setPaymentPeriod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="yearly">
                Оплата за рік
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Записатися</button>
        </form>
      </div>
    </>
  );
}

export default BookingModal;