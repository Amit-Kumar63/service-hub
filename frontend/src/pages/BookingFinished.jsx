import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const BookingFinished = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    gsap.fromTo(
      '.modal',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.75)' }
    );
    setTimeout(() => {
      navigate("/home");
    }, 5000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500 bg-opacity-50 relative px-4">
      {/* Confetti effect */}
      <Confetti width={width} height={height} />

      <div className="modal bg-white p-6 rounded-lg shadow-lg text-center w-full">
        <h2 className="text-3xl font-semibold text-green-600">Congratulations!</h2>
        <p className="mt-4 text-lg text-gray-700">Your service booking was successful.</p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/user/home')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold transform transition-transform focus:outline-none">
            Go to Home
          </button>
        </div>
      </div>
      <div className='fixed bottom-10 left-0 right-0 px-2'>
      <p className='text-center text-base font-semibold text-green-700'>You will be redirected to Home page in 5 seconds</p>
      <p className='text-center text-sm font-semibold text-gray-700'>Thank you for using ServiceHub</p>
      </div>
    </div>
  );
};

export default BookingFinished;
