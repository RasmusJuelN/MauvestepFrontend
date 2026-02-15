import Image from 'next/image'
import sidebarMenuBgImage from "@/assets/images/menu-header-text-bg-img.jpg";
export default function MenuHeaderItem({ title }: { title: string }) {
  return (
    <div className="relative h-13">
  <Image 
    src={sidebarMenuBgImage} 
    alt={`${title} sidebar menu bg img`}
    className="w-full h-full "
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <h3 className="text-indigo-400 font-semibold text-lg pb-1">{title}</h3>
  </div>
</div>
  )
}