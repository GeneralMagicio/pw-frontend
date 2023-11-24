import { Header } from './Header'
import { ReactNode } from 'react'
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
        <div className="grow ">{children}</div>
      </div>
    </>
  )
}
