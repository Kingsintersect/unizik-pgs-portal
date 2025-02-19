"use client";
import { logout } from '@/app/actions/auth';
import { baseUrl } from '@/config';
import { useAppContext } from '@/contexts/AppContext';
import useToken from '@/hook/useToken';
import { PowerIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ width, color }: { width: number, color: string }) {
  const router = useRouter();
  const { removeToken } = useToken();
  const { removeUser } = useAppContext();

  const handleLogout = async () => {
    const { role } = await logout();
    if (role) {
      removeToken();
      removeUser();
      router.push(`${baseUrl}/auth/signin`);
            router.refresh();
    }
  };

  return (
    <div onClick={handleLogout} className="cursor-pointer">
      <PowerIcon width={width} color={color} />
    </div>
  );
}
