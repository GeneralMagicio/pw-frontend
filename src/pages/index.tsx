import { Head } from '@/components/layout/Head'

export default function Home() {
  return (
    <>
      <Head />
      <main>
        <h1 className="mt-10 text-4xl font-bold">Next.js Web3 Starter</h1>
        <h3 className="mt-1 text-lg font-medium">Powered by General Magic</h3>
        <h2 className="mt-6 text-3xl font-semibold">Api functionalities:</h2>
        <ul className="mt-2 list-inside list-disc text-xl">
          <li>Connect to wallet</li>
        </ul>
      </main>
    </>
  )
}
