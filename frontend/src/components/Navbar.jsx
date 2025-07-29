import React from 'react';

import coffeeButton from "../assets/coffee.png";
import { useNavigate } from 'react-router';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Resume Analysis', href: '/analyse' },
  { name: 'Resume Optimization', href: '/resume-optimization' },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='m-5 flex items-center'>
        <div className="text-2xl font-bold mr-8">
          Resume Revamp
          <span className="text-blue-800 text-4xl">.</span>
        </div>
        <div className='flex space-x-6 '>
          {navLinks.map((link) => (
            <span
              key={link.name}
              className="relative text-base font-medium cursor-pointer hover:text-blue-600"
              onClick={() => navigate(link.href)}
              style={{ transition: 'color 0.3s' }}
            >
              {link.name}
              <span className="underline" style={{
                display: 'block',
                position: 'absolute',
                left: 0,
                bottom: -2,
                width: '100%',
                height: 2,
                background: 'var(--tw-text-accent, #08f)',
                borderRadius: 2,
                transform: 'scaleX(0)',
                transition: 'transform 0.4s',
                willChange: 'transform'
              }} />
            </span>
          ))}
        </div>
      </div>
      <div className='m-5 flex items-center space-x-6'>
        <a href="#">
          <img src={coffeeButton} alt="coffee" className='w-20 h-8 mr-2' />
        </a>
        <button className='btn btn-info mr-2' onClick={() => navigate('/signin')}>
          Sign-in
        </button>
        <button className='btn btn-primary' onClick={() => navigate('/signup')}>
          Sign-up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
