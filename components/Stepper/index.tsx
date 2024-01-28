"use client"

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Stepper = () => {
  const pathname = usePathname()

  const getLinkClass = (path:string) => {
    console.log(path === pathname ? true : false , 'path' ,path)
    return  path === pathname ? true : false
  };

  const init = "/setup/init"
  const searchConsole = "/setup/search-console"

  return (
    <nav className='py-6'>
        <ol className="flex gap-2">
          <li className="flex flex-col gap-1">
            <Link
                href={init}
                className={cn(
                    "transition-all duration-500 border-b-2 border-black pr-12",
                    { "disabled border-red-500": getLinkClass(init) },
                )}>
                Init
            </Link>
          </li>
          <li className="flex flex-col gap-1">
            <Link
                href={searchConsole}
                className={cn(
                    "transition-all duration-500 border-b-2 border-black pr-12",
                    { "disabled border-red-500": getLinkClass(searchConsole) },
                )}>
                Search console
            </Link>
          </li>
        </ol>
    </nav>
  );
};
