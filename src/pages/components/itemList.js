import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';

const itemList = ({prod}) => {

  
  return (
    <div className="mt-6 text-center divide-y divide-gray-100 rounded-lg border border-gray-300 shadow">
    <dl className="divide-y divide-gray-100 hover:bg-purple-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">{prod.catagory}</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{prod.catagoryFlag}</dd>
        <div className='space-x-4 ...'>
          <div className='inline-block p-1 hover:bg-red hover:shadow-lg hover:rounded hover:border-2 border-cyan-300'>
            <PencilSquareIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div className='inline-block p-1 hover:bg-red hover:shadow-lg hover:rounded hover:border-2 border-red-500'>
            <TrashIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </dl>
  </div>
  )
}

export default itemList