/**
 * node modules
 */
import { Outlet, useNavigation } from "react-router";

/**
 * components
 */
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/**
 * assets
 */
import { logo } from "@/assets";
import { Loader2 } from "lucide-react";

export const RootLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <div className="relative isolate flex min-h-dvh flex-col overflow-hidden">
        <Header />

        <main className="grid grow grid-cols-1 items-center pb-16 pt-36">
          <Outlet />
        </main>

        <Footer />

        {/* background shapes */}
        <div className="absolute left-0 top-20 h-10 w-80 origin-top-left rotate-45 bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-10 w-80 origin-top-right -rotate-45 bg-primary/20 blur-3xl" />

        {/* loader */}
        {isLoading && (
          <div className="fixed left-0 top-0 z-50 flex h-dvh w-full flex-col items-center justify-center gap-5 bg-background">
            <img src={logo} width={64} height={64} alt="Tasky AI logo" />

            <Loader2 className="size-10 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    </>
  );
};
