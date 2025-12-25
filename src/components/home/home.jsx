// import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.scss';
// import Agent from '../imgs/agent.png'
// Import qilinadigan rasmlar
// import Futbol from '../imgs/futbol.png';
// import Robot from '../imgs/robot.png';
// import Chiroq from '../imgs/chiroq.png';
// import Yutuq from '../imgs/yutuq.png';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/grid';
import Logo from '../imgs/logo.png';
import Agent from '../imgs/agent.png'
import Kelak from '../imgs/kelajal.png'
import Fondi from '../imgs/fondi.png'
import Uzbek from '../imgs/uzbekistan.png'
import Kasb from '../imgs/kasb.png'
import Digi from '../imgs/digi.png'
import Aa from '../imgs/aa.svg'
// import Day from '../imgs/day.png';

// Agar yo'nalishlar uchun ikonkalar yo'q bo'lsa, standart ikonkalar yaratamiz
import {
  FaGlobe, FaPython, FaChartBar, FaMicrosoft,
  FaRobot, FaCode, FaPalette, FaMagic, FaComment
} from 'react-icons/fa';

const HomePage = () => {


  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [snowflakes, setSnowflakes] = useState([]);
  const [footerSnow, setFooterSnow] = useState([]);
  const navigate = useNavigate();

  const swiperRef = useRef(null);

  const hamkorlar = [
    {
      id: 1,
      logo: Kasb,
    },
    {
      id: 2,
      logo: Agent,
    },
    {
      id: 3,
      logo: Uzbek,
    },
    {
      id: 4,
      logo: Kelak,
    },
    {
      id: 5,
      logo: Fondi,
    },
    {
      id: 6,
      logo: Digi,
    },
    {
      id: 7,
      logo: Aa,
    },
    // {
    //   id: 8,
    //   logo: "http://online.raqamliavlod.uz:3455/assets/7-DjeyfpLS.png",
    // }
  ];


  // Yo'nalishlar massivi - faqat mavjud iconlarni ishlatamiz
  const categories = [
    {
      id: 1,
      title: 'Prompt',
      description: 'Onlayn formatdagi ta\'lim va musobaqalar. Istalgan joydan qatnashing',
      icon: <FaComment size={40} />,
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'Python',
      description: 'Python dasturlash tili orqali amaliy loyihalar va muammolar yechimi',
      icon: <FaPython size={40} />,
      color: '#306998'
    },
    {
      id: 3,
      title: 'Data Analitik',
      description: 'Ma\'lumotlarni tahlil qilish, vizualizatsiya va to\'g\'ri xulosa chiqarish',
      icon: <FaChartBar size={40} />,
      color: '#FF6B6B'
    },
    {
      id: 4,
      title: '.NET',
      description: '.NET platformasida kuchli va ishonchli ilovalar yaratish',
      icon: <FaMicrosoft size={40} />,
      color: '#512BD4'
    },
    {
      id: 5,
      title: 'AI',
      description: 'Sun\'iy intellekt, machine learning va zamonaviy texnologiyalar',
      icon: <FaRobot size={40} />,
      color: '#9C27B0'
    },
    {
      id: 6,
      title: 'Vibe Coding',
      description: 'Qiziqarli va erkin uslubda kod yozish, kreativ yondashuv',
      icon: <FaCode size={40} />,
      color: '#FF9800'
    },
    // {
    //   id: 7,
    //   title: 'Web Design',
    //   description: 'Zamonaviy va chiroyli web dizaynlar yaratish',
    //   icon: <FaPalette size={40} />,
    //   color: '#2196F3'
    // },
    {
      id: 8,
      title: 'No Coding',
      description: 'Kod yozmasdan turib platformalar va servislar yaratish',
      icon: <FaMagic size={40} />,
      color: '#00BCD4'
    }
  ];

  useEffect(() => {
    // Loadingni 2 sekunddan so'ng o'chirish
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 20);

    // Qor donalarini yaratish
    const generateSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 80; i++) {
        flakes.push({
          id: i,
          size: ['size-small', 'size-medium', 'size-large', 'size-xlarge'][Math.floor(Math.random() * 4)],
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 10}s`,
          duration: `${Math.random() * 15 + 10}s`,
          startX: `${Math.random() * 100 - 50}px`,
          endX: `${Math.random() * 200 - 100}px`,
          rotation: `${Math.random() * 360}deg`
        });
      }
      setSnowflakes(flakes);
    };

    // Footer uchun qor donalarini yaratish
    const generateFooterSnow = () => {
      const footerSnowflakes = [];
      for (let i = 0; i < 25; i++) {
        footerSnowflakes.push({
          id: i,
          size: `${Math.random() * 15 + 5}px`,
          top: `${Math.random() * 30 + 10}px`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.5,
          delay: `${Math.random() * 10 * 0.1}s`
        });
      }
      setFooterSnow(footerSnowflakes);
    };

    generateSnowflakes();
    generateFooterSnow();

    // Animatsiyalar uchun intervallar
    const windInterval = setInterval(() => {
      const winds = document.querySelectorAll('.wind-effect');
      winds.forEach(wind => {
        wind.style.animation = 'none';
        setTimeout(() => {
          wind.style.animation = 'windEffect 2s ease-in-out infinite';
        }, 10);
      });
    }, Math.random() * 40 + 40);

    const treeInterval = setInterval(() => {
      const trees = document.querySelectorAll('.winter-tree');
      trees.forEach(tree => {
        tree.style.animation = 'none';
        setTimeout(() => {
          tree.style.animation = 'treeSway 4s ease-in-out infinite';
        }, 10);
      });
    }, 80);

    return () => {
      clearTimeout(timer);
      clearInterval(windInterval);
      clearInterval(treeInterval);
    };
  }, []);

  const handleRegister = (category) => {
    const button = document.querySelector(`[data-category="${category.title}"]`);
    if (button) {
      button.classList.add('click-effect');
      setTimeout(() => {
        button.classList.remove('click-effect');
      }, 500);
    }

    // Navigate qilish
    setTimeout(() => {
      navigate(`/register?category=${category.id}`, {
        state: {
          category: category.title,
          categoryId: category.id
        }
      });
    }, 30);
  };

  // Qor donalarini re-render qilish
  const refreshSnowflakes = () => {
    const flakes = [];
    for (let i = 0; i < 80; i++) {
      flakes.push({
        id: i + 100,
        size: ['size-small', 'size-medium', 'size-large', 'size-xlarge'][Math.floor(Math.random() * 4)],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${Math.random() * 15 + 10}s`,
        startX: `${Math.random() * 100 - 50}px`,
        endX: `${Math.random() * 200 - 100}px`,
        rotation: `${Math.random() * 360}deg`
      });
    }
    setSnowflakes(flakes);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const tracker = document.getElementById('mouse-tracker');
      if (tracker) {
        tracker.style.left = `${e.clientX}px`;
        tracker.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="homepage">
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="snow-loader"></div>
            <p>Qish mavsumi yuklanmoqda...</p>
          </div>
        </div>
      )}

      {/* Qor yog'ishi effekti */}
      <div className="winter-snowfall">
        {snowflakes.map(flake => (
          <div
            key={flake.id}
            className={`snowflake ${flake.size}`}
            style={{
              left: flake.left,
              '--delay': flake.delay,
              '--duration': flake.duration,
              '--start-x': flake.startX,
              '--end-x': flake.endX,
              '--rotation': flake.rotation
            }}
          />
        ))}
      </div>

      {/* Shamol effekti */}
      <div className="wind-container">
        <div className="wind-effect wind-1"></div>
        <div className="wind-effect wind-2"></div>
        <div className="wind-effect wind-3"></div>
        <div className="wind-effect wind-4"></div>
      </div>

      {/* Daraxtlar - osonroq variant */}
      {/* <div className="tree-container">
        <div className="winter-tree"><img src="https://static.vecteezy.com/system/resources/previews/050/769/234/non_2x/festive-christmas-tree-on-transparent-background-free-png.png" alt="" /></div>
      </div> */}

      {/* Header */}
      <header className={`header ${isVisible ? 'slide-down' : ''}`}>
        <div className="container">
          <div className="logo">
            <img src={Logo} style={{ width: '150px' }} alt="Tech Platform Logo" />
          </div>
          <div className="winter-icons">
            <span className="winter-icon">❄️</span>
            <span className="winter-icon">⛄</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Categories */}
          <section className="categories">
            <h2 className={`section-title ${isVisible ? 'bounce-in' : ''}`}>
              <span className="title-text">Yo'nalishlar</span>
              <span className="snowflake-emoji">❄️</span>
              <span className="snowflake-emoji">⛄</span>
              <span className="snowflake-emoji">❄️</span>
            </h2>
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
                  style={{ '--card-color': item.color }}
                >
                  <div className="card-icon" style={{ color: item.color }}>
                    {item.icon}
                    <div className="card-snow"></div>
                    <div className="card-snow"></div>
                    <div className="card-snow"></div>
                  </div>
                  <h3>{item.title}</h3>
                  {/* <p>{item.description}</p>  bu kerak emas ekan shu uchun ovordim */}
                  <button className="card-btn">
                    Hoziroq qo'shilish
                    <span className="btn-arrow">→</span>
                  </button>
                  <div className="card-sparkles">
                    <div className="sparkle"></div>
                    <div className="sparkle"></div>
                    <div className="sparkle"></div>
                    <div className="sparkle"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Floating CTA */}
          <div className={`floating-cta ${isVisible ? 'float-up' : ''}`} onClick={refreshSnowflakes}>
            <div className="cta-text">Qatnashishni boshlang!</div>
            <div className="pulse-ring"></div>
          </div>
        </div>
      </main>

      <div className="hamkorlar-container">
        <div className="section-title">
          <h2>Hamkorlarimiz</h2>
          <p>Bizning ishonchli hamkorlarimiz bilan tanishing</p>
        </div>

        <div className="swiper-wrapper">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-120%', 0, -500],
              },
              next: {
                shadow: true,
                translate: ['120%', 0, -500],
              },
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 30,
              }
            }}
            className="hamkorlar-swiper"
          >
            {hamkorlar.map((hamkor) => (
              <SwiperSlide key={hamkor.id}>
                <div className="partner-logo-wrapper">
                  <img
                    src={hamkor.logo}
                    alt="Hamkor logosi"
                    className="partner-logo"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Footer with Snow Accumulation */}
      <footer className={`footer ${isVisible ? 'fade-up' : ''}`}>
        {/* Qor to'planishi */}
        <div className="snow-accumulation">
          {footerSnow.map(snow => (
            <div
              key={snow.id}
              className="accumulated-snow"
              style={{
                width: snow.size,
                height: snow.size,
                top: snow.top,
                left: snow.left,
                opacity: snow.opacity,
                animationDelay: snow.delay
              }}
            />
          ))}
        </div>

        {/* Footer shamol effekti */}
        <div className="footer-wind">
          <div className="wind-line"></div>
          <div className="wind-line"></div>
          <div className="wind-line"></div>
          <div className="wind-line"></div>
          <div className="wind-line"></div>
        </div>

        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <img src={Logo} style={{ width: '150px', marginBottom: '15px' }} alt="Logo" />
              <p>
                Texnologiya va innovatsiyalar rivojlanishi uchun platforma.
                Yosh ixtirochilar va muhandislarni qo'llab-quvvatlash.
              </p>
            </div>
            <div className="footer-contact">
              <h4>Bog'lanish</h4>
              <div className='nmadur'>
                <a href="http://instagram.com/dguzbekistan" target='_blank' rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg> Instagram
                </a>
                <a href="https://t.me/digitalgeneration_uz" target='_blank' rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                  </svg> Telegram
                </a>

                <a href="http://youtube.com/DigitalGenerationUzbekistan" target='_blank'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                  </svg> Youtube
                </a>
                <a href="http://facebook.com/digitalgeneration.uz" target='_blank'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg> Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Tech Platform. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>


      {/* Mouse tracker effekti */}
      <div className="mouse-tracker" id="mouse-tracker"></div>

    </div>
  );
};

export default HomePage;