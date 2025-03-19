/**
 * components
 */
import { Head } from "@/components/head";
import { TopAppBar } from "@/components/top-app-bar";

export const InboxPage = () => {
  return (
    <>
      <Head title="Inbox - Tasky AI" />

      <TopAppBar title="Inbox" taskCount={20} />
    </>
  );
};
