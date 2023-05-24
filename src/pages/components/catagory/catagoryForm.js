import Head from 'next/head';
import { app, dataBase } from '../../../../firebaseConf';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, QuerySnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useContext } from 'react';

export default function Catagory(){
    
    const router = useRouter();
    const [catagory, setCatagory] = useState('');
    const [flag, setFlag] = useState('');
    
    const dataBaseRef = collection(dataBase, 'ecomm');
    // add data into firestore databse
    const addData = () => {
      addDoc(dataBaseRef, {
        catagory: catagory,
        catagoryFlag: Number(flag),
        createdAt: new Date(),
      })
      .then(() => {
        // alert('Data saved into DB')
        setCatagory('')
        setFlag('')
        showAlert('success', 'New Catagory Stored')
      })
      .catch((err) => {
        // console.error(err);
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

    return(        
             <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        placeholder='New Catagory'
                        onChange={(event) => setCatagory(event.target.value) }
                        value={catagory}
                        required
                        autoFocus
                        />
                    </div>
                    <div>
                    <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='number' 
                        placeholder='Catagory Flag'
                        onChange={(event) => setFlag(event.target.value) }
                        value={flag}
                        required
                        />
                    </div>
                    <div>
                        <button 
                            className='bg-cyan-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addData}>Add
                        </button>
                    </div>
              </div>
    )
}