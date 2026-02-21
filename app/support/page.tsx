import PageContainer from '@/components/layout/PageContainer'
import SupportCard from '@/components/support/SupportCard'
import Breadcrumb from '@/components/shared/Breadcrumb'
import PageHeader from '@/components/shared/PageHeader'
import { BiBug, BiQuestionMark, BiEnvelope, BiBookOpen, BiMessageDetail } from 'react-icons/bi'
import Link from 'next/link'

export default function SupportPage() {
  const supportOptions = [
    {
      id: 'bug-report',
      icon: BiBug,
      title: 'Report Bugs and Issues',
      description: 'Found a bug or experiencing technical issues? Let us know so we can fix it.',
    },
    {
      id: 'faq',
      icon: BiQuestionMark,
      title: 'FAQ',
      description: 'Find answers to frequently asked questions about the forum and gameplay.',
    },
    {
      id: 'contact',
      icon: BiEnvelope,
      title: 'Support Ticket',
      description: 'Need help? Get in touch with our support team directly.',
    },
    {
      id: 'feedback',
      icon: BiMessageDetail,
      title: 'Submit Feedback',
      description: 'Share your suggestions and ideas to help us improve the forum.',
    }
  ]

  return (
    <PageContainer>
      <div>
        <Breadcrumb items={[
          { label: 'Support' }
        ]} />
        
        <PageHeader title="Support" />
        
        <p className="text-center text-indigo-300 mb-8">
          How can we help you today? Choose a category below to get started.
        </p>
        
        <div className="space-y-2">
          {supportOptions.map(option => (
            <Link
              key={option.id}
              href={`/support/${option.id.toLocaleLowerCase()}`} 
              className="block"
            >
              <SupportCard
                icon={option.icon}
                title={option.title}
                description={option.description}
              />
            </Link>
          ))}
        </div>
        
      </div>
    </PageContainer>
  )
}
