/**
 * node modules
 */
import { SignIn } from "@clerk/clerk-react";

/**
 * components
 */
import { Head } from "@/components/head";

export const LoginPage = () => {
  return (
    <>
      <Head title="Log In to Tasky AI - Manage Your To-Do List and Projects" />

      <section>
        <div className="container flex justify-center">
          <SignIn signUpUrl="/register" />
        </div>
      </section>
    </>
  );
};
