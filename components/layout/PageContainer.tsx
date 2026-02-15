import Image from 'next/image'
import Header from './Header'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import PageContainerBgImg from '@/assets/images/stone-bg-2.png'
import borderImageLeft from "@/assets/images/panel-edge-img-left.png"
import borderImageRight from "@/assets/images/panel-edge-img-right.png"
import Footer from './Footer'



export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full lg-custom:max-w-7xl mx-auto">
      <Header />
      
      <div className="min-h-[120vh] mx-auto flex">
        {/* Outer left border - hidden below 1050px */}
        <div 
          className="hidden lg-custom:block w-2 relative"
          style={{
            backgroundImage: `url(${borderImageLeft.src})`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: '8px auto',
            filter: 'brightness(0.45) contrast(1.25)'
          }}
        />
        
        <SidebarLeft />
        
        {/* Inner left border */}
        <div 
          className="w-2 relative"
          style={{
            backgroundImage: `url(${borderImageRight.src})`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: '8px auto',
            filter: 'brightness(0.45) contrast(1.25)'
          }}
        />
        
        <main className="flex-1 relative z-0">
          <div
            className="absolute inset-0 "
            style={{
              backgroundImage: `url(${PageContainerBgImg.src})`,
              backgroundRepeat: 'repeat-y',
              backgroundSize: 'contain',
              backgroundPosition: 'left top',
              filter: 'brightness(0.25) contrast(1.23)'
            }}
          />
          <div className="panel p-4 mt-10 relative z-10">
            {children}
          </div>
        </main>
        
        {/* Inner right border */}
        <div 
          className="w-2 relative"
          style={{
            backgroundImage: `url(${borderImageLeft.src})`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: '8px auto',
            filter: 'brightness(0.45) contrast(1.25)'
          }}
        />
        
        <SidebarRight />
        

        <div 
          className="hidden lg-custom:block w-2 relative"
          style={{
            backgroundImage: `url(${borderImageRight.src})`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: '8px auto',
            filter: 'brightness(0.45) contrast(1.25)'
          }}
        />
      </div>
      <Footer />
    </div>
  )
}
