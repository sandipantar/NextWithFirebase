import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import imgPro from '../../../img/nightlife.jpeg';
import { app, dataBase } from '../../../../firebaseConf';
import ProEdit from './proEdit';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, QuerySnapshot,updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Modal, Select } from 'flowbite-react';
import { ProductContext } from './productContext';


const productItem = ({id, pTitle, subcatagoryFlag}) => {
  const inputAreaRef = useRef();
  const {productData, setProductData} =useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);
  const [subcatdata, setSubCatdata] = useState('');
  const [subcatflag, setSubCatflag] = useState('');
  const [clicked, setClicked] = useState(false);
  const docRef = doc(dataBase, "products", id);

  //delete data
  const deleteproduct = async(id, e) => {
    e.stopPropagation();
    await deleteDoc(docRef);
  }
  //delete data
    //update to firestore 
    const updateproduct = () => {
      updateDoc(docRef, {
          // catagoryHead: catagoryHead,
          pTitle: subcatdata,
          pFlag: Number(subcatflag),
          billto: {
            label: selectedOption.label,
            value: selectedOption.value,
            companyDetails: selectedOption.companyDetails
        },
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
    setSubCatdata(pTitle);
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
      <div class="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 float-left" ref={inputAreaRef}>
          <a href="#">
              <img class="rounded-t-lg" src={imgPro} />
          </a>
          <div class="p-5">
              <a href="#" className='float-left'>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pTitle}. {id}</h5>
              </a>
              <p className='float-right'>{subcatagoryFlag}</p><br/>
              <a onClick={() => setShowModal(true)} href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <PencilSquareIcon className="h-5 w-5" 
                
                // onClick={handleClick}
                />
                  <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
              <a href="#" class="inline-flex items-center px-3 ml-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <TrashIcon className="h-5 w-5" onClick={e => deleteproduct(id, e)} />
                  <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
          </div>
          
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      </div>
  )
}

export default productItem