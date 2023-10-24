import { AuthenticateWalletModal } from '@/components/AuthenticateWalletModal'
import Modal from '@/components/Modal/Modal'
import { FlowStatus } from '@/types/Flow'
import { isLoggedIn, login, logout } from '@/utils/auth'
import { getFlowStatus } from '@/utils/flow'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

interface Session {
  user: string | null
  flowStatus: FlowStatus
  updateFlowStatus: () => Promise<FlowStatus>
}

const INITIAL_FLOW: FlowStatus = {
  checkpoint: {
    type: 'initial',
    collectionId: 1,
  },
  impact: false,
  expertise: false,
}
const SESSION: Session = {
  user: null,
  flowStatus: INITIAL_FLOW,
  async updateFlowStatus() {return INITIAL_FLOW},
}
export const SessionContext = React.createContext<Session>(SESSION)

export const useSession = () => {
  return useContext(SessionContext)
}

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session>({
    ...SESSION,
    async updateFlowStatus() {
      const status = await getFlowStatus()
      setSession((s) => ({ ...s, flowStatus: status }))
      return status
    },
  })
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const router = useRouter()
  const { isConnected } = useAccount()
  const previousIsConnected = useRef<boolean>(false)
  const previousAddress = useRef<string>()

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen)

  useEffect(() => {
    const main = async () => {
      // automatic login when the user connects their wallet
      if (isConnected && previousIsConnected.current === false) {
        previousIsConnected.current = isConnected
        try {
          const isLogged = await isLoggedIn()
          setIsLoginModalOpen(!Boolean(isLogged))
          if (isLogged) {
            const status = await getFlowStatus()
            return setSession({
              ...session,
              user: 'SUCCESS',
              flowStatus: status,
            })
          }
        } catch {}
      } else if (!isConnected && previousIsConnected.current === true) {
          await logout()
          setSession({ ...session, user: '' })
          previousIsConnected.current = false
          if (router.pathname !== '/') router.push('/')
      }
    }

    main()
  }, [isConnected, address, chain, signMessageAsync, router])

  const handleLogin = useCallback(async () => {
    await login(chain!.id, address!, signMessageAsync)
    const status = await getFlowStatus()
    setSession({ ...session, user: 'SUCCESS', flowStatus: status })
    setIsLoginModalOpen(false)
  }, [address, chain, session, signMessageAsync])
  
  // Login when the user changes their address with the extension (Without disconnecting first)
  useEffect(() => {
    const main = async () => {
      if (previousAddress.current !== undefined && address !== previousAddress.current) {
        await logout()
        setIsLoginModalOpen(true)
      }
    }
    main()

    return () => {
      previousAddress.current = address
    }
  }, [address, handleLogin, router])

  // redirect logic
  useEffect(() => {
    if (!isConnected && !session.user && router.pathname !== '/')
      router.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, session])


  return (
    <SessionContext.Provider value={session}>
      {children}
      <Modal
        className="bg-gray-90"
        closeOnOutsideClick={false}
        isOpen={false}
        onClose={toggleLoginModal}>
        <AuthenticateWalletModal
          handleClose={toggleLoginModal}
          handleLogin={handleLogin}
        />
      </Modal>
    </SessionContext.Provider>
  )
}
