import React from 'react';

function HomePage() {
  return (
    <div>
      <h1>Спортивний комплекс імені Володимира Окіпного</h1>
      <p>Ласкаво просимо до нашого комплексу! Ми пропонуємо різноманітні спортивні секції для дітей та дорослих.</p>
      <p><strong>Контакти:</strong> бульвар Шевченка, 4, м.Ромни, Сумська область | Тел: +380 54 485 1601</p>
      <img src="Stadium.jpg" alt="Стадіон" className="home-img" />
      <img src="Stadium2.jpg" alt="Тренування" className="home-img" />
    </div>
  );
}

export default HomePage;