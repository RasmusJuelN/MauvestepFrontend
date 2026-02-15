import Footer from '@/components/layout/Footer'
import PageContainer from '../components/layout/PageContainer'
import NewsContainer from '@/components/layout/NewsContainer'




export default function Home() {
  return (
    
    <PageContainer>
      <div className="space-y-6 ">
        <div className="space-y-6 px-2 text-indigo-100">
        <h2 className="text-3xl font-bold text-center text-indigo-500">Welcome to Mauve Step</h2>
        <p>Join our vibrant community dedicated to mastering the ultimate rhythm-based dungeon experience. Whether you&apos;re a seasoned explorer or just stepping into the beat, you&apos;ll find everything you need to level up your gameplay and connect with fellow players.</p>
        <p>Share strategies, discuss mechanics, contact our amazing team, discuss tactics in our forums, check the leaderboards, and stay updated with the latest news. This is your space to learn, contribute, and become part of something greater.</p>
      </div>
      <NewsContainer />
      
      </div>
      
    </PageContainer>
  )
}
