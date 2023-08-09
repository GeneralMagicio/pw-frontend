import { ConnectButton } from '@rainbow-me/rainbowkit'
import cn from 'classnames'
import { useSwitchNetwork } from 'wagmi'

export const ConnectWalletButton: React.FC<{ className?: string }> = ({
  className = 'bg-red',
}) => {
  const { chains, switchNetworkAsync } = useSwitchNetwork()
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain
        if (!connected) {
          return (
            <button
              className={cn(
                className,
                'min-w-[120px] rounded-full   px-4 py-3'
              )}
              onClick={openConnectModal}>
              <span className="font-bold text-white">Connect Wallet</span>
            </button>
          )
        }
        return (
          <button
            className="min-w-[120px] rounded-full border border-black bg-transparent px-4 py-3 text-black"
            onClick={async () => {
              if (chains[0]?.id !== chain?.id) {
                await switchNetworkAsync?.(chains[0]?.id)
              }
              openAccountModal && openAccountModal()
            }}>
            <span className="font-bold">{account.displayName}</span>
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}
