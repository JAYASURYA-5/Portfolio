import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Lock, LogOut } from 'lucide-react';
import AdminLogin from './AdminLogin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function AdminButton() {
  const { isAdmin, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (isAdmin) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-primary/50 hover:border-primary hover:bg-primary/10 text-primary"
          >
            <Lock className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
          <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">
            ADMIN MODE
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowLogin(true)}
        variant="outline"
        size="sm"
        className="border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10 text-amber-500"
      >
        <Lock className="h-4 w-4 mr-2" />
        Dev
      </Button>

      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
    </>
  );
}
