import { createFileRoute } from "@tanstack/react-router"
import '../../../index.css'
import {forwardRef} from "react";
import clsx from 'clsx'
import {Header} from "../../components/header.tsx";
import {Footer} from "../../components/Footer.tsx";
import tapes from './tapes.png';
import cdStack from './cd-stack.png';
export const Route = createFileRoute("/_layout/about")({
  component: Dashboard,
})

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

    <RootLayout>
      <div className="px-4">
        <Container className="mt-9">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Memphis Rap is Memphis Music
          </h1>

          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-6 md:col-span-4 lg:col-span-5 pt-4">
              <p className="mt-6 text-base text-zinc-300">
                Memphis rap originated and thrived in an era when physical media was as much of a part the music
                experience as the music itself. Albums came with iconic artwork, photos, credits, and shout outs. The
                mom
                and pop’s and record stores where CDs, tapes, and vinyls were bought and sold became institutions.</p>
              <p className="mt-6 text-base text-zinc-300">
                In the age of streaming, there’s more access to music and more interest in Memphis rap than ever. For
                long-time fans or those discovering artists and classic albums for the first time, physical copies offer
                a
                way to understand and connect with the music.</p>
              <p className="mt-6 text-base text-zinc-300">
                This archive currently includes photos, credits, and notes from over 200 Memphis rap CD releases
                spanning
                four decades. Each release in the archive represents a physical copy belonging to the archive.</p>

            </div>
            <div className="col-span-2 md:col-span-4 lg:col-span-3">
              <img className="ml-4 xl:-mt-16 lg:-mt-14 mt-0 invisible md:visible" src={cdStack} alt=""/>
            </div>
          </div>

          <div className="border-t border-white/10 pb-4 mt-8"></div>

        </Container>

        <Container className="mt-9">
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-2 md:col-span-4"></div>
            <div className="col-span-8 sm:col-span-6 md:col-span-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100">
                Why CDs? Where Are The Tapes?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4">
            <div className="hidden sm:block sm:col-span-2 md:col-span-4"><img className="invisible md:visible" src={tapes} alt=""/></div>
            <div className="col-span-8 sm:col-span-6 md:col-span-4">
              <p className="mt-6 text-base text-zinc-300">
                The origins of Memphis rap recordings are independently produced and distributed cassette tapes. The
                story isn't complete without them. Many classic tapes have never been reissued and are exceptionally
                rare. Fortunately there are collective efforts to document and preserve those recordings and some are
                starting to re-emerge</p>
              <p className="mt-6 text-base text-zinc-300">
                Archiving tapes is challenging for a few reasons. Original cassettes are hard to find and easily sell
                for hundreds of dollars for a single tape. Because of their independent production and ease of
                bootlegging,
                it’s difficult to verify whether a tape is authentic.</p>
              <p className="mt-6 text-base text-zinc-300">
                Memphis rap started moving to CDs as early as 1991 as the new medium began to supplant cassettes.
                Today,
                CDs are much easier to find in secondary for reasonable prices. Because they’re digital and their
                production and distribution are well documented, it’s much easier to verify their authenticity.</p>
              <br/>
            </div>

          </div>

          <div className="border-t border-white/10 pb-4 mt-4"></div>
        </Container>

        <Container className="mt-9">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100">
              The Content on This Site
            </h2>

            <p className="mt-6 text-base text-zinc-300">
              All the photos and scans are created for this project from physical copies that belong to the archive. The
              majority of the data presented on the site comes from the Discogs API.</p>

            <p className="mt-6 text-base text-zinc-300">
              Memphis Rap Archive is a fan made project and is not affiliated with any of the artists included in the
              archive.</p><br/>
          </div>
        </Container>
      </div>
    </RootLayout>

  )
}
