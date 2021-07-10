import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React from 'react';
import { useAuth } from '../../context/authContext';

export const User = () => {
  const auth = useAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <>
      <Menu as="div" className="relative ml-3">
        <Menu.Button className="inline-flex border-red-100 rounded-full">
          {auth.user.userName}
          <ChevronDownIcon className="w-5 ml-2" />
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-48 py-1 mt-2 text-sm text-black origin-top-right bg-white rounded-md shadow-lg">
            <Menu.Item>
              <button onClick={() => auth.logOut()} className="w-full py-2 hover:bg-gray-200">
                Atsijungti
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
