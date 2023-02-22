import { useEffect, useState } from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { Head } from '@/components/layout/Head'

interface SignInButtonProps {
  onSuccess: (args: { address: string }) => void
  onError: (args: { error: Error }) => void
}

function SignInButton({ onSuccess, onError }: SignInButtonProps) {
  const [state, setState] = useState<{
    loading?: boolean
    nonce?: string
  }>({})

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch('/api/siwe/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }))
    }
  }

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  useEffect(() => {
    fetchNonce()
  }, [])

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  const singIn = async () => {
    try {
      const chainId = chain?.id
      if (!address || !chainId) return

      setState((x) => ({ ...x, loading: true }))
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce,
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // Verify signature
      const verifyRes = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      onSuccess({ address })
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      onError({ error: error as Error })
      fetchNonce()
    }
  }

  return (
    <button
      className="mt-10 w-full rounded-xl bg-indigo-200 p-3 text-lg font-semibold text-indigo-700 transition  duration-300 focus:ring-2 focus:ring-indigo-500 enabled:hover:bg-indigo-300 disabled:opacity-70"
      disabled={!state.nonce || state.loading}
      onClick={singIn}>
      Sign-In with Ethereum
    </button>
  )
}

function Profile() {
  const { isConnected } = useAccount()
  // State added to avoid hydration errors see more: https://nextjs.org/docs/messages/react-hydration-error
  const [isConnectedAccount, setIsConnectedAccounts] = useState<boolean>()
  const [state, setState] = useState<{
    address?: string
    error?: Error
    loading?: boolean
  }>({})

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/siwe/user')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
      } catch (_error) {}
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    if (typeof window !== 'undefined') {
      globalThis.addEventListener('focus', handler)
      return () => globalThis.removeEventListener('focus', handler)
    }
  }, [])

  useEffect(() => {
    setIsConnectedAccounts(isConnected)
  }, [isConnected])

  // // Don't render component in the first render to avoid flash of content
  if (isConnectedAccount === undefined) return null

  if (isConnectedAccount) {
    return (
      <div>
        <div>
          <SignInButton
            onError={({ error }) => setState((x) => ({ ...x, error }))}
            onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
          />
          {state.address && (
            <div className="mt-6">
              <h3 className="text-2xl font-medium">Signed in as</h3>
              <h4>{state.address}</h4>
              <button
                className="mt-4 w-full rounded-xl bg-red-200 p-3 text-lg font-semibold text-red-700 transition  duration-300 focus:ring-2 focus:ring-red-500 enabled:hover:bg-red-300 disabled:opacity-70"
                onClick={async () => {
                  await fetch('/api/logout')
                  setState({})
                }}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mt-8 text-xl font-medium">
        Connect your wallet to Sign-In with Ethereum.
      </h3>
    </div>
  )
}

export default function Siwe() {
  return (
    <>
      <Head
        description="Example on how to use Sign-In with Ethereum."
        title="Sign-In with Ethereum"
      />
      <main className="mx-auto max-w-xl overflow-hidden px-1 text-lg">
        <h1 className="mt-10 text-4xl font-bold">Sign-In with Ethereum</h1>
        <h2 className="mt-2">
          This example shows how to use Sign-In with Ethereum to create user
          sessions based on a wallet conenction.
        </h2>
        <h3>More info:</h3>
        <ul className="mt-2 list-inside list-disc text-xl">
          <li>
            <a
              className="transition duration-200 hover:opacity-60"
              href="https://login.xyz/"
              rel="noreferrer"
              target="_blank">
              SIWE
            </a>
          </li>
          <li>
            <a
              className="transition duration-200 hover:opacity-60"
              href="https://wagmi.sh/examples/sign-in-with-ethereum"
              rel="noreferrer"
              target="_blank">
              Wagmi docs
            </a>
          </li>
        </ul>
        <Profile />
      </main>
    </>
  )
}
