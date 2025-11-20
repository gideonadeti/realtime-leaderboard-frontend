import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { H5 } from "@/components/ui/typography";

const Header = () => {
  return (
    <header className="flex items-center ps-2 pe-4 py-2 border-b sticky top-0 bg-background z-50">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-2 !h-8" />
      <Link href="/game-count">
        <H5>Real-time Leaderboard</H5>
      </Link>
    </header>
  );
};

export default Header;
