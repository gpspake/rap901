"use client"

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react"
import { Link, useRouterState } from "@tanstack/react-router"
import clsx from "clsx"
import { useEffect, useRef } from "react"
import { Container } from "./Container.tsx"

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavItem({
  href,
  children,
  isActive,
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        to={href}
        className={clsx(
          "relative block py-2 transition",
          isActive ? "text-teal-400" : "hover:text-teal-500",
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0" />
        )}
      </Link>
    </li>
  )
}

function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>,
) {
  const router = useRouterState()

  const isActive = (matchPath: string): boolean => {
    if (matchPath === "/") {
      return router.location.pathname === "/"
    }
    return router.location.pathname.includes(matchPath)
  }

  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full px-4 py-2 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10 hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-400" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 backdrop-blur-sm duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in bg-black/80"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl p-8 ring-1 ring-zinc-900/5 duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in bg-zinc-900 dark:ring-zinc-800"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton aria-label="Close menu" className="-m-1 p-1">
            <CloseIcon className="h-6 w-6 text-zinc-400" />
          </PopoverButton>
          <h2 className="text-sm font-medium text-zinc-400">Navigation</h2>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 divide-y text-base divide-zinc-100/5 text-zinc-300">
            <MobileNavItem isActive={isActive("/")} href="/">
              Home
            </MobileNavItem>
            <MobileNavItem isActive={isActive("/releases")} href="/releases">
              Releases
            </MobileNavItem>
            <MobileNavItem isActive={isActive("/about")} href="/about">
              About
            </MobileNavItem>
            {/*<MobileNavItem href="/speaking">Speaking</MobileNavItem>*/}
            {/*<MobileNavItem href="/uses">Uses</MobileNavItem>*/}
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

function NavItem({
  href,
  children,
  isActive,
}: {
  href: string
  children: React.ReactNode
  isActive: boolean
}) {
  return (
    <li>
      <Link
        to={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive ? "text-teal-400" : "hover:text-teal-500",
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0" />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
  const router = useRouterState()

  const isActive = (matchPath: string): boolean => {
    if (matchPath === "/") {
      return router.location.pathname === "/"
    }
    return router.location.pathname.includes(matchPath)
  }

  return (
    <nav {...props}>
      <ul className="flex rounded px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-900/90 text-zinc-200 ring-white/10">
        <NavItem isActive={isActive("/")} href="/">
          Home
        </NavItem>
        <NavItem isActive={isActive("/releases")} href="/releases">
          Releases
        </NavItem>
        <NavItem isActive={isActive("/about")} href="/about">
          About
        </NavItem>
        {/*<NavItem isActive={isActive("/speaking")} href="/speaking">Speaking</NavItem>*/}
        {/*<NavItem isActive={isActive("/uses")} href="/uses">Uses</NavItem>*/}
      </ul>
    </nav>
  )
}

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

export function Header() {
  const headerRef = useRef<React.ElementRef<"div">>(null)
  const avatarRef = useRef<React.ElementRef<"div">>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.current) {
        setProperty("--header-position", "sticky")
      }

      setProperty("--content-offset", `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`)
        setProperty("--header-mb", `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty("--header-height", `${offset}px`)
        setProperty("--header-mb", `${height - offset}px`)
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`)
        setProperty("--header-mb", `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed")
        removeProperty("--header-top")
        removeProperty("--avatar-top")
      } else {
        removeProperty("--header-inner-position")
        setProperty("--header-top", "0px")
        setProperty("--avatar-top", "0px")
      }
    }

    function updateStyles() {
      updateHeaderStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener("scroll", updateStyles, { passive: true })
    window.addEventListener("resize", updateStyles)

    return () => {
      window.removeEventListener("scroll", updateStyles)
      window.removeEventListener("resize", updateStyles)
    }
  }, [])

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1"></div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">{/*<ThemeToggle/>*/}</div>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  )
}
