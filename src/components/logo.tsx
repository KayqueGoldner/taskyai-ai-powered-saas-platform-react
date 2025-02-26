/**
 * assets
 */
import { logo } from "@/assets";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 text-lg font-semibold">
      <img src={logo} alt="Tasky AI logo" className="size-6" />
      Tasky AI
    </div>
  );
};
