export default function Underline({ className = '' }: { className?: string }) {
  return (
    <div className={`h-0.5 bg-indigo-500 w-[120%] -ml-[10%] ${className}`} />
  )
}
