export default function CategoryCard({ name, description, threads }: { name: string; description: string; threads: number }) {
  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-600/40 rounded-lg p-6 hover:border-indigo-500/80 hover:bg-indigo-900/60 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl text-indigo-400 font-semibold">{name}</h3>
          <p className="muted mt-1 text-indigo-100">{description}</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-400">{threads}</div>
          <div className="muted text-sm text-indigo-100">threads</div>
        </div>
      </div>
    </div>
  )
}
