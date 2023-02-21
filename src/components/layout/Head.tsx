import NextHead from 'next/head'
import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/config'
interface HeadProps {
  title?: string
  description?: string
}

export function Head({ title, description }: HeadProps) {
  return (
    <NextHead>
      <title>{title ?? SITE_NAME}</title>
      <meta content={description ?? SITE_DESCRIPTION} name="description" />
    </NextHead>
  )
}
