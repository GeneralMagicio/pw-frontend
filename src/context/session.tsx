import { isLoggedIn, login, logout } from '@/utils/auth'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

interface Session {
  user: string | null
}
const SESSION: Session = {
  user: null,
}
export const SessionContext = React.createContext<Session>(SESSION)

export const useSession = () => {
  return useContext(SessionContext)
}

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session>({
    user: null,
  })
  const router = useRouter()
  const { isConnected } = useAccount()
  const previousIsConnected = useRef<boolean>(false)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    const main = async () => {
      // automatic login when the user connects their wallet
      if (isConnected && previousIsConnected.current === false) {
        previousIsConnected.current = isConnected
        try {
          const isLogged = await isLoggedIn()
          if (isLogged) {
            return setSession({ user: 'SUCCESS' })
          }
          const user = await login(chain!.id, address!, signMessageAsync)
          setSession({ user: 'SUCCESS' })
        } catch {}

        // automatic logout when the user disconnects their wallet
      } else if (!isConnected && previousIsConnected.current === true) {
        await logout()
        setSession({ user: '' })
        previousIsConnected.current = false
        if (router.pathname !== '/') router.push('/')
      }
    }

    main()
  }, [isConnected, address, chain, signMessageAsync, router])

  // redirect logic
  useEffect(() => {
    if (
      isConnected &&
      previousIsConnected.current &&
      session.user &&
      !router.pathname.includes('poll')
    )
      router.push('/poll/1')
    if (!isConnected && router.pathname !== '/') router.push('/')
  }, [isConnected, router, session.user])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
