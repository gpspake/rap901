import {createFileRoute} from '@tanstack/react-router'
import {LabelsService} from "../../client";
import {useQuery} from "@tanstack/react-query";
import {RootLayout} from "./index.tsx";
import {LabelReleasesGrid} from "../../components/LabelReleasesGrid.tsx";

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
    // isPlaceholderData,
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
                    className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                    {label.name}
                  </h1>
                </div>
                <h2
                  className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  Label
                </h2>
                <LabelReleasesGrid releases={label.releases}/>

                <h2
                  className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  Credits
                </h2>
                <LabelReleasesGrid releases={label.credits}/>
                <div>
                  {/*{label.releases*/}
                  {/*  .filter(release => release.entity_type_name && release_link.entity_type.name === "Label")*/}
                  {/*  .map(release_link => {*/}
                  {/*    return (*/}
                  {/*      <p className="text-xs dark:text-zinc-100">*/}
                  {/*        {JSON.stringify(release_link, null, 4)}*/}
                  {/*        <br/><br/>*/}
                  {/*      </p>*/}
                  {/*    )*/}
                  {/*  })*/}
                  {/*}*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  )
}