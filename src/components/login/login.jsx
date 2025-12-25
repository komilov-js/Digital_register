import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './login.scss';
import Logo from '../imgs/logo.png';
import regionsData from '../../data/regions';
import districtsData from '../../data/districts';
import { Link } from 'react-router-dom';
import {
  FaGlobe, FaPython, FaChartBar, FaMicrosoft,
  FaRobot, FaCode, FaPalette, FaMagic, FaComment
} from 'react-icons/fa';

const categories = [
  {
    id: 1,
    title: 'Prompt',
    value: 'prompt',
    description: 'Onlayn formatdagi ta\'lim va musobaqalar. Istalgan joydan qatnashing',
      icon: <FaComment size={40} />,
    color: '#4CAF50'
  },
  {
    id: 2,
    title: 'Python',
    value: 'python',
    description: 'Python dasturlash tili orqali amaliy loyihalar va muammolar yechimi',
    icon: <FaPython size={40} />,
    color: '#306998'
  },
  {
    id: 3,
    title: 'Data Analytics',
    value: 'data_analitik',
    description: 'Ma\'lumotlarni tahlil qilish, vizualizatsiya va to\'g\'ri xulosa chiqarish',
    icon: <FaChartBar size={40} />,
    color: '#FF6B6B'
  },
  {
    id: 4,
    title: '.NET',
    value: 'dotnet',
    description: '.NET platformasida kuchli va ishonchli ilovalar yaratish',
    icon: <FaMicrosoft size={40} />,
    color: '#512BD4'
  },
  {
    id: 5,
    title: 'AI',
    value: 'ai',
    description: 'Sun\'iy intellekt, machine learning va zamonaviy texnologiyalar',
    icon: <FaRobot size={40} />,
    color: '#9C27B0'
  },
  {
    id: 6,
    title: 'Vibe Coding',
    value: 'vibe_coding',
    description: 'Qiziqarli va erkin uslubda kod yozish, kreativ yondashuv',
    icon: <FaCode size={40} />,
    color: '#FF9800'
  },
  {
    id: 7,
    title: 'Web Design',
    value: 'web_design',
    description: 'Zamonaviy va chiroyli web dizaynlar yaratish',
    icon: <FaPalette size={40} />,
    color: '#2196F3'
  },
  {
    id: 8,
    title: 'No Coding',
    value: 'no_coding',
    description: 'Kod yozmasdan turib platformalar va servislar yaratish',
    icon: <FaMagic size={40} />,
    color: '#00BCD4'
  }
];

