import {ComponentPropsWithoutRef, ReactNode, MouseEvent} from "react";

interface RouterLinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'onClick'>{
  className?: string;
  to: string;
  children: ReactNode;
}

const RouterLink = (props: RouterLinkProps) => {
  const {
    className = '',
    to,
    children,
    ...rest
  } = props

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <a
      className={className}
      href={to}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}

export default RouterLink