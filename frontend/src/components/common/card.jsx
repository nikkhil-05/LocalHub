function Card({ children }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors duration-200 hover:border-zinc-700">
      {children}
    </div>
  )
}

export default Card