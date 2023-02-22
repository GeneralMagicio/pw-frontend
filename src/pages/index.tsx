import { Head } from '@/components/layout/Head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head />
      <main>
        <h1 className="mt-10 text-4xl font-bold">Next.js Web3 Starter</h1>
        <h3 className="mt-1 text-lg font-medium">Powered by General Magic</h3>
        <h2 className="mt-6 text-3xl font-semibold">Examples:</h2>
        <ul className="mt-2 list-inside list-disc text-xl">
          {items.map(({ title, url }) => (
            <li
              className="transition duration-200 hover:opacity-60"
              key={title}>
              <Link href={url}>{title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

const items = [
  {
    title: 'Send Transaction',
    url: '/examples/send-transaction',
  },
  {
    title: 'Contract Write',
    url: '/examples/contract-write',
  },
  {
    title: 'Sign-In with Ethereum',
    url: '/examples/siwe',
  },
]
