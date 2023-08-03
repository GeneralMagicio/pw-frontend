import { useState } from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { Head } from '@/components/layout/Head'
import { isLoggedIn, login, logout } from '@/utils/auth'

function SignInButton() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  const checkLoggedIn = async () => {
    isLoggedIn()
  }

  const signout = async () => {
    logout()
  }

  const singIn = async () => {
    if (chain?.id && address)
      login(chain?.id, address, signMessageAsync)
  }

  return (
    <div>
      <button
        className="mt-10 w-full rounded-xl bg-indigo-200 p-3 text-lg font-semibold text-indigo-700 transition  duration-300 focus:ring-2 focus:ring-indigo-500 enabled:hover:bg-indigo-300 disabled:opacity-70"
        onClick={singIn}>
        Sign-In with Ethereum
      </button>
      <button
        className="mt-10 w-full rounded-xl bg-indigo-200 p-3 text-lg font-semibold text-indigo-700 transition  duration-300 focus:ring-2 focus:ring-indigo-500 enabled:hover:bg-indigo-300 disabled:opacity-70"
        onClick={checkLoggedIn}>
        Check login status
      </button>
      <button
        className="mt-10 w-full rounded-xl bg-indigo-200 p-3 text-lg font-semibold text-indigo-700 transition  duration-300 focus:ring-2 focus:ring-indigo-500 enabled:hover:bg-indigo-300 disabled:opacity-70"
        onClick={signout}>
        Log out
      </button>
    </div>
  )
}

function Profile() {
  const [state, setState] = useState<{
    address?: string
    error?: Error
    loading?: boolean
  }>({})

    return (
      <div>
        <div>
          <SignInButton/>
          {state.address && (
            <div className="mt-6">
              <h3 className="text-2xl font-medium">Signed in as</h3>
              <h4>{state.address}</h4>
            </div>
          )}
        </div>
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
        <Profile />
      </main>
    </>
  )
}
