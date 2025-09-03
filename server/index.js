const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Мок-дані
const trainers = [
  { id: 1, name: 'Петренко Івано Олексійович', sport: 'Футбол', experience: '5 років', photo: '/trainers/Sigma.jpg' },
  { id: 2, name: 'Сахаров Володимир Анатолійович ', sport: 'Футбол', experience: '8 років', photo: '/trainers/mike.jpg' },
  { id: 3, name: 'Сидорова Олена Юріївна', sport: 'Йога', experience: '7 років', photo: '/trainers/Wiman.jpg' },
  { id: 4, name: 'Іванов Сергій Петрович', sport: 'Бокс', experience: '10 років', photo: '/trainers/Boks.jpg' }
];

const schedule = [
  { id: 1, trainerId: 1, day: 'Понеділок', time: '9:30-11:30', maxParticipants: 10 },
  { id: 2, trainerId: 1, day: 'Середа', time: '12:00-13:30', maxParticipants: 10 },
  { id: 3, trainerId: 1, day: "П'ятниця", time: '14:00-15:30', maxParticipants: 10 },
  { id: 4, trainerId: 1, day: 'Неділя', time: '16:00-17:30', maxParticipants: 15 },
  { id: 5, trainerId: 3, day: 'Вівторок', time: '17:00-18:30', maxParticipants: 8 },
  { id: 6, trainerId: 4, day: 'Середа', time: '17:00-18:30', maxParticipants: 8 },
  { id: 7, trainerId: 2, day: 'Вівторок', time: '9:30-11:30', maxParticipants: 10 },
  { id: 8, trainerId: 2, day: 'Четвер', time: '12:00-13:30', maxParticipants: 10 },
  { id: 9, trainerId: 2, day: "Субота", time: '14:00-15:30', maxParticipants: 10 }
];

const bookings = [];
const users = [
  { id: 1, username: 'user1', password: 'pass1' },
  { id: 2, username: 'user2', password: 'pass2' }
];

// Middleware для перевірки авторизації
const authMiddleware = (req, res, next) => {
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.userId = parseInt(userId);
  next();
};

// Роути
app.get('/api/trainers', (req, res) => {
  res.json(trainers);
});

app.get('/api/schedule', (req, res) => {
  res.json(schedule);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({ id: user.id, username: user.username });
});

app.post('/api/book', authMiddleware, (req, res) => {
  const { section, trainerId, paymentPeriod } = req.body;
  const trainer = trainers.find(t => t.id === parseInt(trainerId));
  
  if (!trainer || trainer.sport !== section) {
    return res.status(400).json({ error: 'Invalid section or trainer' });
  }
  
  const booking = {
    id: bookings.length + 1,
    userId: req.userId,
    section,
    trainerId: parseInt(trainerId),
    paymentPeriod,
    applicationDate: new Date().toISOString(),
    paid: false,
    paymentDate: null,
    applicantName: null,
    phoneNumber: null,
    receiptPath: null
  };
  
  bookings.push(booking);
  res.json(booking);
});

app.get('/api/bookings', authMiddleware, (req, res) => {
  const userBookings = bookings.filter(b => b.userId === req.userId);
  res.json(userBookings);
});

app.post('/api/pay', authMiddleware, (req, res) => {
  const { bookingId, applicantName, phoneNumber, receiptFileName } = req.body;
  const booking = bookings.find(b => b.id === bookingId && b.userId === req.userId);
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  booking.paid = true;
  booking.paymentDate = new Date().toISOString();
  booking.applicantName = applicantName;
  booking.phoneNumber = phoneNumber;
  booking.receiptPath = receiptFileName || null;
  res.json({ success: true });
});

app.get('/api/receipt/:bookingId', authMiddleware, (req, res) => {
  const bookingId = parseInt(req.params.bookingId);
  const booking = bookings.find(b => b.id === bookingId && b.userId === req.userId);
  
  if (!booking || !booking.receiptPath) {
    return res.status(404).json({ error: 'Receipt not found' });
  }
  
  res.json({ receiptPath: booking.receiptPath });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🟢 Backend on http://localhost:${PORT}`));