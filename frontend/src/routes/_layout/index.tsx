import { createFileRoute } from "@tanstack/react-router"
import "../../../index.css"
import { Footer } from "../../components/Footer.tsx"
import { Header } from "../../components/header.tsx"
export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})
import { Link } from "@tanstack/react-router"
import {Container} from "../../components/Container.tsx";

export function Stats() {
  const stats = [
    { id: 1, name: "CD Releases", value: "287" },
    { id: 2, name: "Artists and Contributors", value: "1,896" },
    { id: 3, name: "labels and Companies", value: "422" },
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Memphis Rap CDs in HD
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Discover the artists and labels behind four decades of music
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col bg-zinc-900 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-300 cursor-default">
                {stat.name}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white cursor-default">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>


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
        <div className="fixed inset-0 flex justify-center bg-zinc-900">
          <div className="flex w-full max-w-7xl">
            <div className="w-full"/>
          </div>
        </div>
        <div className="relative flex w-full flex-col">
          <Header/>
          <main className="flex-auto pb-16 pt-32">{children}</main>
          <Footer/>
        </div>
      </>
  )
}


function Dashboard() {
  return (
    <>
      <RootLayout>
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-4xl text-zinc-100">
              Discover An Era of Memphis Music
            </h1>

            <p className="mt-6 text-base text-zinc-300">
              This digital Archive includes photos, credits, and notes from over
              200 Memphis rap CD releases spanning four decades. Each release in
              the archive represents a physical copy in the collection and all
              of the photos on this site were created for this project.
            </p>
            <br/>

            <Link
                to="/releases"
                search
                className="inline-flex items-center rounded-md bg-gradient-to-br hover:from-cyan-600 hover:to-cyan-300 from-cyan-700 to-cyan-400 hover:text-black px-3 py-2 text-sm font-semibold text-black shadow-sm mr-4"
            >
              Browse Releases
            </Link>

            <Link
                to="/about"
                search
                className="inline-flex items-center rounded-md border border-cyan-400 hover:border-black hover:bg-gradient-to-br hover:from-cyan-700 hover:to-cyan-400 px-3 py-2 text-sm shadow-sm hover:text-black text-cyan-400"
            >
              Learn more
            </Link>
          </div>
        </Container>

        <div className="mt-16 sm:mt-20">
          <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
            <div
                className="relative aspect-[300/263] w-44 flex-none overflow-hidden sm:w-72 sm:rounded-sm bg-zinc-800 rotate-2">
              <img
                  src={
                    "https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/61cbcd10-a27a-4c98-5304-1415d6e39700/sm"
                  }
                  alt={""}
                  width="300"
                  height="263"
                  className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
                className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 -rotate-2">
              <img
                  src={
                    "https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/aa9d48c5-9ca6-4448-a3a9-a18e28b2a200/sm"
                  }
                  alt={""}
                  width="300"
                  height="263"
                  className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
                className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 rotate-2">
              <img
                  src={
                    "https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/a33ffa1a-4891-4612-9664-a975cea89400/sm"
                  }
                  alt={""}
                  width="300"
                  height="263"
                  className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
                className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 rotate-2">
              <img
                  src={
                    "https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/f28318ee-9355-4bce-07de-4005bd3c8100/sm"
                  }
                  alt={""}
                  width="300"
                  height="263"
                  className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
            <div
                className="relative aspect-[300/263] w-44 flex-none overflow-hidden rounded-sm sm:w-72 sm:rounded-sm bg-zinc-800 -rotate-2">
              <img
                  src={
                    "https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/3687de29-d574-499e-06d1-2bf8fdd6c800/sm"
                  }
                  alt={""}
                  width="300"
                  height="263"
                  className="absolute inset-0 shadow-lg shadow-black h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <Container className="mt-24 md:mt-28 bg-zinc-950 py-8">
          <Stats/>
          <div className="text-center pt-16">
            <Link
                to="/releases"
                search
                className="inline-flex items-center rounded-md bg-gradient-to-br hover:from-cyan-600 hover:to-cyan-300 from-cyan-700 to-cyan-400 hover:text-black px-3 py-2 text-sm font-semibold text-black shadow-sm"
            >
              Browse Releases
            </Link>
          </div>
        </Container>

        <div className="text-center pt-16">
          <a
              href="https://www.instagram.com/memphisraparchive/"
              className="group inline-flex items-center rounded-md bg-gradient-to-br from-zinc-950 from-60% via-black via-60% to-zinc-950 to-90% hover:text-white px-3 py-3 text-sm font-semibold text-slate-400 hover:shadow hover:shadow hover:shadow-black transition-all duration-200"
          >
            <div className="grid">
              <div
                  className="block mx-auto clearfix fill-slate-400 group-hover:fill-white  transition-all duration-200">
                <svg width="40px" height="40px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"/>
                  <path d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"/>
                  <path
                      d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"/>
                </svg>
              </div>
              <div className="block">@MemphisRapArchive
              </div>
            </div>
          </a>
        </div>

      </RootLayout>
    </>
  )
}
