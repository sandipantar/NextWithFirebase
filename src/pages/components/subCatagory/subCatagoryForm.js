import Head from 'next/head';
import { app, dataBase } from '../../../../firebaseConf';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, QuerySnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useContext } from 'react';
import { SubCatagoryContext } from './SubCatagoryContext';
import SelectCatagory from 'react-select';

export default function Catagory(){
    
    const router = useRouter();
    const {subfetch} = useContext(SubCatagoryContext);
    const [subcatagory, setSubcatagory] = useState('');
    const [subflag, setSubflag] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [cat, setCat] = useState([]);
    const options = [
      {value: 'abcd', label:'ABCD'},
      {value: '1234', label:'xyz'} 
    ];
    
    const dataBaseRef = collection(dataBase, 'subcat');
    // add data into firestore databse
    const addData = () => {
      addDoc(dataBaseRef, {
        // catagoryHead: selectedOption.value,
        subcatagory: subcatagory,
        subcatagoryFlag: Number(subflag),
        createdAt: new Date(),
      })
      .then(() => {
        // alert('Data saved into DB')
        setSubcatagory('')
        setSubflag('')
        // showAlert('success', 'New Catagory Stored')
      })
      .catch((err) => {
        console.log(err);
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
    useEffect(() => {
      const colRef = collection(dataBase, 'ecomm')
      const qry = query(colRef, orderBy("createdAt", "desc"));
      // const catData = onSnapshot(qry, (QuerySnapshot) => {
      //   setCat(QuerySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, createdAt: doc.data().
      //     createdAt.toDate().getTime() })))
      // });
      // return catData
      const options = Object.entries(qry).map(([key, value]) => ({
        value: key,
        label: value,
      }));
      // setSelectedOption(formatte
      
     
    },[])
    
    
    
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
                        <SelectCatagory
                            value={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />
                    </div>
                    <div>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        placeholder='New Sub Catagory'
                        onChange={(event) => setSubcatagory(event.target.value) }
                        value={subcatagory}
                        required
                        autoFocus
                        />
                    </div>
                    <div>
                    <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='number' 
                        placeholder='Sub Catagory Flag'
                        onChange={(event) => setSubflag(event.target.value) }
                        value={subflag}
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