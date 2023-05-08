import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const signinUrl = sessionData ? "/app" : "/api/auth/signin?callbackUrl=/app";

  return (
    <>
      <Head>
        <title>Green Meter</title>
        <meta
          name="description"
          content="Green Meter is a carbon calculator designed to estimate your carbon footprint"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950">
        <nav className="sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
          <div className="container m-auto flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex">
              <Link href="/" className="flex cursor-pointer items-center">
                <div className="flex cursor-pointer items-center gap-2 text-white">
                  <Image
                    src="/image/logo-icon.svg"
                    alt="green-meter"
                    width={35}
                    height={35}
                  />
                  <div className="text-lg font-semibold">Green Meter</div>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-5">
              {sessionData ? (
                <>
                  <Link href="/app">
                    <button className="rounded-md bg-white/10 px-7 py-2 font-semibold text-white no-underline transition hover:bg-white/20">
                      {sessionData.user?.name}
                    </button>
                  </Link>
                  <Button variant="ghost" onClick={() => void signOut()}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href={signinUrl}>
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href={signinUrl}>
                    <Button>Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <main className="flex items-center justify-center px-4 text-center sm:px-8 ">
          <div className="mt-20 flex max-w-[980px] flex-col items-center justify-center gap-4 text-center">
            <Image
              src="/image/logo-icon.svg"
              alt="logo"
              width={200}
              height={100}
            />
            <h1 className="text-2xl font-extrabold leading-tight tracking-tighter text-white md:text-4xl lg:text-5xl lg:leading-[1.1]">
              Your partner in fighting climate change
            </h1>
            <p className="max-w-[640px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
              Green Meter is a carbon calculator designed to estimate your
              carbon footprint
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/app">
                <Button size="lg">Get started</Button>
              </Link>
            </div>
          </div>
        </main>
        <div className="m-auto max-w-5xl px-12 pt-12 2xl:max-w-7xl">
          <Image
            src="/app.png"
            alt="Green Meter"
            width={2310}
            height={1118}
            className="rounded-t-3xl border border-slate-700 shadow-2xl shadow-slate-600 2xl:rounded-3xl"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
