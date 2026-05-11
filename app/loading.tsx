export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="min-h-[600px] bg-brand-dark opacity-80" />
      <div className="bg-brand-blue h-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-96 bg-gray-200 rounded" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
