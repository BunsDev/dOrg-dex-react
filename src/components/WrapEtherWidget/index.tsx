import React, { useMemo } from 'react'
import { WraptorComponent } from '@w3stside/wraptor'
import { useWalletConnection } from 'hooks/useWalletConnection'

import { tokenListApi } from 'api'
import { Network } from 'types'

const WrapEther: React.FC = () => {
  const { userAddress, networkId, web3 } = useWalletConnection()

  const contractAddress = useMemo(() => {
    const fallBackNetworkId = networkId ? networkId : Network.Mainnet // fallback to mainnet
    const tokens = tokenListApi.getTokens(fallBackNetworkId)

    return tokens.find(token => token.symbol === 'WETH')?.address
  }, [networkId])

  return web3 && userAddress && networkId && contractAddress ? (
    <WraptorComponent
      type="ETH"
      provider={web3}
      contractAddress={contractAddress}
      userAddress={userAddress}
      tokenDisplay={{
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
      }}
      header={(): JSX.Element => <code>WETH Wrapper & Unwrapper</code>}
    />
  ) : null
}

export default WrapEther