export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="bg-brand-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-4 w-24 bg-blue-400 rounded mx-auto" />
          <div className="h-12 w-96 bg-blue-400 rounded mx-auto" />
          <div className="h-6 w-80 bg-blue-400 rounded mx-auto" />
        </div>
      </div>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${85 + (i % 3) * 5}%` }} />
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
