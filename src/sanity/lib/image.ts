import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

/**
 * Build a Sanity image URL with automatic format detection.
 * Chain .width() and .quality() for size optimization:
 * 
 *   urlForImage(src).width(800).quality(75).url()
 */
export const urlForImage = (source: any) => {
  // Safety check to prevent "Malformed asset _ref" errors
  // A valid Sanity asset ref must exist and start with "image-"
  const assetRef = source?.asset?._ref || source?._ref || source?.asset?._id || source?._id;
  const isValidAsset = typeof assetRef === 'string' && assetRef.startsWith('image-');

  if (!isValidAsset) {
    // Return a dummy builder-like object to prevent chaining errors
    return {
      width: () => ({
        quality: () => ({
          url: () => null
        }),
        url: () => null
      }),
      quality: () => ({
        width: () => ({
          url: () => null
        }),
        url: () => null
      }),
      auto: () => ({
        fit: () => ({
          url: () => null
        })
      }),
      url: () => null
    } as any;
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

/**
 * Generate a tiny LQIP (Low Quality Image Placeholder) URL.
 * Returns a 20px-wide blurred image suitable for next/image's blurDataURL.
 * Falls back to undefined if the source has an embedded LQIP from Sanity metadata.
 */
export const getLqipUrl = (source: any): string | undefined => {
  if (source?.asset?.metadata?.lqip) {
    return source.asset.metadata.lqip
  }
  
  try {
    const assetRef = source?.asset?._ref || source?._ref || source?.asset?._id || source?._id;
    if (typeof assetRef !== 'string' || !assetRef.startsWith('image-')) return undefined;
    
    return imageBuilder?.image(source).width(20).quality(20).blur(50).auto('format').fit('max').url()
  } catch {
    return undefined
  }
}
