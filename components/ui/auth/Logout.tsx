"use client";
import { logout } from '@/app/actions/auth';
import { baseUrl } from '@/config';
import { useAppContext } from '@/contexts/AppContext';
import useToken from '@/hook/useToken';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ width, color }: { width: number, color: string }) {
  const router = useRouter();
  const { removeToken } = useToken();
  const { removeStudent } = useAppContext();

  const handleLogout = async () => {
    const { role } = await logout();
    if (role) {
      removeToken();
      removeStudent();
      router.push(`${baseUrl}/auth/${role}`);
            router.refresh();
    }
  };

  return (
    <div onClick={handleLogout} className="cursor-pointer">
      <PowerIcon width={width} color={color} />
    </div>
  );
}
