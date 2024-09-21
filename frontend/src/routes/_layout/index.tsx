import { createFileRoute } from "@tanstack/react-router"
import '../../../index.css'
import {forwardRef} from "react";
import clsx from 'clsx'
import {Header} from "../../components/header.tsx";
import {Footer} from "../../components/Footer.tsx";
export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})
import {Link} from "@tanstack/react-router"

export function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <Layout>{children}</Layout>

    </div>
  )
}

export function Layout({children}: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center">
        <div className="flex w-full max-w-7xl">
        {/*<div className="flex w-full max-w-7xl lg:px-8">*/}
          {/*<div className="w-full ring-1 ring-zinc-100 bg-zinc-900 dark:ring-zinc-300/20" />*/}
          <div className="w-full ring-1 ring-zinc-100 bg-gradient-to-br from-black from-20% via-black to-sky-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto pb-16">{children}</main>
        {/*<Footer />*/}
        <Footer />
      </div>
    </>
  )
}


export const ContainerOuter = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function OuterContainer({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

export const ContainerInner = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function InnerContainer({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

export const Container = forwardRef<
  React.ElementRef<typeof ContainerOuter>,
  React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  )
})

function Dashboard() {
  return (
    <>
      <RootLayout>
        <Container className="mt-9">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Memphis Rap Archive
            </h1>

            <p className="mt-6 text-base text-zinc-300">
              Memphis, Tennessee. Home of the blues. The birthplace of rock and roll. <br/>Stax Records.
              Sun
              Studios.
              Beale St.<br/>
              Memphis' contributions to music history are known and celebrated worldwide.</p>
            <p className="mt-6 text-base text-zinc-300">
              The story of Memphis music continued in to the early 1990s when once again an underground local music
              scene became something much bigger. More than 30 years later, Memphis rap's influence
              is well established and has been embraced by a new generation.</p>
            <p className="mt-6 text-base text-zinc-300">
              This digital Archive includes photos, credits, and notes from over 200 Memphis rap CD releases spanning
              four decades. Each release in the archive represents a physical copy in the collection. <a href="/"
                                                                                                         className="underline"></a></p><br/>

            <Link
              to="/releases"
              search
              className="inline-flex items-center rounded-md bg-gradient-to-br hover:from-cyan-600 hover:to-cyan-300 from-cyan-700 to-cyan-400 hover:text-black px-3 py-2 text-sm font-semibold text-black shadow-sm mr-4">
              Browse Releases
            </Link>

            <Link
              to="/about"
              search
              className="inline-flex items-center rounded-md border border-cyan-400 hover:border-black hover:bg-gradient-to-br hover:from-cyan-700 hover:to-cyan-400 px-3 py-2 text-sm shadow-sm hover:text-black text-cyan-400">
              Learn more
            </Link>
          </div>


        </Container>

        <div className="mt-16 sm:mt-20">
          <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden sm:w-72 sm:rounded-sm bg-zinc-800 rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/61cbcd10-a27a-4c98-5304-1415d6e39700/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm bg-zinc-100 sm:w-72 sm:rounded-sm dark:bg-zinc-800 -rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/aa9d48c5-9ca6-4448-a3a9-a18e28b2a200/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm bg-zinc-100 sm:w-72 sm:rounded-sm dark:bg-zinc-800 rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/a33ffa1a-4891-4612-9664-a975cea89400/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm bg-zinc-100 sm:w-72 sm:rounded-sm dark:bg-zinc-800 rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/f28318ee-9355-4bce-07de-4005bd3c8100/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm bg-zinc-100 sm:w-72 sm:rounded-sm dark:bg-zinc-800 -rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/3687de29-d574-499e-06d1-2bf8fdd6c800/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/*<Photos />*/}
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-16">
              {/*{articles.map((article) => (*/}
              {/*  <Article key={article.slug} article={article} />*/}
              {/*))}*/}
            </div>
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              {/*<Newsletter />*/}
              {/*<Resume />*/}
            </div>
          </div>
        </Container>
      </RootLayout>
    </>
  )
}
