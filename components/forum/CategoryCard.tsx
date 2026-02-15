export default function CategoryCard({ name, description, threads }: { name: string; description: string; threads: number }) {
  return (
    <div className="card panel">
      <div className="flex justify-between items-start p-6 border-2 border-indigo-900/80 rounded-lg bg-indigo-900/10 hover:bg-indigo-900/40 hover:border-indigo-600/50 transition-all duration-200 cursor-pointer">
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
