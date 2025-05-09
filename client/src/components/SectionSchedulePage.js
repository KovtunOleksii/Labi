import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from './BookingModal';

function SectionSchedulePage({ user, setShowLoginModal }) {
  const { sport } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [sectionDescription, setSectionDescription] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const sections = ['Футбол', 'Йога', 'Бокс'];

  useEffect(() => {
    fetch('http://localhost:4000/api/schedule')
      .then(res => res.json())
      .then(data => setSchedule(data));

    fetch('http://localhost:4000/api/trainers')
      .then(res => res.json())
      .then(data => setTrainers(data));

    const descriptions = {
      'Футбол': 'Футбол — це командна гра, що є однією з найпопулярніших у світі.',
      'Йога': 'Йога — це фізична, розумова та духовна практика, яка має багато переваг для здоров\'я.',
      'Бокс': 'Бокс — це вид спорту який добре розвиває координацію та дозволяє тримати в тонусі всі групи м\'язів.'
    };

    setSectionDescription(descriptions[sport] || 'Опис не знайдено');
  }, [sport]);

  const handleBooking = (bookingData) => {
    console.log('Booking data:', bookingData);
    setShowBookingModal(false);
  };

  const handleBookingClick = () => {
    setShowBookingModal(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const sectionTrainers = trainers.filter(t => t.sport === sport);
  const sectionTrainerIds = sectionTrainers.map(t => t.id);
  const sectionSchedule = schedule.filter(s => sectionTrainerIds.includes(s.trainerId));

  const scheduleByTrainer = sectionTrainers.map(trainer => ({
    trainer,
    sessions: sectionSchedule.filter(session => session.trainerId === trainer.id),
  }));

  return (
    <div>
      <h2> {sport}</h2>
      <p><strong></strong> {sectionDescription}</p>

      <h4>Розклад занять</h4>
      <div className="row">
        <div className="col-12 mb-4">
          {user ? (
            <button 
              className="btn btn-primary" 
              onClick={handleBookingClick}
            >
              Записатися на секцію
            </button>
          ) : (
            <div className="d-flex align-items-center">
              <span className="me-3">Авторизуйтеся, щоб записатися на секцію</span>
              <button 
                className="btn btn-outline-primary" 
                onClick={handleLoginClick}
              >
                Вхід
              </button>
            </div>
          )}
        </div>
        {scheduleByTrainer.map(({ trainer, sessions }) => (
          <div key={trainer.id} className="col-12 mb-4">
            <h5>{trainer.name}</h5>
            <div className="row">
              {sessions.length > 0 ? (
                sessions.map(session => (
                  <div key={session.id} className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          <strong>День:</strong> {session.day}<br />
                          <strong>Час:</strong> {session.time}<br />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Розклад відсутній</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onBook={handleBooking}
        sections={sections}
        trainers={trainers}
        user={user}
      />
    </div>
  );
}

export default SectionSchedulePage;