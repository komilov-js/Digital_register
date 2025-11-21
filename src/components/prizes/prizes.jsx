import React from 'react';
import './prizes.scss';
import Laptop from './laptop.png';
import Television from './television.png';
import Robot_plisos from './robot_plisos.jpg'
import Samakat from './samakat.jpg'
import Phone from './phone.jpg'
import Klaviatura from './klaviaturaaa.jpg'
import Sumka from './sumka.jpg'
import Kalonka from './kalonkaaa.jpg'
import Termiz from './temiza.jpg'

const prizesData = {
  rfutbol: [
    { id: 1, name: '1-oʻrin', prize: 'Noutbuk + Sertifikat', image: Laptop },
    { id: 2, name: '2-oʻrin', prize: 'Televizor + Sertifikat', image: Television },
    { id: 3, name: '3-oʻrin', prize: 'Robot Pilisos + Sertifikat', image: Robot_plisos }
  ],
  rsumo: [
    { id: 1, name: '1-oʻrin', prize: 'Noutbuk +  Sertifikat', image: Laptop },
    { id: 2, name: '2-oʻrin', prize: 'Televizor +  Sertifikat', image: Television },
    { id: 3, name: '3-oʻrin', prize: 'Robot Pilisos +  Sertifikat', image: Robot_plisos }
  ],
  fixtirolar: [
    { id: 1, name: '1-oʻrin', prize: 'Samakat +  Sertifikat', image: Samakat },
    { id: 2, name: '2-oʻrin', prize: 'Televizor +  Sertifikat', image: Television },
    { id: 3, name: '3-oʻrin', prize: 'Robot Pilisos +  Sertifikat', image: Robot_plisos }
  ],
  // contest: [
  //   { id: 1, name: '1-oʻrin', prize: 'Noutbuk +  Sertifikat', image: "sa" },
  //   { id: 2, name: '2-oʻrin', prize: 'Tablet +  Sertifikat', image: '/assets/prizes/tablet.png' },
  //   { id: 3, name: '3-oʻrin', prize: 'Smartfon +  Sertifikat', image: '/assets/prizes/phone.png' }
  // ],
  ai: [
    { id: 1, name: '1-oʻrin', prize: 'Iphone 17 pro max +  Sertifikat', image: Phone },
    { id: 2, name: '2-oʻrin', prize: 'Klaviatura +  Sertifikat', image: Klaviatura },
    { id: 3, name: '3-oʻrin', prize: 'Sumka +  Sertifikat', image: Sumka },
    { id: 4, name: '5-oʻrin', prize: 'Kalonka +  Sertifikat', image: Kalonka },
    { id: 5, name: '6-oʻrin', prize: 'Termiz +  Sertifikat', image: Termiz },
    // { id: 6, name: '7-oʻrin', prize: 'Sumka +  Sertifikat', image: Sumka },
  ]


};

const Prizes = ({ direction }) => {
  const currentPrizes = prizesData[direction] || [];

  if (currentPrizes.length === 0) return null;

  return (
    <div className="prizes-section">
      <h3 className="prizes-title">{prizesData.name}Ishtirokchilar yutib olishi mumkin sovg'alar</h3>
      <div className="prizes-grid">
        {currentPrizes.map(prize => (
          <div key={prize.id} className="prize-card">
            <div className="prize-image">
              <img src={prize.image} alt={prize.name} />
            </div>
            <div className="prize-info">
              {/* <h4>{prize.name}</h4> */}
              <p>{prize.prize}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prizes;