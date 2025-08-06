"use client"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Resume Analysis', href: '/analyse' },
  { name: 'Resume Optimization', href: '/resumeoptimize' },
];

const coffeeButton: string = "https://resumerevamp.s3.ap-south-1.amazonaws.com/coffee.png";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [signIn, setSignIn] = useState<boolean>(true);

  const navigate = (href: string): void => {
    router.push(href);
  };

  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='m-5 flex items-center'>
        <div className="text-2xl font-bold mr-8 cursor-default select-none">
          Resume Revamp
          <span className="text-blue-800 text-4xl">.</span>
        </div>
        <div className='flex space-x-6'>
          {navLinks.map((link: NavLink) => (
            <span
              key={link.name}
              className="mt-3 text-base font-medium cursor-pointer hover:text-blue-600"
              onClick={() => navigate(link.href)}
              style={{ transition: 'color 0.3s' }}
            >
              {link.name}
            </span>
          ))}
        </div>
      </div>

      <div className='m-5 flex items-center space-x-6'>
        <a href="#" aria-label="Buy me a coffee">
          <img
            src={coffeeButton}
            alt="coffee"
            className='w-20 h-8 mr-2'
          />
        </a>
          
        


        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-20 h-20",
                userButtonPopoverCard: "bg-white border border-gray-200 shadow-lg",
              }
            }}
          />
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="border border-gray-300 text-gray-100 px-4 py-2 rounded hover:bg-gray-700">
              Sign In / Register
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
