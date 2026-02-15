'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiMenu, BiX } from 'react-icons/bi';
import { useAuth } from '@/lib/hooks/authContext';
import MenuLinkItem from '../sidebar/MenuLinkItem';
import ProfileCard from '../sidebar/ProfileCard';
import Login from '../sidebar/Login';
import Button from '../shared/Button';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const links = ['Home', 'Highscore', 'Game mechanics', 'Support', 'Forum'];
  const isAdmin = user?.role === 'Admin';

  const openMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg-custom:hidden">
      {/* Hamburger */}
      <button
        onClick={openMenu}
        className="p-2 text-indigo-300 hover:text-indigo-200 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
      </button>

      {/*  Menu Panel on mobile */}
      {isOpen && (
        <div className="absolute top-16 right-0 left-0 bg-indigo-950 border-b border-indigo-700 z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <div className="space-y-2">
                {links.map(link => (
                  <Link
                    key={link}
                    href={link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-indigo-300 hover:text-indigo-200 p-2 rounded-md hover:bg-gray-100/10 transition-colors"
                    onClick={closeMenu}
                  >
                    {link}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block text-indigo-300 hover:text-indigo-200 p-2 rounded-md hover:bg-gray-100/10 transition-colors"
                    onClick={closeMenu}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-indigo-700"></div>

            <div>
              {user ? (
                <div>
                  <h3 className="text-indigo-300 font-bold mb-3 px-2">Profile</h3>
                  <div className="px-2 mb-4">
                    <ProfileCard />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-indigo-300 font-bold mb-3 px-2">Login</h3>
                  <div className="mb-4">
                    <Login />
                  </div>
                  <Button
                  variant="edit"
                    onClick={() => {
                      router.push('/register');
                      closeMenu();
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Create account
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
