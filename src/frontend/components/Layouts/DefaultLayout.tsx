import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        &nbsp;&nbsp;
        <Link href="/upload">
          <a>Upload</a>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};
