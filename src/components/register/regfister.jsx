import React, { useState } from 'react'
import Logo from '../imgs/logo.png'
import './register.scss'
import Robot from '../imgs/robot.png'
import Futbol from '../imgs/futbol.png'
import Yutuq from '../imgs/yutuq.png'
import Chiroq from '../imgs/chiroq.png'

const Register = () => {
    const [isSubscribed, setIsSubscribed] = useState(false)

    const handleSubscribe = () => {
        setIsSubscribed(true)
    }

    return (
        <div className='register'>
            {/* Subscription Modal */}
            {!isSubscribed && (
                <div className='subscription-modal'>
                    <div className='modal-content'>
                        <h3>Obuna bo'lish majburiy</h3>
                        <p>Iltimos, quyidagi ijtimoiy tarmoqlarga obuna bo'ling:</p>
                        <div className='social-links'>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                                Telegram
                            </a>
                        </div>
                        <button onClick={handleSubscribe} className='subscribe-btn'>
                            Obuna bo'ldim
                        </button>
                    </div>
                </div>
            )}

            <div className='logo'>
                <img src={Logo} alt="Logo" />
            </div>
            <div className='olti-burchak'>
                <div className='text'>
                    <h3 className='royhatdan-otish'>Ro'yxatdan o'tish</h3>
                    <p>* - ushbu belgi bilan ajratilgan maydonlarni to'ldirish majburiy</p>
                </div>
                <div className='hexagon'>
                    <form>
                        <div className='input1'>
                            <input type="text" placeholder='Ism *' />
                            <input type="text" placeholder='Familya *'/>
                        </div>
                        <div className='input2'>
                            <input type="number" placeholder='Raqam' />
                            <input type="text" placeholder='Sharif *' />
                        </div>
                        <div className='input3'>
                            <input type="date" />
                            <input type="text" placeholder='Telegram @username *' />
                        </div>
                        <div className='input4'>
                            <input type="email" placeholder='Email *' />
                            <input type="text" placeholder="O'qish joyi *" />
                        </div>
                        <div className='imgs'>
                            <div className='futbol'>
                                <img src={Futbol} alt="Futbol" />
                                <p>Robo football</p>
                            </div>
                            <div className='robot'>
                                <img src={Robot} alt="Robot" />
                                <p>Robo sumo</p>
                            </div>
                            <div className='chiroq'>
                                <img src={Chiroq} alt="Chiroq" />
                                <p>Foydali ixtirolar</p>
                            </div>
                            <div className='yutuq'>
                                <img src={Yutuq} alt="Yutuq" />
                                <p>Contest</p>
                            </div>
                        </div>
                        <div className='texarea'>
                            <textarea cols="30" rows="5" placeholder='Qo`shimcha ma`lumot'></textarea>
                        </div>
                        <button type='submit'>Keyingi ishtirokchini ro'yxatdan o'tkazish</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register