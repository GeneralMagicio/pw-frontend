import Image from 'next/image'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/utils/config'

export function Footer() {
  return (
    <footer className="flex h-20 items-center justify-center bg-zinc-900 px-5 text-center text-lg">
      <h4 className="mr-2">
        Made with ❤️ by{' '}
        <a
          className="font-bold"
          href={`https://twitter.com/${SOCIAL_TWITTER}`}
          rel="noreferrer"
          target="_blank">
          General Magic
        </a>
      </h4>{' '}
      <a
        href={`https://github.com/${SOCIAL_GITHUB}`}
        rel="noreferrer"
        target="_blank">
        <FaGithub />
      </a>
    </footer>
  )
}
