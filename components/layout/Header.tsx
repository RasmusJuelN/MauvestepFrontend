import Image from 'next/image'
import headerImage from "@/assets/images/header-bg-image-3.png";
import headerTextBgImage from "@/assets/images/header-text-bg-img.png";
import headerSecondaryTextBgImage from "@/assets/images/header-secondary-text-bg-img.png";
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="relative">
        {/* Full header - hidden below lg-custom */}
        <div className="hidden lg-custom:block">
          <Image src={headerImage} alt="header img" className="mx-auto my-auto w-full" />

          <div className="flex gap-6 flex-col absolute -bottom-10 left-0 right-0 justify-center items-center z-10">
            
            <Link href={"/"} className="flex justify-center items-center relative" style={{ filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 60px rgba(147, 51, 234, 0.2))' }} >

              <Image src={headerTextBgImage} alt="header img" className="mx-auto w-full h-full z-10 absolute " />
                  <h1 className="px-14 py-12 text-4xl text-indigo-300 font-bold text-center z-10 relative"  style={{ fontFamily: '"Press Start 2P", "Courier New", monospace', letterSpacing: '0.2em', textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>MAUVE STEP</h1>
            </Link>
            <div className="relative flex items-center justify-center">
              <Image src={headerSecondaryTextBgImage} alt="header img" className="w-[260px] h-[100px] brightness-125 contrast-115" />
              <h2 className="absolute text-indigo-300 font-bold text-center px-4 py-2 text-sm" style={{ fontFamily: '"Press Start 2P", "Courier New", monospace', letterSpacing: '0.2em', textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>COMMUNITY</h2>
            </div>
          </div>
        </div>

        {/* header below lg-custom */}
        <div className="lg-custom:hidden bg-gradient-to-r from-indigo-900 to-purple-900 py-4 px-4 flex justify-between items-center">
          <Link href={"/"} className="flex justify-center items-center">
            <h1 className="text-xl text-indigo-300 font-bold" style={{ fontFamily: '"Press Start 2P", "Courier New", monospace', letterSpacing: '0.1em', textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>MAUVE STEP</h1>
          </Link>
          <MobileMenu />
        </div>
    </header>
  )
}
