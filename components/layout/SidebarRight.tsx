'use client'

import Image from 'next/image'
import rightSidebarBgImage from "@/assets/images/page-bg-1.png";
import MenuHeaderItem from '../sidebar/MenuHeaderItem';
import ProfileCard from '../sidebar/ProfileCard';
import Login from '../sidebar/Login';
import { useAuth } from '@/lib/hooks/authContext';

export default function SidebarRight() {
  const { user } = useAuth();



  return (
    <aside className="w-64 relative z-0 hidden lg-custom:block">
      <div
            className="absolute inset-0 "
            style={{
              backgroundImage: `url(${rightSidebarBgImage.src})`,
              backgroundRepeat: 'repeat-y',
              backgroundSize: 'contain',
              backgroundPosition: 'left top',
              filter: 'brightness(0.25) contrast(1.23)'
            }}
          />
      
      {user ? (
        <div className="panel p-4 mt-6 z-10 relative">
          <MenuHeaderItem title="Profile" />
          <div className='mt-4'>
            <ProfileCard />
            
          </div>
          
        </div>
      ) : (
        <div className="panel p-4 mt-6 z-10 relative">
          <MenuHeaderItem title="Login" />
          <Login />
        </div>
      )}
    </aside>
  )
}