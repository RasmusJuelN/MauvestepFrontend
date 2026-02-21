import Separator from './Separator'

interface PageHeaderProps {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-center gap-3 mb-4">
        <h2 className="text-3xl text-indigo-400 font-semibold text-center">{title}</h2>
      </div>
      <Separator />
    </>
  )
}
