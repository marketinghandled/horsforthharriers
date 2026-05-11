import PortableText from './PortableText'
import type { TypedObject } from '@portabletext/types'

interface Section {
  title: string
  body?: TypedObject[]
}

export default function ConstitutionAccordion({ sections }: { sections: Section[] }) {
  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {sections.map((section) => (
        <details key={section.title} className="group border border-gray-200">
          <summary className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none">
            <span className="font-semibold text-gray-900 text-sm">{section.title}</span>
            <svg
              className="w-4 h-4 text-brand-blue flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            {section.body && section.body.length > 0 ? (
              <PortableText value={section.body} />
            ) : (
              <p className="text-gray-500 text-sm italic">No content yet.</p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
