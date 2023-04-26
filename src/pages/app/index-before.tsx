import { type NextPage } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AppHome: NextPage = () => {
  return (
    <div className="flex gap-2 h-screen items-center justify-center">
    <Link href="/app/demo"><Button>Check out demo component</Button></Link>
  </div>
  );
};

export default AppHome;
