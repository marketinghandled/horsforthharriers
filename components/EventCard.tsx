import { Calendar, MapPin, Trophy } from 'lucide-react'

type Event = {
  _key: string
  title: string
  date: string
  location?: string
  distance?: string
  type?: string
  description?: string
  registrationUrl?: string
}

const typeColors: Record<string, string> = {
  'Club Race': 'bg-brand-blue text-white',
  'Championship': 'bg-yellow-500 text-white',
  'PECO XC': 'bg-green-600 text-white',
  'Yorkshire Vets': 'bg-purple-600 text-white',
  'External Race': 'bg-gray-600 text-white',
  'Social': 'bg-pink-500 text-white',
}

function formatDate(date: string) {
  const d = new Date(date)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

export default function EventCard({ event }: { event: Event }) {
  const date = formatDate(event.date)
  const colorClass = event.type ? (typeColors[event.type] ?? 'bg-brand-blue text-white') : 'bg-brand-blue text-white'

  return (
    <div className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Date block */}
      <div className="flex-none w-14 flex flex-col items-center justify-center bg-brand-light rounded-xl p-2 text-center">
        <span className="text-2xl font-bold text-brand-blue leading-none">{date.day}</span>
        <span className="text-xs font-semibold text-brand-blue mt-1">{date.month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 line-clamp-1">{event.title}</h3>
          {event.type && (
            <span className={`flex-none text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
              {event.type}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {event.location}
            </span>
          )}
          {event.distance && (
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> {event.distance}
            </span>
          )}
        </div>
        {event.description && (
          <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
        )}
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-brand-blue font-medium hover:underline"
          >
            Register &rarr;
          </a>
        )}
      </div>
    </div>
  )
}
