import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.scss';
import Futbol from '../imgs/futbol.png';
import Robot from '../imgs/robot.png';
import Chiroq from '../imgs/chiroq.png';
import Yutuq from '../imgs/yutuq.png';
import Logo from '../imgs/logo.png';
import Day from './day.png'

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: 'Robo Football',
      description: 'Robotlar bilan futbol jangolari. Texnologiya va sportning mukammal uyg\'unligi',
      icon: Futbol, 
      image: Futbol // Rasmni qo'shing
    },
    {
      id: 2,
      title: 'Robo Sumo',
      description: 'Robotlarning kuch sinov kurashi. Dohiy g\'oyalar va qattiq raqobatlar b\'oladi',
      icon: Robot,
      image: Robot
    },
    {
      id: 3,
      title: 'Foydali Ixtirolar',
      description: 'Hayotni soddalashtiradigan aqlli ixtirolar. Yangi g\'oyalarni amalga oshiring',
      icon: Chiroq,
      image: Chiroq
    },
    {
      id: 5,
      title: 'Contest',
      description: 'Yangi texnologiyalar va innovatsiyalar bo\'yicha musobaqalar. O\'z bilimlaringizni sinab ko\'ring',
      icon: Yutuq,
      image: Yutuq,

    },
    {
      id: 4,
      title: 'AI Day',
      description: 'Qizigarli musobaqalar va tanlovlar. Bilim va ko\'nikmalaringizni sinab ko\'ring',
      icon: Day,
      image: Day
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRegister = (category) => {
    const button = document.querySelector(`[data-category="${category.title}"]`);
    if (button) {
      button.classList.add('clicked');
    }

    // Navigate qilish va category ma'lumotlarini o'tkazish
    setTimeout(() => {
      if (category.title === 'Contest') {
        window.location.href = 'https://raqamliavlod.uz';
      } else {
        navigate('/register?category=' + encodeURIComponent(category.title));
      }
    }, 500);
  };

  return (
    <div className="homepage">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      {/* Header */}
      <header className={`header ${isVisible ? 'slide-down' : ''}`}>
        <div className="container">
          <div className="logo">
            <img src={Logo} style={{ width: '150px' }} alt="Tech Platform Logo" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Hero */}
          {/* <section className={`hero ${isVisible ? 'fade-in' : ''}`}>
            <h1 className="typing-animation">Texnologiya Platformasi</h1>
            <p className="slide-up">
              Robototexnika, ixtirolar va innovatsion musobaqalar olamiga xush kelibsiz. 
              Bizning platformamiz orqali texnologiya qobiliyatlaringizni rivojlantiring va 
              jahon darajasidagi tajribalarga ega bo'ling.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="number">500+</span>
                <span className="label">Faol ishtirokchi</span>
              </div>
              <div className="stat">
                <span className="number">50+</span>
                <span className="label">Muvaffaqiyatli loyiha</span>
              </div>
              <div className="stat">
                <span className="number">100+</span>
                <span className="label">Innovatsion g'oya</span>
              </div>
            </div>
            <div className="pulse-dot"></div>
          </section> */}

          {/* Categories */}
          <section className="categories">
            <h2 className={`section-title ${isVisible ? 'bounce-in' : ''}`}>Yo'nalishlar</h2>
            <p className="section-subtitle">
              Quyidagi yo'nalishlardan birini tanlang va o'z ko'nikmalaringizni namoyon eting
            </p>

            <div className="cards">
              {categories.map((item, index) => (
                <div
                  key={item.id}
                  className={`card card-${index + 1} ${isVisible ? 'pop-in' : ''}`}
                  data-category={item.title}
                  onClick={() => handleRegister(item)}
                >
                  <div className="card-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button className="card-btn">
                    Hoziroq qo'shilish
                    <span className="btn-arrow">→</span>
                  </button>
                  <div className="card-glow"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Join Section */}
          {/* <section className="why-join">
            <div className="container">
              <h2 className="section-title">Nima uchun a'zo bo'lish kerak?</h2>
              <div className="benefits">
                <div className="benefit">
                  <div className="benefit-icon">🚀</div>
                  <h3>Zamonaviy Texnologiyalar</h3>
                  <p>Eng so'nggi robototexnika va AI texnologiyalari bilan ishlash imkoniyati</p>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">👥</div>
                  <h3>Professional Jamiyat</h3>
                  <p>Tajribali muhandislar va dasturchilar bilan aloqa va hamkorlik</p>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">🏆</div>
                  <h3>Musobaqalar va Mukofotlar</h3>
                  <p>Qimmatli sovg'alar, grantlar va karyera rivojlanishi imkoniyatlari</p>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">💡</div>
                  <h3>Loyihalarni Amalga Oshirish</h3>
                  <p>O'z g'oyalaringizni real loyihalarga aylantirish va moliyaviy qo'llab-quvvatlash</p>
                </div>
              </div>
            </div>
          </section> */}

          {/* CTA Section */}
          {/* <section className="cta-section">
            <div className="container">
              <h2>Hozir ro'yxatdan o'ting va imkoniyatlardan foydalaning!</h2>
              <p>
                Har bir ishtirokchi uchun maxsus treninglar, mentorlik dasturi va 
                loyihalarni amalga oshirish uchun barcha shart-sharoitlar yaratilgan.
              </p>
              <button 
                className="cta-main-btn"
                onClick={() => window.location.href = '/register'}
              >
                Bepul Ro'yxatdan O'tish
              </button>
            </div>
          </section> */}

          {/* Floating CTA */}
          <div className={`floating-cta ${isVisible ? 'float-up' : ''}`}>
            <div className="cta-text">Qatnashishni boshlang!</div>
            <div className="pulse-ring"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`footer ${isVisible ? 'fade-up' : ''}`}>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <img src={Logo} style={{ width: '120px', marginBottom: '15px' }} alt="Logo" />
              <p>
                Texnologiya va innovatsiyalar rivojlanishi uchun platforma.
                Yosh ixtirochilar va muhandislarni qo'llab-quvvatlash.
              </p>
            </div>
            <div className="footer-contact">
              <h4>Bog'lanish</h4>
              <div className='nmadur'>

                <a href="" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg> Instagram</a>
                <a href="" target='_blank'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                  </svg> Telegram
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Tech Platform. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;