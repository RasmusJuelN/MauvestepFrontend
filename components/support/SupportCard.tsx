import { IconType } from 'react-icons'
import Link from 'next/link'

interface Props {
  icon: IconType
  title: string
  description: string
}

export default function SupportCard({ icon: Icon, title, description }: Props) {
  return (
      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-600/40 rounded-lg p-6 hover:border-indigo-500/80 hover:bg-indigo-900/60 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 cursor-pointer">
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
