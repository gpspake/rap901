import { createFileRoute } from "@tanstack/react-router"
import '../../../index.css'
import {forwardRef} from "react";
import clsx from 'clsx'
import {Header} from "../../components/header.tsx";
export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})
import {Link} from "@tanstack/react-router"

export function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
    <body className="flex h-full bg-black min-h-screen">
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <div className="flex w-full">
      <Layout>{children}</Layout>
    </div>
    </body>
    </html>
  )
}

export function Layout({children}: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        {/*<Footer />*/}
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
          <Link
            to="/releases"
            search
            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
              Browse Releases
          </Link>
        </div>
      </Container>
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
