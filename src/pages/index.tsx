import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const signinUrl = "/api/auth/signin?callbackUrl=/app";

  return (
    <>
      <Head>
        <title>luno</title>
        <meta name="description" content="luno" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950">
        <nav className="transparent sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
          <div className="container m-auto flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex">
              <Link href="/" className="flex cursor-pointer items-center">
                <div className="flex cursor-pointer items-center gap-2 text-white">
                  <Image
                    src="/logo-icon.png"
                    alt="luno"
                    width={22}
                    height={22}
                  />
                  <div className="font-bold">luno</div>
                </div>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href={signinUrl}>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href={signinUrl}>
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex items-center justify-center px-4 text-center sm:px-8 ">
          <div className="mt-20 flex max-w-[980px] flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-white md:text-5xl lg:text-6xl lg:leading-[1.1]">
              A better way to [placeholder]
            </h1>
            <p className="max-w-[640px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
              Luno is ultimate tool for building minimum viable products at
              lightning speed.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href={signinUrl}>
                <Button size="lg">Get started</Button>
              </Link>
            </div>
          </div>
        </main>
        <div className="m-auto max-w-5xl px-12 pt-12 2xl:max-w-7xl">
          <Image
            src="/screenshot-app.png"
            alt="luno Tech"
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
