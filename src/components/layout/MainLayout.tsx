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
          'main-layout flex min-h-screen shrink-0 flex-col  text-white font-IBM bg-no-repeat bg-cover'
        )}>
        <Header />
        <div className="grow ">{children}</div>
      </div>
    </>
  )
}
