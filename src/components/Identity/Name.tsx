import { useEnsName } from 'wagmi';
import { NameProps } from '../../types';
import { shortenAddress } from '../../utils/format';
import { mainnet } from 'viem/chains';

export function Name({ address, className = '' }: NameProps) {
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  return (
    <span className={`font-medium ${className}`}>
      {ensName || shortenAddress(address)}
    </span>
  );
}
