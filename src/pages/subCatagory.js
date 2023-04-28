import Head from 'next/head';
import { app, dataBase } from '../../firebaseConf';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SelectCatagory from 'react-select';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';


export default function SubCatagory(){
    const router = useRouter();
    const [catagory, setCatagory] = useState('');
    const [flag, setFlag] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const dataBaseRef = collection(dataBase, 'first DB');
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
    const catDetails = arr.map((cat,i)=> {
     return <span key={cat.i}>{cat.catagory} </span>
    })
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]
    const option = arr;
      console.log(option);
    useEffect(() => {
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
            <title>SubCatagory</title>
          </Head>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
              <span className="font-mono font-bold shadow-lg fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Sub-Catagory &nbsp;
                <code className="font-mono font-bold"> Center</code>
              </span>
              </div>
            <div>
              <div className="px-4 sm:px-0">
              <span className="fixed left-0 top-0 flex w-full shadow justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <SelectCatagory
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />
                    </div>
                    <div><input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        placeholder='Sub Catagory'
                        onChange={(event) => setCatagory(event.target.value) }
                        value={catagory}
                        />
                    </div>
                    <div>
                    <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='number' 
                        placeholder='Sub-Catagory Flag'
                        onChange={(event) => setFlag(event.target.value) }
                        value={flag}
                        />
                    </div>
                    <div>
                        <button 
                            className='bg-cyan-300 mx-auto border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addData}>Add
                        </button>
                    </div>
                    </div>  
              </span>
              </div>
              <div class="mt-4 h-64 grid grid-rows-3 grid-flow-col gap-4">
                <div className='pb-5 border-grey-900 border-2 rounded-lg shadow-lg p-2'>
                    <div className='py-2 px-0 text-center border-b-2 border-indigo-600'>Catagory Name</div>
                    <div className='h-64 grid grid-rows-1 grid-flow-col gap-4'>
                        <div>SubCatagory</div>
                        <div>
                            
                                <PencilSquareIcon className="inline-block p-1 hover:bg-red hover:shadow-lg hover:rounded hover:border-2 border-cyan-300 h-6 w-6 text-gray-500" />
                            
                                <TrashIcon className="inline-block p-1 hover:bg-red hover:shadow-lg hover:rounded hover:border-2 border-red-500 h-6 w-6 text-gray-500" />
                        </div>
                    </div>
                </div>
              </div>
            </div>
            </main>
        </div>
    )
}