"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();

  return (
    <div className="px-8 py-4 space-y-4">
      <div>
        <Button size="sm" title="Back" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
      </div>
    </div>
  );
};

export default Page;
