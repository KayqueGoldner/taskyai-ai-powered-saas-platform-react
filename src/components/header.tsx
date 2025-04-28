/**
 * node modules
 */
import { Link, useLocation } from "react-router";

/**
 * components
 */
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed left-0 top-0 z-40 w-full p-4">
      <div className="container flex h-16 items-center justify-between rounded-xl border backdrop-blur-3xl">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          {location.pathname !== "/login" && (
            <Button variant="ghost" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          )}

          {location.pathname !== "/register" && (
            <Button asChild>
              <Link to="/register">Start for free</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
