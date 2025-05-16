import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { H5 } from "@/components/ui/typography";

const Header = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <header className="flex items-center ps-2 pe-4 py-2 border-b">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-2" />
      <Link href="/activities">
        <H5>Real-time Leaderboard</H5>
      </Link>
      <div className="ms-auto">
        <UserButton
          appearance={{
            elements: {
              userButtonOuterIdentifier: `${
                theme === "light" || systemTheme === "light"
                  ? ""
                  : "!text-white"
              }`,
            },
          }}
          showName
        />
      </div>
    </header>
  );
};

export default Header;
