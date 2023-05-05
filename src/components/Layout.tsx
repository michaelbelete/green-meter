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
        <div className="grid grid-cols-6 md:grid-cols-5 xl:grid-cols-7">
          <aside
            className={`absolute top-0 z-10 flex  max-h-screen min-h-screen w-64 flex-col items-center border-r border-white bg-slate-900 pb-12 transition-all duration-300 md:relative md:w-full md:translate-x-0 md:border-none md:bg-transparent ${
              showSidebar ? "translate-x-0" : "translate-x-[-256px]"
            }`}
          >
            <div className="absolute right-3 top-2 md:hidden">
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => setShowSidebar(false)}
              >
                <XIcon className="h-auto w-8" />
              </Button>
            </div>
            <div className="flex items-center justify-center px-8 py-6">
              <Link href="/app">
                <Image
                  src="/image/logo-icon.png"
                  width="120"
                  height="100"
                  alt="green-meter"
                />
              </Link>
            </div>
            <div className="w-full px-3">
              {navList.map((item) => (
                <Link href={item.href} key={item.name}>
                  <Button
                    variant={router.pathname === item.href ? "subtle" : "ghost"}
                    size="sm"
                    className="mb-2 w-full justify-start"
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </aside>
          <div className="col-span-6 border-l border-l-slate-200 dark:border-l-slate-700 md:col-span-4 xl:col-span-6">
            <div className="h-full px-5 py-6 md:px-8 ">
              <nav className="flex items-center justify-between md:justify-end">
                <Button
                  variant="ghost"
                  className="block p-0 md:hidden"
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
                  <div className="flex items-center gap-4">
                    <Link href="/api/auth/signin?callbackUrl=/app">
                      <Button variant="ghost" className="flex gap-3 py-4">
                        <p>Sign in</p>
                      </Button>
                    </Link>

                    <Link href="/api/auth/signin?callbackUrl=/app">
                      <Button variant="default" className="flex gap-3 py-4">
                        <p>Create Account</p>
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
              <section className="mt-6 flex flex-col gap-4 md:mt-4">
                {title && (
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {title}
                  </h3>
                )}
                {children}
              </section>
              <div className="pt-8">
                <Link
                  href="https://www.linkedin.com/in/michael-belete-8600a3176/"
                  target="_blank"
                >
                  <Button variant="link" size="sm" className="mb-2 w-full">
                    &copy; 2023 Michael Belete
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
