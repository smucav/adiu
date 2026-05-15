import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-[450px] my-12 rounded-sm overflow-hidden bg-white/5">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Service Image'}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-medium mt-16 mb-6 text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-medium mt-12 mb-4 text-white">{children}</h3>,
    normal: ({ children }) => <p className="text-lg leading-relaxed text-white/70 mb-8">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-brand-green pl-8 my-12 italic text-xl text-white/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 space-y-3 text-white/70">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-white/70">{children}</ol>,
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
          className="text-brand-green hover:text-white underline decoration-1 underline-offset-4 transition-colors"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  },
}

export function DarkPortableText({ value }: { value: any }) {
  if (!value) return null
  return <PortableTextComponent value={value} components={components} />
}
