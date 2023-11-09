import { useNetwork, useSwitchNetwork } from 'wagmi'

import { Close } from '@/components/Icon/Close'
import { ColoredGrid } from '../Icon/ColoredGrid'
import { SadSun } from '../Icon/SadSun'
import { useRouter } from 'next/router'

interface AuthenticateWalletModalProps {
  handleClose: () => void
  handleLogin: () => Promise<unknown>
}
export const AuthenticateWalletModal: React.FC<
  AuthenticateWalletModalProps
> = ({ handleClose, handleLogin }) => {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const wrongChain = chain?.id !== 10 // Optimism

  const handleClick = () => {
    if (wrongChain) {
      switchNetwork?.(10)
    } else {
      handleLogin()
    }
  }

  return (
    <>
      <div className="relative flex flex-col gap-6 font-IBM">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="relative flex h-[220px] w-[340px] items-center justify-center">
            <ColoredGrid className="absolute inset-0 text-black" />
            <SadSun height={225} width={240} />
          </div>
          <h3 className="text-lg font-bold">Authenticate wallet</h3>
          <p className="text-sm">
            Please sign the login message with your wallet to continue.
          </p>
          <button
            className={'min-w-[120px] rounded-full bg-red px-4 py-2 text-white'}
            onClick={handleClick}>
            {wrongChain
              ? 'Wrong chain, connect to Optimism'
              : 'Authenticate wallet'}
          </button>
        </div>
      </div>
    </>
  )
}
