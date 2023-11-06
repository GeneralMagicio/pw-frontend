import { ConnectButton } from '@rainbow-me/rainbowkit'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useAccount, useSwitchNetwork } from 'wagmi'

export const ConnectWalletButton: React.FC<{
  className?: string
  alternativeText?: string
}> = ({ className = 'bg-red', alternativeText }) => {
  const router = useRouter()
  const { chains, switchNetworkAsync } = useSwitchNetwork()
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        if (!mounted) return null
        if (!account || !chain) {
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
              'flex min-w-[120px] items-center justify-center rounded-full border border-black bg-transparent px-4  text-black',
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
                : () => router.push('/galaxy')
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
