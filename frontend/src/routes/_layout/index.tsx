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

export function Stats() {
  const stats = [
    { id: 1, name: 'CD Releases', value: '226' },
    { id: 2, name: 'Artists and Contributors', value: '1,575' },
    { id: 3, name: 'labels and Companies', value: '352' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Memphis Rap CDs in HD
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Discover the artists and companies behind four decades of music
          </p>
        </div>
        <dl
          className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col bg-white/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-300">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="text-center py-16">
          <Link
            to="/releases"
            search
            className="inline-flex items-center rounded-md bg-gradient-to-br hover:from-cyan-600 hover:to-cyan-300 from-cyan-700 to-cyan-400 hover:text-black px-3 py-2 text-sm font-semibold text-black shadow-sm mr-4">
            Browse Releases
          </Link>
        </div>


      </div>
    </div>
  )
}
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
      <div className="fixed inset-0 flex justify-center bg-gradient-to-br from-black from-20% via-black to-sky-900 ">
        <div className="flex w-full max-w-7xl">
          <div className="w-full"/>
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header/>
        <main className="flex-auto pb-16">{children}</main>
        <Footer/>
      </div>
    </>
  )
}


export const ContainerOuter = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function OuterContainer({className, children, ...props}, ref) {
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-100">
              Memphis Rap Archive
            </h1>

            <p className="mt-6 text-base text-zinc-300">
              This digital Archive includes photos, credits, and notes from over 200 Memphis rap CD releases spanning
              four decades. Each release in the archive represents a physical copy in the collection and all of the photos on this site were created for this project.</p>
            <br/>

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
                className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 -rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/aa9d48c5-9ca6-4448-a3a9-a18e28b2a200/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/a33ffa1a-4891-4612-9664-a975cea89400/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/f28318ee-9355-4bce-07de-4005bd3c8100/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
              className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 -rotate-2">
              <img
                src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/3687de29-d574-499e-06d1-2bf8fdd6c800/sm`}
                alt={""}
                width="300" height="263"
                className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <Container className="mt-24 md:mt-28">
          <Stats/>
        </Container>
      </RootLayout>
    </>
  )
}
