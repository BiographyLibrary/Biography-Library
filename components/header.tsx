'use client';

import { Bell, ChevronDown, LogOut, Shield } from 'lucide-react';
import { useAuth, ADMIN_ROLES } from '@/lib/auth-context';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { useTheme } from 'next-themes';
import { LanguageSelector } from '@/components/language-selector';
import { FontSizeControl } from '@/components/accessibility/font-size-control';
import { Logo } from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const { user, role, signOut, fontSize, setFontSize } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const isEditorPage = pathname?.includes('/biography/') && pathname?.includes('/edit');
  const isDashboardPage = pathname === '/dashboard';
  const isDark = mounted && resolvedTheme === 'dark';
  const showAdminLink = user && role && ADMIN_ROLES.includes(role);

  return (
    <header className="border-b border-border bg-[#ECE9E4] dark:bg-[#1F2121] sticky top-0 z-50">
      <div className={cn(
        "h-16 flex items-center justify-between",
        (isEditorPage || isDashboardPage) ? "px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      )}>
        <Link href="/" className="flex items-center">
          <Logo height={48} />
        </Link>

        <div className="flex items-center gap-1">
          {showAdminLink && (
            <Link
              href="/admin"
              className={cn(
                'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                pathname === '/admin'
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              <Shield className="h-3.5 w-3.5" />
              {t.nav.admin}
            </Link>
          )}

          {user && (
            <div className="hidden md:flex items-center mr-1">
              <FontSizeControl
                currentSize={fontSize}
                onSizeChange={setFontSize}
                userId={user.id}
              />
            </div>
          )}

          <LanguageSelector />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 h-9 px-2.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <span className="hidden sm:block max-w-[120px] truncate">
                    {user.user_metadata?.name || user.email}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-normal py-2.5 px-3">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user.user_metadata?.name || user.email}
                  </p>
                  {user.user_metadata?.name && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
                  )}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <div
                  className="flex items-center justify-between px-3 py-2 cursor-pointer select-none hover:bg-accent rounded-sm mx-1"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                >
                  <span className="text-sm">{t.nav.darkMode}</span>
                  <Switch
                    checked={isDark}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    onClick={(e) => e.stopPropagation()}
                    className="pointer-events-none"
                  />
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/notifications" className="flex items-center gap-2 cursor-pointer">
                    <Bell className="h-4 w-4" />
                    <span>{t.nav.notifications}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t.nav.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
