import { IoSearch } from "react-icons/io5"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce.ts"
import { Route } from "../../routes/_layout/releases.tsx"

interface ReleasesSearchInputProps {
  setSearchQuery: (query: string) => void
}

export const ReleasesSearchInput = ({ setSearchQuery }: ReleasesSearchInputProps) => {
  const { q } = Route.useSearch()
  const [value, setValue] = useState<string>(q || "")

  const debouncedSearch = useDebounce(value, 500)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (q !== value) {
      setValue(q || "")
    }
  }, [q])

  useEffect(() => {
    setSearchQuery(debouncedSearch || "")
  }, [debouncedSearch])

  return (
    <div className="grid sm:mt-0 grid-cols-1 mt-4">
      <input
        type="text"
        name="search-releases-input"
        id="search-releases-input"
        className="col-start-1 row-start-1 block w-full rounded-full bg-zinc-800 py-1.5 pl-10 pr-3 text-base text-gray-300 outline outline-1 -outline-offset-1 outline-zinc-950 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
        placeholder="search releases"
        value={value}
        onChange={handleSearchChange}
      />
      <IoSearch className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"/>
    </div>
  )
}
