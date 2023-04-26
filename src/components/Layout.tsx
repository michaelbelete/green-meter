import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plane,
  Loader2Icon,
  ChevronDown,
  LogOutIcon,
  MenuIcon,
  XIcon,
  CarIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { type NextPage } from "next";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

type INavItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

const Layout: NextPage<LayoutProps> = ({ title, children }: LayoutProps) => {
  const router = useRouter();
  const { data: sessionData, status: authStatus } = useSession();

  const [showSidebar, setShowSidebar] = useState(false);

  if (authStatus === "loading") {
    return (
      <div className="flex h-screen animate-pulse  items-center justify-center">
        <Loader2Icon className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  const navList: INavItem[] = [
    {
      name: "Flight",
      icon: <Plane className="mr-2 h-4 w-4" />,
      href: "/app",
    },
    {
      name: "Vehicle",
      icon: <CarIcon className="mr-2 h-4 w-4" />,
      href: "/app/vehicle",
    },
  ];

  return (
    <>
      <Head>
        <title>Green Meter {title && `- ${title}`}</title>
        <meta
          name="description"
          content="Green Meter is a carbon calculator designed to estimate your carbon footprint"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen flex-col bg-opacity-25 bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950 first-line:flex">
        <div className="grid grid-cols-5 xl:grid-cols-6">
          <aside
            className={`absolute top-0 z-10 max-h-screen min-h-screen w-64 border-r border-white bg-slate-900 pb-12 transition-all duration-300 md:relative md:w-fit md:translate-x-0 md:border-none md:bg-transparent ${
              showSidebar ? "translate-x-0" : "translate-x-[-256px]"
            }`}
          >
            <div className="flex justify-end pr-2 pt-2 md:hidden">
              <Button variant="ghost" onClick={() => setShowSidebar(false)}>
                <XIcon />
              </Button>
            </div>
            <div className="flex items-center justify-center px-8 py-6">
              <Link href="/">
                <Image
                  src="/image/logo.png"
                  width="120"
                  height="100"
                  alt="green-meter"
                />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="px-6 py-2">
                <h2 className="mb-2 px-2 py-2 text-lg font-semibold">
                  Estimations
                </h2>
                <div className="w-full space-y-4">
                  {navList.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <Button
                        variant={
                          router.pathname === item.href ? "subtle" : "ghost"
                        }
                        size="sm"
                        className="mb-2 w-full justify-start"
                      >
                        {item.icon}
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-20">
              <Link
                href="https://www.linkedin.com/in/michael-belete-8600a3176/"
                target="_blank"
              >
                <Button variant="link" size="sm" className="mb-2 w-full">
                  &copy; 2023 Michael Belete
                </Button>
              </Link>
            </div>
          </aside>
          <div className="col-span-5 border-l border-l-slate-200 dark:border-l-slate-700 md:col-span-4 xl:col-span-5">
            <div className="h-full px-5 py-6 md:px-8 ">
              <nav className="flex items-center justify-between md:justify-end">
                <Button
                  variant="ghost"
                  className="block p-1 md:hidden"
                  onClick={() => setShowSidebar(true)}
                >
                  <MenuIcon className="h-8 w-8" />
                </Button>
                {sessionData ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex gap-3 py-4">
                        {sessionData.user.image && (
                          <Avatar>
                            <AvatarImage
                              src={sessionData.user.image}
                              alt="profile picture"
                            />
                            <AvatarFallback>
                              {sessionData.user.name}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <p>{sessionData.user.name}</p>
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <button
                          onClick={() => void signOut()}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <LogOutIcon className="w-5" />
                          <p>Sign out</p>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex gap-4">
                    <Link href="/auth/signin">
                      <Button variant="ghost" className="flex gap-3 py-4">
                        <p>Sign in</p>
                      </Button>
                    </Link>

                    <Link href="/auth/signup">
                      <Button variant="default" className="flex gap-3 py-4">
                        <p>Create Account</p>
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
              <section className="mt-4 flex flex-col gap-4">
                {title && (
                  <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
                )}
                {children}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
