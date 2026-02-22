import Link from 'next/link'
import PageContainer from '../components/layout/PageContainer'
import NewsContainer from '@/components/layout/NewsContainer'
import PageHeader from '@/components/shared/PageHeader'
import { BiComment, BiBookContent, BiTrendingUp, BiGame, BiChevronDown } from 'react-icons/bi'

export default function Home() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader title="Welcome to Mauve Step" />
        
        {/* Hero Section */}
        <div className=" rounded-xl p-8">
          <p className="text-lg text-indigo-200 leading-relaxed mb-4">
            Join our vibrant community dedicated to mastering the ultimate rhythm-based dungeon experience. Whether you&apos;re a seasoned explorer or just stepping into the beat, you&apos;ll find everything you need to level up your gameplay and connect with fellow players.
          </p>
          <p className="text-lg text-indigo-300 leading-relaxed mb-4">
            Share strategies, discuss mechanics, contact our amazing team, discuss tactics in our forums, check the leaderboards, and stay updated with the latest news. This is your space to learn, contribute, and become part of something greater.
          </p>

 
          <div className="flex justify-center mb-4 animate-bounce">
            <BiChevronDown size={24} className="text-indigo-400 animate-" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FeatureCard 
              icon={<BiComment size={24} />}
              title="Forum"
              href="/forum"
            />
            <FeatureCard 
              icon={<BiBookContent size={24} />}
              title="Support"
              href="/support"
            />
            <FeatureCard 
              icon={<BiTrendingUp size={24} />}
              title="Leaderboard"
              href="/highscore"
            />
            <FeatureCard 
              icon={<BiGame size={24} />}
              title="Game Mechanics"
              href="/game-mechanics"
            />
          </div>
        </div>

        {/* News Section */}
        <NewsContainer />
      </div>
    </PageContainer>
  )
}

function FeatureCard({ icon, title, href }: { icon: React.ReactNode; title: string; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-600/40 rounded-lg p-3 hover:border-indigo-500/80 hover:bg-indigo-900/60 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 group cursor-pointer h-full flex flex-col items-center justify-center text-center">
        <div className="text-indigo-400 mb-2 group-hover:text-indigo-300 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-indigo-200 group-hover:text-indigo-100 transition-colors">{title}</h3>
      </div>
    </Link>
  )
}
