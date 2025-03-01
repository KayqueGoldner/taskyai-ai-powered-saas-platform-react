/**
 * node modules
 */
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export const AuthSyncPage = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    // redirect to home page if user is not signed in
    if (!isSignedIn) {
      if (localStorage.getItem("clerkUserId")) {
        localStorage.removeItem("clerkUserId");
      }

      navigate("/");
      return;
    }

    // set the userId in localStorage and redirect to the Today page if user is signed in
    if (isSignedIn) {
      localStorage.setItem("clerkUserId", userId);
      navigate("/app/today");
      return;
    }
  }, [isLoaded, isSignedIn, userId]);

  return <></>;
};
