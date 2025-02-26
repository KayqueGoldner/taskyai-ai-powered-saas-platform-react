/**
 * node modules
 */
import { Helmet } from "react-helmet";

/**
 * types
 */
type HeadProps = {
  title: string;
};

export const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
