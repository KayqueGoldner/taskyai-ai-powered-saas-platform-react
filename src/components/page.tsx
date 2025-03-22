/**
 * types
 */
import type { PropsWithChildren } from "react";

const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="container md:max-w-screen-md">{children}</div>;
};

const PageHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="space-y-2 pb-3 pt-2 md:px-4 lg:px-10">{children}</div>;
};

const PageTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-2xl font-semibold">{children}</h1>;
};

const PageList: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="pb-20 pt-2 md:px-4 lg:px-10">{children}</div>;
};

export { Page, PageHeader, PageTitle, PageList };
