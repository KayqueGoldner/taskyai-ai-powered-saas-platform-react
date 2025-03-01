/**
 * node modules
 */
import { SignUp } from "@clerk/clerk-react";

/**
 * components
 */
import { Head } from "@/components/head";

export const RegisterPage = () => {
  return (
    <>
      <Head title="Create an account - Tasky AI To-Do List & Project Management App" />

      <section>
        <div className="container flex justify-center">
          <SignUp signInUrl="/login" />
        </div>
      </section>
    </>
  );
};
