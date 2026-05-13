import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden">
          <Image
            src={urlForImage(value).width(800).quality(80).url()}
            alt={value.alt || 'Blog Image'}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-slate-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-slate-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-900">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3 text-slate-900">{children}</h4>,
    normal: ({ children }) => <p className="text-lg leading-relaxed text-slate-600 mb-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 italic text-xl text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-lg">{children}</li>,
    number: ({ children }) => <li className="text-lg">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
  },
}

export function PortableText({ value }: { value: any }) {
  if (!value) return null
  return <PortableTextComponent value={value} components={components} />
}
