import React, { useEffect, useState } from 'react';

function TrainersPage() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/trainers')
      .then(res => res.json())
      .then(data => setTrainers(data.slice(0, 4))); // Обмеження до 4 тренерів
  }, []);

  return (
    <div>
      <h2>Наші тренери</h2>
      <div className="row">
        {trainers.map(trainer => (
          <div key={trainer.id} className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{trainer.name}</h5>
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="trainer-img mb-3"
                />
                <p className="card-text">
                  <strong>Секція:</strong> {trainer.sport}<br />
                  <strong>Досвід:</strong> {trainer.experience}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainersPage;