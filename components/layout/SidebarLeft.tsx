'use client';

import leftSidebarBgImage from "@/assets/images/page-bg-1.png";
import MenuHeaderItem from '../sidebar/MenuHeaderItem';
import MenuLinkItem from '../sidebar/MenuLinkItem';
import { useAuth } from '@/lib/hooks/authContext';


export default function SidebarLeft() {
  const links = ['Home', 'Highscore', 'Game mechanics', 'Support', 'Forum']
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  
  return (
    

   <aside className="w-64  relative z-0 hidden lg-custom:block">
    <div
            className="absolute inset-0 "
            style={{
              backgroundImage: `url(${leftSidebarBgImage.src})`,
              backgroundRepeat: 'repeat-y',
              backgroundSize: 'contain',
              backgroundPosition: 'left top',
              filter: 'brightness(0.25) contrast(1.23)'
            }}
          />
      {/* <Image src={leftSidebarBgImage} alt="header img" className="w-full h-full absolute brightness-85 contrast-125"/> */}
      <div className="panel p-4 mt-6 z-10 relative">
        

        <MenuHeaderItem title="Main Menu" />
        
        <div className="mt-3 w-full">
          {links.map(l => 
          <div key={l} >
            <MenuLinkItem title={l} />
          </div>)}
          {isAdmin && (
            <div key="Admin">
              <MenuLinkItem title="Admin" />
            </div>
          )}
        </div>
        
      </div>
      <div className="panel p-4 z-10 relative">
        <MenuHeaderItem title="Server status" />
        <p className="muted text-sm mt-2 text-indigo-300">Server maintenance scheduled tonight.</p>
      </div>
    </aside>

   

  )
}
