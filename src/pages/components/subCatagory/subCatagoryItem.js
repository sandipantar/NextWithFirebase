import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { app, dataBase } from '../../../../firebaseConf';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, QuerySnapshot,updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { SubCatagoryContext } from './SubCatagoryContext';

const catagoryItem = ({id,catagoryHead, subcatagory, subcatagoryFlag, createdAt}) => {
  const inputAreaRef = useRef();
  const [subcatdata, setSubCatdata] = useState('');
  const [subcatflag, setSubCatflag] = useState('');
  const [clicked, setClicked] = useState(false);
  //delete data
  const deleteSubCatgory = async(id, e) => {
    e.stopPropagation();
    const docRef = doc(dataBase, "subcat", id);
    await deleteDoc(docRef);
  }
  //delete data
    //update to firestore 
    const updateSubCatDet = () => {
      const docRef = doc(dataBase, "subcat", id);
      updateDoc(docRef, {
          catagoryHead: catagoryHead,
          subcatagory: subcatdata,
          subcatagoryFlag: Number(subcatflag),
          createdAt: new Date(),  
      })
      .then(() => {
        // alert("data Updated")
      })
      .catch((err) =>{
        console.log(err);
      })
    }
    //update to firestore
  //editable field
  const handleClick = () => {
    setClicked(true);
    setSubCatdata(subcatagory);
    setSubCatflag(subcatagoryFlag);
  };
  useEffect(() => {
    const checkIfClickOutside = e => {
      if(!inputAreaRef.current.contains(e.target)) {
        console.log('clickedOutside');
        setClicked(false);
      } else {
        console.log('click Riht area');
      }
    }
    document.addEventListener("mousedown", checkIfClickOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside)
    }
  }, [])
  //editable field

  return (
    <div className="mt-6 text-center divide-y divide-gray-100 rounded-lg border border-gray-300 shadow" ref={inputAreaRef}>
    <dl className="divide-y divide-gray-100 hover:bg-purple-200 hover:rounded-lg hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
      {clicked ? (
        <div className="py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        onChange={(event) => setSubCatdata(event.target.value) }
                        value={subcatdata}
                      />
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='number' 
                        onChange={(event) => setSubCatflag(event.target.value) }
                        value={subcatflag}
                      />
        </dd>
        <div className='space-x-4 ...'>
            <button 
              className='bg-cyan-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={updateSubCatDet}>Update
            </button>
        </div>
      </div>
      ):(
        <div className=" py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">{catagoryHead} {subcatagory}</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subcatagoryFlag}</dd>
        <div className='space-x-4 ...'>
          <div className='inline-block p-1 hover:bg-red hover:shadow-lg hover:rounded hover:border-2 border-cyan-300'>
            <PencilSquareIcon className="h-5 w-5 text-gray-500" 
            onClick={handleClick}
            />
          </div>
          <div className='inline-block p-1 hover:bg-red hover:shadow-lg hover:rounded hover:border-2 border-red-500'>
            <TrashIcon className="h-5 w-5 text-gray-500" onClick={e => deleteSubCatgory(id, e)} />
          </div>
        </div>
        {/* <span><small>{createdAt}</small></span> */}
      </div>
      )}
    </dl>
  </div>
  )
}

export default catagoryItem