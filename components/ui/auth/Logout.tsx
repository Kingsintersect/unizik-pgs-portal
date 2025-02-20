"use client";
import { logoutAction } from '@/app/actions/auth';
import { useAppContext } from '@/contexts/AppContext';
import { useUser } from '@/contexts/UserContext';
import useToken from '@/hook/useToken';
import { PowerIcon } from 'lucide-react';

export default function LogoutButton({ width, color }: { width: number, color: string }) {
  const { removeToken } = useToken();
  const { logout } = useUser();

  const handleLogout = async () => {
    removeToken();
    logout();
    await logoutAction();
  };
  
  return (
    <div onClick={handleLogout} className="cursor-pointer">
      <PowerIcon width={width} color={color} />
    </div>
  );
}
