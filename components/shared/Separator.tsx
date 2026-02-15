export default function Separator() {
  return (
    <div className="flex items-center justify-center w-full py-2">
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-indigo-400/50 to-indigo-400/50"></div>
      <div className="mx-3">
        <div className="w-1.5 h-1.5 rotate-45 bg-indigo-900 border border-indigo-300/50"></div>
      </div>
      <div className="flex-1 h-px bg-linear-to-l from-transparent via-indigo-400/50 to-indigo-400/50"></div>
    </div>
  )
}
