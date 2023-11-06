import { ConnectButton } from '@rainbow-me/rainbowkit'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useSwitchNetwork } from 'wagmi'

export const ConnectWalletButton: React.FC<{
  className?: string
  alternativeText?: string
}> = ({ className = 'bg-red', alternativeText }) => {
  const router = useRouter()
  const { chains, switchNetworkAsync } = useSwitchNetwork()
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain
        if (!connected) {
          return (
            <button
              className={cn(className, 'min-w-[120px] rounded-full  px-4 ')}
              onClick={openConnectModal}>
              <span className="font-bold text-white">Connect Wallet</span>
            </button>
          )
        }
        return (
          <button
            className={cn(
              'min-w-[120px] flex items-center justify-center rounded-full border border-black bg-transparent px-4  text-black',
              className
            )}
            onClick={
              !alternativeText
                ? async () => {
                    if (chains[0]?.id !== chain?.id) {
                      await switchNetworkAsync?.(chains[0]?.id)
                    }
                    openAccountModal && openAccountModal()
                  }
                : () => router.push('/galaxy?welcome=yes')
            }>
            <span className="font-bold">
              {alternativeText || account.displayName}
            </span>
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}
