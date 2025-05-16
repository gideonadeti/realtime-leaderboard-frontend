import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { H5 } from "@/components/ui/typography";

const Header = () => {
  return (
    <header className="flex items-center ps-2 pe-4 py-2 border-b sticky top-0 z-10 bg-white">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-2" />
      <Link href="/activities">
        <H5>Real-time Leaderboard</H5>
      </Link>
      <div className="ms-auto">
        <UserButton showName />
      </div>
    </header>
  );
};

export default Header;
