import { ReactNode } from 'react'
import borderImage from "@/assets/images/panel-edge-img.png"

interface Props {
  children: ReactNode
  className?: string
}

export default function PanelBorder({ children, className = '' }: Props) {
  return (
    <div 
      className={`panel p-4 z-10 relative ${className}`}
      style={{
        borderWidth: '4px',
        borderStyle: 'solid',
        borderImageSource: `url(${borderImage.src})`,
        borderImageSlice: '1',
        borderImageRepeat: 'stretch' // or 'repeat' or 'round'
      }}
    >
      {children}
    </div>
  )
}