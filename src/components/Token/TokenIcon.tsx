import { TokenIconProps } from '../../types';

export function TokenIcon({ symbol, size = 24, className = '' }: TokenIconProps) {
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {symbol ? symbol.charAt(0).toUpperCase() : '?'}
    </div>
  );
}
