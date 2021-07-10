import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

interface Props {
  href: string;
  activeHref?: string;
}

export const SideNavLink: React.FC<Props> = ({ href, children, activeHref }) => {
  const { pathname } = useRouter();

  return (
    <Link href={href}>
      <a
        className={clsx('hover:text-accent', {
          'text-accent border-r-4 border-accent': pathname.startsWith(activeHref ?? href),
        })}
      >
        {children}
      </a>
    </Link>
  );
};
