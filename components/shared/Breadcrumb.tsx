import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  return (
    <div className="text-sm mb-6 px-2">
      <div className="flex items-center gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="text-indigo-300 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-indigo-500">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="text-indigo-300">›</span>}
          </div>
        ))}
      </div>
    </div>
  )
}