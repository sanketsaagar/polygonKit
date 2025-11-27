import { AvatarProps } from '../../types';

export function Avatar({ address, className = '', size = 40 }: AvatarProps) {
  const generateGradient = (addr: string) => {
    const colors = [
      '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6',
      '#EF4444', '#6366F1', '#14B8A6', '#F97316', '#06B6D4'
    ];

    const index1 = parseInt(addr.slice(2, 4), 16) % colors.length;
    const index2 = parseInt(addr.slice(4, 6), 16) % colors.length;

    return `linear-gradient(135deg, ${colors[index1]}, ${colors[index2]})`;
  };

  const getInitials = (addr: string) => {
    return addr.slice(2, 4).toUpperCase();
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: generateGradient(address),
        fontSize: `${size / 2.5}px`,
      }}
    >
      {getInitials(address)}
    </div>
  );
}
