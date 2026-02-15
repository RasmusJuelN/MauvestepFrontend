import { IconType } from 'react-icons'
import Link from 'next/link'

interface Props {
  icon: IconType
  title: string
  description: string
}

export default function SupportCard({ icon: Icon, title, description }: Props) {
  return (

      <div className="p-6 border-2 border-indigo-900/80 rounded-lg bg-indigo-900/10 hover:bg-indigo-900/40 hover:border-indigo-600/50 transition-all duration-200 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-800/30 rounded-lg">
            <Icon size={24} className="text-indigo-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">{title}</h3>
            <p className="text-sm text-indigo-100">{description}</p>
          </div>
        </div>
      </div>

  )
}
