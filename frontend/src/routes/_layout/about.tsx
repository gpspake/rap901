import {createFileRoute} from "@tanstack/react-router"
import "../../../index.css"
import cdStack from "./cd-stack.png"
import tapes from "./tapes.png"
import {RootLayout} from "./index.tsx";
import {Container} from "../../components/Container.tsx";

export const Route = createFileRoute("/_layout/about")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <RootLayout>
      <Container>
        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl text-zinc-100">
          Memphis Rap is Memphis Music
        </h1>

        <div className="grid grid-cols-8 gap-4 pb-16">
          <div className="col-span-8 md:col-span-4 lg:col-span-5 pt-4">
            <p className="mt-6 text-base text-zinc-300">
              Memphis, Tennessee. Home of the blues. The birthplace of rock and roll. <br/>Stax Records.
              Sun Studios. Beale St.<br/>
              Memphis' contributions to music history are known and celebrated worldwide.</p>
            <p className="mt-6 text-base text-zinc-300">
              The story of Memphis music continued in to the early 1990s when another underground local
              music
              began to take hold. Now, after nearly 40 years, Memphis rap's influence
              is well established and has been embraced by a new generation.</p>
            <p className="mt-6 text-base text-zinc-300">
              This digital Archive includes photos, credits, and notes from over Memphis rap CD releases
              spanning
              four decades including original photos of physical copies.</p>
          </div>
        </div>
      </Container>

      <Container className="mt-8 py-8 bg-zinc-950 ">
        <h2 className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100">
          The Importance of Physical Media
        </h2>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-8 md:col-span-4 lg:col-span-5 pt-4">
            <p className="mt-6 text-base text-zinc-300">
              Memphis rap originated and thrived in an era when physical media still ruled.
              Albums came with iconic artwork, photos, credits, and shout outs. The mom & pop sound shops
              and record stores where CDs, tapes, and vinyls were bought and sold became institutions.</p>
            <p className="mt-6 text-base text-zinc-300">
              In the age of streaming, there’s a renewed interest in Memphis rap in a time when it has
              become more accessible than ever before. For long-time fans or those discovering artists and
              classic albums for the first time, physical copies offer a way to understand and connect
              with the music beyond a tiny album cover thumbnail on a phone screen.</p>
            <p className="mt-6 text-base text-zinc-300">
              This archive includes photos, credits, and notes from over 200 Memphis rap CD releases and
              counting
              spanning four decades. Each release in the archive represents a physical copy belonging to
              the archive. Future updates will include HD images of all of the artwork including inserts
              and Discs.</p>

          </div>
          <div className="hidden md:block md:col-span-4 lg:col-span-3">
            <img className="ml-4 xl:-mt-16 lg:-mt-14 mt-0 invisible md:visible" src={cdStack} alt=""/>
          </div>
        </div>

        {/*<div className="border-t border-white/10 pb-4 mt-8"></div>*/}

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
          <div className="hidden sm:block sm:col-span-2 md:col-span-4"><img className="invisible md:visible"
                                                                            src={tapes} alt=""/></div>
          <div className="col-span-8 sm:col-span-6 md:col-span-4">
            <p className="mt-6 text-base text-zinc-300">
              The origins of Memphis rap recordings are can be heard on independently produced and
              distributed cassette tapes. The
              story isn't complete without them. Many classic tapes have never been reissued and are
              exceptionally
              rare. Fortunately there are collective efforts to document and preserve those recordings and
              some lost tapes are
              starting to re-emerge</p>
            <p className="mt-6 text-base text-zinc-300">
              Archiving tapes is challenging for a few reasons. Original cassettes are hard to find and
              easily sell
              for hundreds of dollars for a single tape. Because of their independent production and ease
              of
              bootlegging,
              it’s difficult to verify whether a tape is authentic.</p>
            <p className="mt-6 text-base text-zinc-300">
              Memphis rap started moving to CDs as early as 1991 as the new medium began to supplant
              cassettes.
              Today,
              CDs are much easier to find in for reasonable prices. Because they’re digital and their
              production and distribution are well documented, it’s easier to verify their
              authenticity.</p>
            <br/>
          </div>
        </div>

        <div className="border-t border-white/10 pb-4 mt-4"></div>
      </Container>

      <Container className="mt-9">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100">
            The Content on This Site
          </h2>

          <p className="mt-6 text-base text-zinc-300">
            All the photos and scans are created for this project from
            physical copies that belong to the archive. The majority of the
            data presented on the site comes from the Discogs API.
          </p>

          <p className="mt-6 text-base text-zinc-300">
            Memphis Rap Archive is a fan made project and is not affiliated
            with any of the artists included in the archive.
          </p>
          <br/>
        </div>
      </Container>
    </RootLayout>
  )
}
