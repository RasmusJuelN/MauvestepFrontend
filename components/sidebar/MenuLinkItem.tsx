import Link from 'next/link';

export default function MenuLinkItem({title}: {title: string}) {
  const href = title.toLowerCase() === 'home' ? '/' : `/${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <Link href={href} className="text-indigo-300 hover:text-indigo-200 cursor-pointer rounded-md">
        <div className='p-2 rounded-md hover:bg-indigo-700/30'>{title}</div>
    </Link>
  )
}