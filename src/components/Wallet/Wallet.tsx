import { WalletProps } from '../../types';

export function Wallet({ children, className = '' }: WalletProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {children}
    </div>
  );
}
