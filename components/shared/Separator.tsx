export default function Separator() {
  return (
    <div className="flex items-center justify-center w-full py-2 mb-2">
      <div className="flex-1 h-[2px] bg-linear-to-r from-transparent via-indigo-800/100 to-indigo-400/100"></div>
      <div className="mx-3">
        <div className="w-2.5 h-2.5 rotate-45 bg-purple-400 border border-indigo-300 ">

        </div>
      </div>
      <div className="flex-1 h-[2px] bg-linear-to-l from-transparent via-indigo-400/100 to-indigo-400/100"></div>
    </div>
  )
}
