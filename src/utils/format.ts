import { Address } from 'viem';

export function shortenAddress(address: Address, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}

export function formatBalance(balance: bigint, decimals = 18, displayDecimals = 4): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = balance / divisor;
  const fractionalPart = balance % divisor;

  const fractionalString = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalString.substring(0, displayDecimals);

  return `${integerPart}.${trimmedFractional}`;
}

export function parseTokenAmount(amount: string, decimals = 18): bigint {
  const [integer, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').substring(0, decimals);
  const combinedString = integer + paddedFraction;

  return BigInt(combinedString);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
