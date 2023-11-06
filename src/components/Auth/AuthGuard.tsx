import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { isLoggedIn, login, logout } from '@/utils/auth'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

import { AuthenticateWalletModal } from '@/components/Auth/AuthenticateWalletModal'
import Modal from '@/components/Modal/Modal'
import { useRouter } from 'next/router'

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const { pathname, replace } = useRouter()

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLogin = useCallback(async () => {
    try {
      await login(chain!.id, address!, signMessageAsync)
      setIsLoginModalOpen(false)
      window.location.reload()
    } catch (e) {
      console.error(e)
    }
  }, [address, chain, signMessageAsync])

  useEffect(() => {
    // Logout on address change
    if (!address || address === window.localStorage.getItem('loggedInAddress'))
      return
    ;(async () => {
      await logout()
      setIsLoginModalOpen(true)
    })()
  }, [address])

  useEffect(() => {
    // Redirect to homepage if not logged in
    if (!address && pathname !== '/') {
      replace('/')
    }
  }, [address, pathname, replace])

  return (
    <>
      {children}
      <Modal
        className="bg-gray-90"
        closeOnOutsideClick={false}
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}>
        <AuthenticateWalletModal
          handleClose={() => setIsLoginModalOpen(false)}
          handleLogin={handleLogin}
        />
      </Modal>
    </>
  )
}
