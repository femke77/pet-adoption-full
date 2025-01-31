import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useLocation } from 'react-router-dom';
import HeartPaw from '../assets/images/heart-paws.png';
import { classNames } from '../utils/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useLogout } from '../hooks/useLogout';

const navigation = [
  { name: 'How to Adopt', to: '/adopt' },
  { name: 'Meet the Pets', to: '/meet' },
  { name: 'My Favorites', to: '/favorites' },
  { name: 'Contact', to: '/contact' },
  { name: 'Login', to: '/login' },
];

export default function Navigation() {
  const logout = useLogout();
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const location = useLocation();
  return (
    <Disclosure as='nav' className='bg-gray-700 h-20 py-2'>
      {({ open }) => (
        <>
          <div className='mx-auto px-4 sm:px-4 lg:px-4'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </DisclosureButton>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <NavLink to='/' className='flex flex-shrink-0 items-center'>
                  {open ? (
                    <DisclosureButton>
                      <img
                        className='h-16 w-16'
                        src={HeartPaw}
                        alt='Pawsome Pets Logo - A heart with paw prints inside'
                      />
                    </DisclosureButton>
                  ) : (
                    <img
                      className='h-16 w-16'
                      src={HeartPaw}
                      alt='Pawsome Pets Logo - A heart with paw prints inside'
                    />
                  )}
                </NavLink>
                <div className='hidden sm:flex flex-1 items-center py-6'>
                  <div className='flex space-x-4 items-center'>
                    {navigation.map((item) => {
                      if (loggedIn && item.name === 'Login') {
                        return (
                          <div
                            role='button'
                            key={item.name}
                            onClick={() => logout.mutate()}
                            className='text-gray-300 hover:bg-gray-700 hover:text-white text-sm px-3'
                          >
                            Logout
                          </div>
                        );
                      }
                      return (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }: { isActive: boolean }) =>
                            classNames(
                              isActive
                                ? 'text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'text-sm px-3',
                            )
                          }
                          aria-current={location.pathname ? 'page' : undefined}
                        >
                          {item.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='hidden sm:flex'>
                <NavLink
                  className='flex w-20 mx-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  to='/donate'
                >
                  Donate
                </NavLink>
              </div>
            </div>
          </div>

          <DisclosurePanel className='sm:hidden absolute z-40 bg-gray-800 w-full'>
            <div className='space-y-1 px-2 pb-3 pt-2 '>
              {navigation.map((item) => {
                if (loggedIn && item.name === 'Login') {
                  return (
                    <DisclosureButton
                      key={item.name}
                      onClick={() => logout.mutate()}
                      className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                    >
                      Logout
                    </DisclosureButton>
                  );
                }
                return (
                  <DisclosureButton
                    key={item.name}
                    as={NavLink}
                    to={item.to}
                    className={({ isActive }: { isActive: boolean }) =>
                      classNames(
                        isActive
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )
                    }
                    aria-current={location.pathname ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
              <DisclosureButton
                as={NavLink}
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                to='/donate'
              >
                Donate
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

{
  /* <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg></button>
                <!-- Dropdown menu -->
                <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                      </li>
                    </ul>
                    <div class="py-1">
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div> */
}
