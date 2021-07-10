import React from 'react';
import Link from 'next/link';
import { User } from './User';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 text-white h-header bg-primary">
      <Link href="/">
        <a>
          <h1 className="font-serif text-2xl">Mokytojams</h1>
        </a>
      </Link>
      <User />
    </header>
  );
};
