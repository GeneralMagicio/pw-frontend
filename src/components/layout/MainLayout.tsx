import { ReactNode } from 'react'
import { Header } from './Header'
import cn from 'classnames'

interface MainLayoutProps {
  children: ReactNode
  className: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <>
      <div
        className={cn(
          className,
          'main-layout flex min-h-screen shrink-0 flex-col  bg-cover bg-no-repeat font-IBM text-white'
        )}>
        <Header />
        <div className="absolute z-50 mt-[60px] flex min-h-screen w-full items-center justify-center bg-white text-black lg:hidden">
          <div className="flex flex-col gap-3 text-left w-96">
            <div className="text-xl font-bold">Large screens only</div>
            This page is not available on mobile and tablet devices. Please
            visit on a desktop or laptop computer.
          </div>
        </div>
        <div className="grow ">{children}</div>
      </div>
    </>
  )
}
