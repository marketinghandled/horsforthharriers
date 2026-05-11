import { PortableText as SanityPortableText, type PortableTextMarkComponentProps } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

const components = {
  types: {
    image: ({ value }: { value: TypedObject & { alt?: string } }) => (
      <div className="my-8 rounded-2xl overflow-hidden">
        <Image
          src={urlFor(value).width(900).fit('max').url()}
          alt={(value as { alt?: string }).alt ?? ''}
          width={900}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<{ _type: string; href?: string }>) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-blue underline hover:text-brand-dark"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-brand-blue pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
}

export default function PortableText({ value }: { value: TypedObject[] }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
      <SanityPortableText value={value} components={components} />
    </div>
  )
}
