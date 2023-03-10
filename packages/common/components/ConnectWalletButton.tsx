import { useWalletManager } from '@xiti/cosmodal'
import { isMobile } from '@walletconnect/browser-utils'
import clsx from 'clsx'

import { useWalletBalance } from '@dao-dao/state'
import {
  MobileWalletConnect,
  NoMobileWallet,
  WalletConnect,
  WalletConnectProps,
} from '@dao-dao/ui'
import { CHAIN_ID, NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

export interface ConnectWalletButtonProps extends Partial<WalletConnectProps> {
  mobile?: boolean
}

export const ConnectWalletButton = ({
  mobile,
  className,
  ...props
}: ConnectWalletButtonProps) => {
  const {
    connect,
    disconnect,
    isEmbeddedKeplrMobileWeb,
    connected,
    connectedWallet: { name, address } = {},
  } = useWalletManager()
  const { walletBalance } = useWalletBalance()

  if (mobile && isMobile() && CHAIN_ID !== 'athena-3') {
    return <NoMobileWallet />
  }

  return mobile ? (
    <MobileWalletConnect
      className={clsx('w-full', className)}
      connected={connected}
      onConnect={connect}
      onDisconnect={isEmbeddedKeplrMobileWeb ? undefined : disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalance}
      walletBalanceDenom={nativeTokenLabel(NATIVE_DENOM)}
      walletName={name}
      {...props}
    />
  ) : (
    <WalletConnect
      className={className}
      connected={connected}
      onConnect={connect}
      onDisconnect={isEmbeddedKeplrMobileWeb ? undefined : disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalance}
      walletBalanceDenom={nativeTokenLabel(NATIVE_DENOM)}
      walletName={name}
      {...props}
    />
  )
}