const Login = () => {
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get('category');

  // API tomonidan qabul qilinadigan yo'nalishlar ro'yxati
  // HomePage bilan moslashtirilgan versiya

  // Jinslar ro'yxati
  const genders = [
    { value: 'erkak', label: 'Erkak' },
    { value: 'ayol', label: 'Ayol' }
  ];

  // HomePage'dan kelgan kategoriyalarni API formatiga o'girish
  const categoryMapping = {
    'Python': 'python',
    'Vibe Coding': 'vibe_coding',
    'AI': 'ai',
    'Data Analitik': 'data_analytics',
    '.NET': 'dotnet',
    'No Coding': 'no_coding',
    'Prompt': 'prompt' // Online -> Contest
  };

  // Robo Futbol uchun maxsus state
  const [isRoboFootball, setIsRoboFootball] = useState(false);

  // Asosiy form ma'lumotlari
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    phone_number: '',
    birth_date: '',
    region: '',
    district: '',
    telegram_username: '',
    email: '',
    study_place: '',
    direction: '',
    about: '',
    gender: ''
  });

  // Do'st (ikkinchi ishtirokchi) ma'lumotlari - faqat Robo Futbol uchun
  const [friendData, setFriendData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    phone_number: '',
    birth_date: '',
    region: '',
    district: '',
    telegram_username: '',
    email: '',
    study_place: '',
    about: '',
    gender: ''
  });

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [friendRegion, setFriendRegion] = useState('');
  const [friendDistrict, setFriendDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [friendFilteredDistricts, setFriendFilteredDistricts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    instagram: false,
    telegram: false
  });

  // Komponent yuklanganda modalni ko'rsatish
  useEffect(() => {
    const hasSubscribed = localStorage.getItem('hasSubscribed');
    if (!hasSubscribed) {
      setShowSubscriptionModal(true);
    }
  }, []);

  // Tanlangan kategoriyaga qarab direction ni avtomatik to'ldirish
  useEffect(() => {
    if (categoryFromURL) {
      // Kategoriya nomini API tomonidan qabul qilinadigan formatga moslashtirish
      const directionValue = categoryMapping[categoryFromURL] || categoryFromURL.toLowerCase().replace(/\s+/g, '_');

      // Robo Futbol ekanligini tekshirish
      const isRoboFootballCategory = directionValue === 'rfutbol';
      setIsRoboFootball(isRoboFootballCategory);

      setFormData(prev => ({
        ...prev,
        direction: directionValue
      }));
      setSelectedCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  // Telefon raqamini formatlash
  const formatPhoneNumber = (phone) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers ? `+998${numbers.slice(0, 9)}` : '';
  };

  // Sanani to'g'ri formatga keltirish (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Asosiy form input o'zgarishlari
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone_number') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }));
    } else if (name === 'birth_date') {
      setFormData(prev => ({
        ...prev,
        [name]: formatDate(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Do'st form input o'zgarishlari
  const handleFriendInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone_number') {
      setFriendData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }));
    } else if (name === 'birth_date') {
      setFriendData(prev => ({
        ...prev,
        [name]: formatDate(value)
      }));
    } else {
      setFriendData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Asosiy viloyat o'zgarganda
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedDistrict('');
    setFormData(prev => ({
      ...prev,
      region: region,
      district: ''
    }));
    setFilteredDistricts(districtsData.filter(district => parseInt(district.region_id) === parseInt(region)));
  };

  // Asosiy tuman o'zgarganda
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setFormData(prev => ({
      ...prev,
      district: district
    }));
  };

  // Do'st viloyat o'zgarganda
  const handleFriendRegionChange = (e) => {
    const region = e.target.value;
    setFriendRegion(region);
    setFriendDistrict('');
    setFriendData(prev => ({
      ...prev,
      region: region,
      district: ''
    }));
    setFriendFilteredDistricts(districtsData.filter(district => parseInt(district.region_id) === parseInt(region)));
  };

  // Do'st tuman o'zgarganda
  const handleFriendDistrictChange = (e) => {
    const district = e.target.value;
    setFriendDistrict(district);
    setFriendData(prev => ({
      ...prev,
      district: district
    }));
  };

  // Obuna tugmasini bosganda
  const handleSubscription = () => {
    if (subscriptionStatus.instagram && subscriptionStatus.telegram) {
      localStorage.setItem('hasSubscribed', 'true');
      setShowSubscriptionModal(false);
    } else {
      setMessage('Iltimos, ikkala platformaga ham obuna bo\'ling!');
    }
  };

  // Platformaga obuna bo'lish tugmasi
  const handlePlatformSubscribe = (platform) => {
    if (platform === 'instagram') {
      window.open('https://instagram.com/your_instagram_page', '_blank');
      setSubscriptionStatus(prev => ({ ...prev, instagram: true }));
    } else if (platform === 'telegram') {
      window.open('https://t.me/your_telegram_channel', '_blank');
      setSubscriptionStatus(prev => ({ ...prev, telegram: true }));
    }
  };

  // Ma'lumotlarni tekshirish
  const validateForm = () => {
    // Asosiy ma'lumotlarni tekshirish
    if (!formData.first_name || !formData.last_name || !formData.phone_number ||
      !formData.birth_date || !formData.region || !formData.district ||
      !formData.email || !formData.study_place || !formData.direction || !formData.gender) {
      setMessage('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
      return false;
    }

    // Telefon raqamini tekshirish
    if (formData.phone_number.length !== 13) {
      setMessage('Iltimos, to\'liq telefon raqamini kiriting!');
      return false;
    }

    // Direction qiymatini tekshirish
    const validDirectionValues = categories.map(dir => dir.id.toString());
    if (!validDirectionValues.includes(formData.direction)) {
      setMessage('Iltimos, to\'g\'ri yo\'nalishni tanlang!');
      return false;
    }

    // Robo Futbol uchun do'st ma'lumotlarini tekshirish
    if (isRoboFootball) {
      if (!friendData.first_name || !friendData.last_name || !friendData.phone_number ||
        !friendData.birth_date || !friendData.region || !friendData.district ||
        !friendData.email || !friendData.study_place || !friendData.gender) {
        setMessage('Iltimos, sherigingizning barcha majburiy maydonlarini to\'ldiring!');
        return false;
      }

      if (friendData.phone_number.length !== 13) {
        setMessage('Iltimos, sherigingizning to\'liq telefon raqamini kiriting!');
        return false;
      }
    }

    return true;
  };

  // Form yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // API endpoint - to'g'rilangan URL
      const API_URL = 'https://aiday.infinite-co.uz/register/'; // API endpoint to'g'rilandi

      // Region va district ID'larni string qiymatlarga aylantirish
      const regionName = regionsData.find(r => parseInt(r.id) === parseInt(formData.region))?.name_uz || '';
      const districtName = districtsData.find(d => parseInt(d.id) === parseInt(formData.district))?.name_uz || '';

      let submitData;

      if (isRoboFootball) {
        // Robo Futbol uchun - friend_data bilan
        const friendRegionName = regionsData.find(r => parseInt(r.id) === parseInt(friendData.region))?.name_uz || '';
        const friendDistrictName = districtsData.find(d => parseInt(d.id) === parseInt(friendData.district))?.name_uz || '';

        submitData = {
          ...formData,
          region: regionName,
          district: districtName,
          direction: categories.find((value) => value.id === parseInt(formData.direction)).value || formData.direction,
          friend_data: {
            ...friendData,
            region: friendRegionName,
            district: friendDistrictName
          }
        };
      } else {
        // Boshqa yo'nalishlar uchun - friend_data O'CHIRILDI
        submitData = {
          ...formData,
          region: regionName,
          district: districtName,
          direction: categories.find((value) => value.id === parseInt(formData.direction)).value || formData.direction,
        };
        // friend_data maydoni o'chirildi
        delete submitData.friend_data;
      }

      console.log('Yuborilayotgan ma\'lumotlar:', submitData);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
        // Formani tozalash
        setFormData({
          first_name: '',
          last_name: '',
          middle_name: '',
          phone_number: '',
          birth_date: '',
          region: '',
          district: '',
          telegram_username: '',
          email: '',
          study_place: '',
          direction: '',
          about: '',
          gender: ''
        });
        setFriendData({
          first_name: '',
          last_name: '',
          middle_name: '',
          phone_number: '',
          birth_date: '',
          region: '',
          district: '',
          telegram_username: '',
          email: '',
          study_place: '',
          about: '',
          gender: ''
        });
        setSelectedRegion('');
        setSelectedDistrict('');
        setFriendRegion('');
        setFriendDistrict('');
      } else {
        const errorMessage = result.detail ||
          (result.errors ? Object.values(result.errors).flat().join(', ') : '') ||
          result.message ||
          'Server xatosi';
        throw new Error(errorMessage);
      }
    } catch (error) {
      setMessage(error.message || 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Do'st (ikkinchi ishtirokchi) formasi
  const renderFriendForm = () => {
    const friendDistricts = districtsData.filter(district =>
      parseInt(district.region_id) === parseInt(friendData.region)
    );

    return (
      <div className="friend-form-section">
        <h3 className="friend-title">2-ishtirokchi (Sherigingiz)</h3>

        <div className='form-row'>
          <div className='form-group'>
            <label>Ism *</label>
            <input
              type="text"
              name="first_name"
              value={friendData.first_name}
              onChange={handleFriendInputChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Familya *</label>
            <input
              type="text"
              name="last_name"
              value={friendData.last_name}
              onChange={handleFriendInputChange}
              required
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label>Otasining ismi</label>
            <input
              type="text"
              name="middle_name"
              value={friendData.middle_name}
              onChange={handleFriendInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Jins *</label>
            <select
              name="gender"
              value={friendData.gender}
              onChange={handleFriendInputChange}
              required
            >
              <option value="">Jinsni tanlang</option>
              {genders.map(gender => (
                <option key={gender.value} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group phone-group'>
            <label>Telefon *</label>
            <div className='phone-input'>
              <span className='country-code'>+998</span>
              <input
                type="tel"
                name="phone_number"
                value={friendData.phone_number.replace('+998', '')}
                onChange={handleFriendInputChange}
                placeholder="90 123 45 67"
                required
                maxLength={9}
              />
            </div>
          </div>
          <div className='form-group'>
            <label>Tug'ilgan sana *</label>
            <input
              type="date"
              name="birth_date"
              value={friendData.birth_date}
              onChange={handleFriendInputChange}
              required
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label>Viloyat *</label>
            <select
              value={friendData.region}
              onChange={handleFriendRegionChange}
              required
            >
              <option value="">Viloyatni tanlang</option>
              {regionsData.map(region => (
                <option key={region.id} value={region.id}>
                  {region.name_uz}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label>Tuman *</label>
            <select
              value={friendData.district}
              onChange={handleFriendDistrictChange}
              required
              disabled={!friendData.region}
            >
              <option value="">Tumanni tanlang</option>
              {friendDistricts.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name_uz}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group telegram-group optional-field'>
            <label>Telegram username</label>
            <input
              type="text"
              name="telegram_username"
              value={friendData.telegram_username}
              onChange={handleFriendInputChange}
              placeholder="@username"
            />
          </div>
          <div className='form-group'>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={friendData.email}
              onChange={handleFriendInputChange}
              placeholder="email@example.com"
              required
            />
          </div>
        </div>

        <div className='form-group'>
          <label>O'qish joyi *</label>
          <input
            type="text"
            name="study_place"
            value={friendData.study_place}
            onChange={handleFriendInputChange}
            placeholder="Maktab, litsey, universitet nomi"
            required
          />
        </div>

        <div className='form-group optional-field'>
          <label>O'zingiz haqingizda qisqacha</label>
          <textarea
            rows="4"
            name="about"
            value={friendData.about}
            onChange={handleFriendInputChange}
            placeholder="Qo'shimcha ma'lumotlar..."
          ></textarea>
        </div>
      </div>
    );
  };

  // Yo'nalish qiymatini inson o'qiy oladigan formatga o'tkazish
  const getDirectionLabel = (value) => {
    const direction = categories.find(dir => dir.id === parseInt(value));
    return direction ? direction.title : value;
  };

  return (
    <div className='login'>
      {/* Obuna Modal */}
        {/* {showSubscriptionModal && (
          <div className="subscription-modal-overlay">
            <div className="subscription-modal">
              <div className="modal-header">
                <h2>Obuna Bo'lish Majburiy</h2>
                <p>Ro'yxatdan o'tish uchun quyidagi platformalarga obuna bo'ling</p>
              </div>
              <div className="platforms">
                <div className={`platform-card ${subscriptionStatus.instagram ? 'subscribed' : ''}`}>
                  <div className="platform-icon instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  </div>
                  <h3>Instagram</h3>
                  <p>Bizning Instagram sahifamizga obuna bo'ling</p>
                  <button
                    className={`subscribe-btn ${subscriptionStatus.instagram ? 'subscribed' : ''}`}
                    onClick={() => handlePlatformSubscribe('instagram')}
                  >
                    {subscriptionStatus.instagram ? 'Obuna Bo\'ldingiz ✓' : 'Obuna Bo\'lish'}
                  </button>
                </div>

                <div className={`platform-card ${subscriptionStatus.telegram ? 'subscribed' : ''}`}>
                  <div className="platform-icon telegram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                    </svg>
                  </div>
                  <h3>Telegram</h3>
                  <p>Bizning Telegram kanalimizga obuna bo'ling</p>
                  <button
                    className={`subscribe-btn ${subscriptionStatus.telegram ? 'subscribed' : ''}`}
                    onClick={() => handlePlatformSubscribe('telegram')}
                  >
                    {subscriptionStatus.telegram ? 'Obuna Bo\'ldingiz ✓' : 'Obuna Bo\'lish'}
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="confirm-btn"
                  onClick={handleSubscription}
                  disabled={!subscriptionStatus.instagram || !subscriptionStatus.telegram}
                >
                  Obuna Bo'ldim
                </button>

                {message && (
                  <div className="subscription-message error">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        )} */}

      <div className='logo'>
        <Link to='/'>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className='login-container'>
        <div className='royhatdan-otish'>
          <div className='header-text'>
            {selectedCategory && (
              <div className="selected-category-banner">
                <div className="category-details">

                  <h1 >{categories.find((value) => value.id === parseInt(selectedCategory))?.icon}
                    <h1>Ro'yxatdan o'tish </h1>
                    {getDirectionLabel(selectedCategory)}</h1>
                  <p>* - ushbu belgi bilan ajratilgan maydonlarni to'ldirish majburiy</p>
                  {isRoboFootball && (
                    <div className="team-notice">
                      <strong>Eslatma:</strong> Robo Football yo'nalishi uchun 2 kishilik jamoa ro'yxatdan o'tadi
                    </div>
                  )}
                  <div className="direction-info">
                    <strong>Tanlangan yo'nalish:</strong> {getDirectionLabel(formData.direction)}
                  </div>
                </div>
              </div>
            )}
            {!selectedCategory && (
              <div className="selected-category-banner">
                <div className="category-details">
                  <h1>Ro'yxatdan o'tish</h1>
                  <p>* - ushbu belgi bilan ajratilgan maydonlarni to'ldirish majburiy</p>
                </div>
              </div>
            )}
          </div>

          <div className='form-container'>
            <form className='registration-form' onSubmit={handleSubmit}>
              {/* 1-ishtirokchi formasi */}
              <div className="participant-section">
                {/* <h3 className="participant-title">1-ishtirokchi (Siz)</h3> */}

                <div className='form-row'>
                  <div className='form-group'>
                    <label>Ism *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label>Familya *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group'>
                    <label>Otasining ismi</label>
                    <input
                      type="text"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Jins *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Jinsni tanlang</option>
                      {genders.map(gender => (
                        <option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group phone-group'>
                    <label>Telefon *</label>
                    <div className='phone-input'>
                      <span className='country-code'>+998</span>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number.replace('+998', '')}
                        onChange={handleInputChange}
                        placeholder="90 123 45 67"
                        required
                        maxLength={9}
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Tug'ilgan sana *</label>
                    <input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group'>
                    <label>Viloyat *</label>
                    <select
                      value={selectedRegion}
                      onChange={handleRegionChange}
                      required
                    >
                      <option value="">Viloyatni tanlang</option>
                      {regionsData.map(region => (
                        <option key={region.id} value={region.id}>
                          {region.name_uz}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Tuman *</label>
                    <select
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      required
                      disabled={!selectedRegion}
                    >
                      <option value="">Tumanni tanlang</option>
                      {filteredDistricts.map(district => (
                        <option key={district.id} value={district.id}>
                          {district.name_uz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group telegram-group optional-field'>
                    <label>Telegram username</label>
                    <input
                      type="text"
                      name="telegram_username"
                      value={formData.telegram_username}
                      onChange={handleInputChange}
                      placeholder="@username"
                    />
                  </div>
                  <div className='form-group'>
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>O'qish joyi *</label>
                  <input
                    type="text"
                    name="study_place"
                    value={formData.study_place}
                    onChange={handleInputChange}
                    placeholder="Maktab, litsey, universitet nomi"
                    required
                  />
                </div>

                {/* Yo'nalish tanlash (faqat kategoriya tanlanmagan bo'lsa) */}
                {!selectedCategory && (
                  <div className="form-group">
                    <label>Yo'nalish *</label>
                    <select
                      name="direction"
                      value={formData.direction}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Yo'nalishni tanlang</option>
                      {categories.map(dir => (
                        <option key={dir.id} value={dir.value}>
                          {dir.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Agar kategoriya tanlangan bo'lsa, direction ni ko'rsatish */}
                {selectedCategory && (
                  <div className="form-group">
                    <label>Yo'nalish *</label>
                    <div className="selected-direction">
                      <input
                        type="text"
                        value={getDirectionLabel(formData.direction)}
                        readOnly
                        className="readonly-input"
                      />
                      {/* <div className="direction-hint">Avtomatik tanlandi</div> */}
                    </div>
                  </div>
                )}

                <div className='form-group optional-field'>
                  <label>O'zingiz haqingizda qisqacha</label>
                  <textarea
                    rows="4"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    placeholder="Qo'shimcha ma'lumotlar..."
                  ></textarea>
                </div>
              </div>

              {/* 2-ishtirokchi formasi (faqat Robo Futbol uchun) */}
              {isRoboFootball && (
                <>
                  <hr className="section-divider" />
                  {renderFriendForm()}
                </>
              )}

              {/* Xabar ko'rsatish */}
              {message && (
                <div className={`message ${message.includes('Muvaffaqiyatli') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                className='submit-btn'
                disabled={loading}
              >
                {loading ? 'Yuborilmoqda...' : (isRoboFootball ? 'Jamoa ro\'yxatdan o\'tish' : 'Ro\'yxatdan o\'tish')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;