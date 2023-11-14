import { ConnectButton } from '@rainbow-me/rainbowkit'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useAccount, useSwitchNetwork } from 'wagmi'
import Button, { ButtonProps } from '../Button'

export const ConnectWalletButton: React.FC<
  {
    alternativeText?: string
  } & ButtonProps
> = ({ alternativeText, ...props }) => {
  const router = useRouter()
  const { chains, switchNetworkAsync } = useSwitchNetwork()
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        if (!mounted) return null
        if (!account || !chain) {
          return (
            <Button
              varient="brand"
              size="large"
              {...props}
              onClick={openConnectModal}>
              <span className="font-bold ">Connect Wallet</span>
            </Button>
          )
        }
        return (
          <Button
            size="large"
            {...props}
            varient="secondary"
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
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}
