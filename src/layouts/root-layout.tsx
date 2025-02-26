/**
 * node modules
 */
import { Outlet } from "react-router";

/**
 * components
 */
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const RootLayout = () => {
  return (
    <>
      <div className="flex min-h-dvh flex-col overflow-hidden">
        <Header />

        <main className="grid grow grid-cols-1 items-center pb-16 pt-36">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};
