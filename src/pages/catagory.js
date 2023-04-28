import Head from 'next/head';
import { app, dataBase } from '../../firebaseConf';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import itemList from './components/itemList';

export default function Catagory(){
    const router = useRouter();
    const [catagory, setCatagory] = useState('');
    const [flag, setFlag] = useState('');
    

    const dataBaseRef = collection(dataBase, 'ecomm');
    // add data into firestore databse
    const addData = () => {
      addDoc(dataBaseRef, {
        catagory: catagory,
        catagoryFlag: Number(flag)
      })
      .then(() => {
        alert('Data sent into DB')
        setCatagory('')
        setFlag('')
      })
      .catch((err) => {
        console.error(err);
      })
    }
    // add data into firestore database
    let obj = {};
    const arr = [];
    // retrive data from database
    const getData = async() => {
      await getDocs(dataBaseRef)
      .then ((res) => {
            
            if (res.docs && res.docs.length) {
                res.docs.forEach(doc => {
                    obj.id = doc.id;
                    obj.otherDetails = doc.data();
                    arr.push({...obj});
                    obj = {};
                });
            }
        // console.log(arr)
      })
    }
    //retrive data from databse
    //delete data
    const removeCatagory = async (id) => {
      const removeRes = await deleteById(invoiceCollectionName, id);
      if (removeRes.success) {
          fetchList();
      }
  };
    //delete data
    const [fetch, setFetch] = useState([])
    useEffect(() => {
      (async () => {
        const colRef = collection(dataBase, 'ecomm')
        const snapshots = await getDocs(colRef)
        const docs = snapshots.docs.map((doc) => {
          const data = doc.data()
          data.id = doc.id
          return data
        }) 
        setFetch(docs)
        console.log(docs)
      })()
      // dataBase.collection(ecomm).onSnapshot(snapshot => {
      //   setFetch(snapshot.docs.map(doc => ({id:doc.id, catagory:doc.data().Catagory, catagoryFlag:doc.data().catagoryFlag})))
      // })
      let token = sessionStorage.getItem('Token')
      if(token){
        getData()
      }
      // if(!token)
      else{
        router.push('/')
      }
    }, [])
    return(
        <div>
          <Head>
            <title>Catagory</title>
          </Head>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
              <span className="font-mono font-bold shadow-lg fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Catagory &nbsp;
                <code className="font-mono font-bold"> Center</code>
              </span>
              </div>
            <div>
              <div className="px-4 sm:px-0">
              <div className="fixed left-0 top-0 flex w-full shadow justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  <div className='grid grid-cols-3 gap-4'>
                    <div><input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        placeholder='New Catagory'
                        onChange={(event) => setCatagory(event.target.value) }
                        value={catagory}
                        />
                    </div>
                    <div>
                    <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='number' 
                        placeholder='Catagory Flag'
                        onChange={(event) => setFlag(event.target.value) }
                        value={flag}
                        />
                    </div>
                    <div>
                        <button 
                            className='bg-cyan-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addData}>Add
                        </button>
                    </div>
                    </div>  
              </div>
              </div>
              {fetch.map((prod, i) => {
                return <div key={prod.id} className="mt-6 text-center divide-y divide-gray-100 rounded-lg border border-gray-300 shadow">
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
              })}
              
            </div>
            </main>
        </div>
    )
}