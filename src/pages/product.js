import Head from 'next/head';
import { app, dataBase } from '../../firebaseConf';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, QuerySnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useContext } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { ProductContext } from './components/product/productContext';
import ProductItem from './components/product/produtsItem';
import ProductForm from './components/product/productForm';
import moment from 'moment';

export default function Product(){
    const inputAreaRef = useRef();
    const router = useRouter();
    const [profetch, setProFetch] = useState([]);
    // const {showAlert} = useContext(CatagoryContext);
    
    const colRef = collection(dataBase, 'products')
    useEffect(() => {
     
      const qry = query(colRef, orderBy("createdAt", "desc"));
      const catData = onSnapshot(qry, (QuerySnapshot) => {
        setProFetch(QuerySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, createdAt: doc.data().
          pFlag})))
      });
      return catData
      let token = sessionStorage.getItem('Token')
      if(token){
        getData()
      }
      // if(!token)
      else{
        router.push('/')
      }
    }, [])

  const [open, setOpen] = useState(false);
  const [alertType, setAlerType] = useState("toast-success");
  const [alertMsg, setAlertMsg] = useState("");
  const showAlert = (type, msg) => {
    setAlerType(type);
    setAlertMsg(msg);
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if(reason === 'clickaway'){
      return;
    }
    setOpen(false);
  };
//   setTimeout(function(){
//     document.getElementById(alertType).className = 'toast';
// }, 5000);
    return(
      <ProductContext.Provider value={{profetch, setProFetch}}>
        <div>
          <Head>
            <title>Products</title>
          </Head>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
              <span className="font-mono font-bold shadow-lg fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Products &nbsp;
                <code className="font-mono font-bold"> Center</code>
              </span>
              </div>
            <div>
              {/* <pre>{JSON.stringify(subfetch,null,'\t')}</pre> */}
              <div className="px-4 sm:px-0">
              <div className="fixed left-0 top-0 flex w-full shadow justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  <ProductForm/>
              </div>
              </div>
              {Array.from(profetch).map(proDet => <ProductItem key={proDet.id}
              id={proDet.id}
              pTitle={proDet.pTitle}
              // subcatagory={proDet.subcatagory}
              subcatagoryFlag={proDet.pFlag}
              // createdAt={proDet.createdAt}
              />)}
              {/* <div
                      open={open}
                      onClick={handleClose} 
                      id={alertType} className="tt delay-150 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                          <span className="sr-only">Check icon</span>
                      </div>
                      <div className="ml-3 text-sm font-normal">{alertMsg}</div>
                      <button onClick={handleClose} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                          <span className="sr-only">Close</span>
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button>
                  </div> */}
            </div>
            </main>
        </div>
       </ProductContext.Provider>
    )
}