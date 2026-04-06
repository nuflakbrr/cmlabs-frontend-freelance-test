'use client';
import { type FC, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { navlinks } from './constant/navLinks';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  // Navbar fixed position if scrolling
  useEffect(() => {
    window.onscroll = () => {
      const header = document.querySelector('header');
      const fixNav = header?.offsetTop ?? 0;

      if (window.pageYOffset > fixNav) {
        header?.classList.add(styles.navbarFixed);
      } else {
        header?.classList.remove(styles.navbarFixed);
      }
    };
  }, []);

  // Hamburger menu handler
  const hamburgerHandler = () => {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#navMenu');

    setIsOpen(!isOpen);

    if (isOpen) {
      hamburger?.classList.remove(styles.hamburgerActive);
      navMenu?.classList.add('hidden');
    } else {
      hamburger?.classList.add(styles.hamburgerActive);
      navMenu?.classList.remove('hidden');
    }
  };

  // isMenuActive handler
  const isMenuActive = (path: string) => {
    const isHomePage = pathname === '/' && path === '/';

    if (isHomePage) {
      return true;
    }

    return pathname !== '/' && path !== '/' && pathname.includes(path);
  };

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full shadow-sm flex items-center z-10">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex items-center justify-between relative">
          <div className="">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans font-bold text-xl lg:text-2xl py-6 text-zinc-900"
              aria-label="logo"
            >
              mealapp
            </Link>
          </div>
          <div className="flex items-center">
            <button
              id="hamburger"
              name="hamburger"
              type="button"
              className="right-4 block absolute lg:hidden"
              onClick={hamburgerHandler}
            >
              <span
                className={`${styles.hamburgerLine} origin-top-left transition duration-300 ease-in-out`}
              ></span>
              <span
                className={`${styles.hamburgerLine} transition duration-300 ease-in-out`}
              ></span>
              <span
                className={`${styles.hamburgerLine} origin-bottom-left transition duration-300 ease-in-out`}
              ></span>
            </button>

            <nav
              id="navMenu"
              className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none"
            >
              <ul className="block lg:flex lg:items-center">
                {navlinks?.map((a, i) => (
                  <li className="group" key={i}>
                    <Link
                      href={a.path}
                      className="mx-4 font-semibold my-2 lg:my-0 flex text-sm text-[#5C6E8C]"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
