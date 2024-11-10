import {createFileRoute} from '@tanstack/react-router'
import {LabelsService} from "../../client";
import {useQuery} from "@tanstack/react-query";
import {RootLayout} from "./index.tsx";
import {ReleasesGrid} from "../../components/ReleasesGrid.tsx";

export const Route = createFileRoute('/_layout/labels/$slug')({
  component: LabelComponent,
})

function getLabelQueryOptions({slug}: { slug: string }) {
  return {
    queryFn: () =>
      LabelsService.readLabel({slug}),
    queryKey: ["labels", {slug}],
  }
}


function LabelComponent() {
  const {slug} = Route.useParams()
  const {
    data: label,
    isPending,
  } = useQuery({
    ...getLabelQueryOptions({slug}),
    placeholderData: (prevData) => prevData,
  })

  return !isPending && label && (
    <RootLayout>
      <main className="flex-auto">
        <div className="sm:px-8 mt-16 sm:mt-32">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                  <h1
                    className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-100">
                    {label.name}
                  </h1>
                </div>
                {label.releases.length && (
                  <>
                    <h2 className="text-xl font-bold tracking-tight sm:text-xl text-zinc-100 pt-8 pb-4">
                      Label Credits
                    </h2>
                    <ReleasesGrid releases={label.releases.sort((a, b) => a.year - b.year)} columns={5}/>
                  </>
                )}

                {label.credits.length && (
                  <>
                    <h2 className="text-xl font-bold tracking-tight sm:text-xl text-zinc-100 pt-8 pb-4">
                      Album Credits
                    </h2>
                    <ReleasesGrid releases={label.credits.sort((a, b) => a.year - b.year)} columns={5}/>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  )
}