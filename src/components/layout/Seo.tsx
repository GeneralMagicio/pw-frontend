import React from 'react'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_TWITTER,
} from '@/utils/config'
import { DefaultSeo } from 'next-seo'

export function Seo() {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : SITE_URL

  return (
    <DefaultSeo
      defaultOpenGraphImageHeight={630}
      defaultOpenGraphImageWidth={1200}
      defaultTitle={SITE_NAME}
      description={SITE_DESCRIPTION}
      openGraph={{
        type: 'website',
        siteName: SITE_NAME,
        url: origin,
        images: [
          {
            url: `${origin}/og.png`,
            alt: `${SITE_NAME} Open Graph Image`,
          },
        ],
      }}
      title={SITE_NAME}
      titleTemplate={`%s | ${SITE_NAME}`}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: 'summary_large_image',
      }}
    />
  )
}
