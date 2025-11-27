import { useBalance } from 'wagmi';
import { IdentityProps } from '../../types';
import { Avatar } from './Avatar';
import { Name } from './Name';
import { formatBalance } from '../../utils/format';

export function Identity({
  address,
  className = '',
  showAvatar = true,
  showAddress = true,
  showBalance = false,
}: IdentityProps) {
  const { data: balance } = useBalance({ address });

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showAvatar && <Avatar address={address} />}
      <div className="flex flex-col">
        {showAddress && (
          <div className="flex items-center gap-2">
            <Name address={address} />
          </div>
        )}
        {showBalance && balance && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatBalance(balance.value, 18, 4)} {balance.symbol}
          </div>
        )}
      </div>
    </div>
  );
}
