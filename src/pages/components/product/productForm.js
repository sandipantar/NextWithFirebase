import Head from 'next/head';
import { app, dataBase } from '../../../../firebaseConf';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, QuerySnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useContext } from 'react';
import { ProductContext } from './productContext';
import SelectCatagory from 'react-select';

export default function productForm(){
    
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(null);
    const [productData, setProductData] = useState({
      pTitle: "",
      quantityWisePriceAll: [],
      pFlag: "",
      medias: [],
      pCatagory:"",
      pSubCatagorys:[],
      pExpiryDate:"",
      pOffers:[],
      pType:"",
      pDescription:"",
      pRatingAndReviews: [],
      pQuantity:""
  });
  const [quantityOfProduct, SetQOP] = useState("");
  const [quantityWisePrice, SetQWP] = useState("");
  const [media, setMedia] = useState("");
  const [scat, setScat] = useState("");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerdisc, setOfferDisc] = useState("");
  const [rrtaste, setrrTaste] = useState("");
  const [rrcolor, setrrColor] = useState("");
  const [rrsmell, setrrSmell] = useState("");
  const [pkg, setPkg] = useState("");
  const [writenReview, setWriteReview] = useState("");
  const [options, setOptions] = useState([]);
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductData({ ...productData, [name]: value });
}
  //multi quantity price
  const addQuantityPrice = () => {
    if (quantityOfProduct.trim().length) {
        const localProductData = { ...productData };
        localProductData.quantityWisePriceAll.push({
            quantity: quantityOfProduct,
            price: Number(quantityWisePrice)
        });
        setProductData({ ...localProductData });
        SetQOP("");
        SetQWP("");
    }
  };
  const removeQuantityPrice = (id) => {
    const localProductData = { ...productData };
    localProductData.quantityWisePriceAll.splice(id, 1);
    setProductData({ ...localProductData });
  };
  //multi quantity with price
    //multi media price
    const addMedia = () => {
      if (media.trim().length) {
          const localProductData = { ...productData };
          localProductData.medias.push({
              media: media
          });
          setProductData({ ...localProductData });
          setMedia("");
      }
    };
    const removeMedia = (id) => {
      const localProductData = { ...productData };
      localProductData.medias.splice(id, 1);
      setProductData({ ...localProductData });
    };
    //multi media with price
      //multi rateReview price
  const addRateReview = () => {
    if (writenReview.trim().length) {
        const localProductData = { ...productData };
        localProductData.pRatingAndReviews.push({
          tasteRating: Number(rrtaste),
          colorRating: Number(rrcolor),
          smellRating: Number(rrsmell),
          packageRating: Number(pkg),  
          wReview: writenReview
        });
        setProductData({ ...localProductData });
        setrrColor("");
        setrrSmell("");
        setrrTaste("");
        setPkg("");
        setWriteReview("");
    }
  };
  const removeRateReview = (id) => {
    const localProductData = { ...productData };
    localProductData.pRatingAndReviews.splice(id, 1);
    setProductData({ ...localProductData });
  };
  //multi ratereview with price
    //multi offers price
    const addoffer = () => {
      if (offerTitle.trim().length) {
          const localProductData = { ...productData };
          localProductData.pOffers.push({
              offerTitle: offerTitle,
              offerDisc: Number(offerdisc)
          });
          setProductData({ ...localProductData });
          setOfferTitle("");
          setOfferDisc("");
      }
    };
    const removeoffer = (id) => {
      const localProductData = { ...productData };
      localProductData.pOffers.splice(id, 1);
      setProductData({ ...localProductData });
    };
    //multi offers with price
    //multi subcatagory price
  const addSubcatgory = () => {
    if (scat.trim().length) {
        const localProductData = { ...productData };
        localProductData.pSubCatagorys.push({
            subCatagory: scat
        });
        setProductData({ ...localProductData });
        setScat("");
    }
  };
  const removeSubcatagory = (id) => {
    const localProductData = { ...productData };
    localProductData.pSubCatagorys.splice(id, 1);
    setProductData({ ...localProductData });
  };
  //multi subcatagory with price
    
    const dataBaseRef = collection(dataBase, 'products');
    // add data into firestore databse
    const addData = () => {
      addDoc(dataBaseRef, {...productData})
      .then(() => {
        // alert('Data saved into DB')
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
    
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const snapshot = collection(dataBase, 'ecomm');
    //       const data = snapshot.docs.map(([key, value]) => ({
    //         value: key,
    //         label: value, // Assuming the document has a 'name' field
    //       }));
    //       setOptions(data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, []);
    
    // useEffect(() => {
    //   const colRef = collection(dataBase, 'ecomm')
    //   const qry = query(colRef, orderBy("createdAt", "desc"));
    //   // const catData = onSnapshot(qry, (QuerySnapshot) => {
    //   //   setCat(QuerySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, createdAt: doc.data().
    //   //     createdAt.toDate().getTime() })))
    //   // });
    //   // return catData
    //   const options = Object.entries(qry).map(([key, value]) => ({
    //     value: key,
    //     label: value,
    //   }));
    //   // setSelectedOption(formatte
      
     
    // },[])
  
    
    
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
                    {/* <pre>{JSON.stringify(productData, null, '\t')}</pre> */}
                    <div>
                        <SelectCatagory
                            // value={selectedOption}
                            // onChange={setSelectedOption}
                            options={options}
                        />
                    </div>
                    <div className='producTitle'>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        name='pTitle'
                        placeholder='New product'
                        onChange={handleInputs}
                        value={productData.pTitle}
                        required
                        autoFocus
                        />
                    </div>
                    <div className='productFlag'>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='number' 
                        name='pFlag'
                        placeholder='product status'
                        onChange={handleInputs} 
                        value={Number(productData.pFlag)}
                        required
                        />
                    </div>
                    <div className='quantityWisePrice'>
                      <div>
                                      <input  type="text" name='quantityOfProduct'
                                          value={quantityOfProduct}
                                          placeholder="Enter Quantity of product"
                                          onChange={(e) => SetQOP(e.target.value)}
                                      />
                                      <input  type="number" name='quantityWisePrice'
                                          value={quantityWisePrice}
                                          placeholder="Enter Price of Quantity"
                                          onChange={(e) => SetQWP(e.target.value)}
                                      />
                                      <button className='bg-green-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addQuantityPrice}>
                                      +
                                  </button>
                      </div>
                      <div>
                        {productData.quantityWisePriceAll.map((product, ind) => {
                                              return <tr key={ind}>
                                                  <td>{product.quantity}</td>
                                                  <td>{product.price}</td>

                                                  <td>
                                                      <i className="fa fa-trash cursor-pointer mr-3" onClick={() => removeQuantityPrice(ind)}></i>
                                                  </td>
                                              </tr>
                                          })}
                          
                      </div>
                    </div>
                    <div className='medias'>
                      <div>
                                      <input  type="text" name='media'
                                          value={media}
                                          placeholder="images or videos"
                                          onChange={(e) => setMedia(e.target.value)}
                                      />
                                      <button className='bg-green-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addMedia}>
                                      +
                                  </button>
                      </div>
                      <div>
                        {productData.medias.map((product, ind) => {
                                              return <tr key={ind}>
                                                  <td>{product.media}</td>
                                                  <td>
                                                      <i className="fa fa-trash cursor-pointer mr-3" onClick={() => removeMedia(ind)}></i>
                                                  </td>
                                              </tr>
                                          })}
                          
                      </div>
                    </div>
                    <div className='chooseCatagory'>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        name='pCatagory'
                        placeholder='Choose catagory'
                        onChange={handleInputs} 
                        value={productData.pCatagory}
                        required
                      />
                    </div>
                    <div className='subCatagorys'>
                      <div>
                                      <input  type="text" name='scat'
                                          value={scat}
                                          placeholder="Choose Sub-catagory"
                                          onChange={(e) => setScat(e.target.value)}
                                      />
                                      <button className='bg-green-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addSubcatgory}>
                                      +
                                  </button>
                      </div>
                      <div>
                        {productData.pSubCatagorys.map((product, ind) => {
                                              return <tr key={ind}>
                                                  <td>{product.subCatagory}</td>
                                                  <td>
                                                      <i className="fa fa-trash cursor-pointer mr-3" onClick={() => removeSubcatagory(ind)}></i>
                                                  </td>
                                              </tr>
                                          })}
                          
                      </div>
                    </div>
                    <div className='productValidity'>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        name='pExpiryDate'
                        placeholder='product Validity'
                        onChange={handleInputs} 
                        value={productData.pExpiryDate}
                        required
                      />
                    </div>
                    <div className='productOffer'>
                      <div>
                                      <input  type="text" name='offerTitle'
                                          value={offerTitle}
                                          placeholder="Offer Title"
                                          onChange={(e) => setOfferTitle(e.target.value)}
                                      />
                                      <input  type="number" name='offerdisc'
                                          value={offerdisc}
                                          placeholder="Offer discount percent"
                                          onChange={(e) => setOfferDisc(e.target.value)}
                                      />
                                      <button className='bg-green-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addoffer}>
                                      +
                                  </button>
                      </div>
                      <div>
                        {productData.pOffers.map((product, ind) => {
                                              return <tr key={ind}>
                                                  <td>{product.offerTitle}</td>
                                                  <td>{product.offerDisc}</td>

                                                  <td>
                                                      <i className="fa fa-trash cursor-pointer mr-3" onClick={() => removeoffer(ind)}></i>
                                                  </td>
                                              </tr>
                                          })}
                          
                      </div>
                    </div>
                    <div className='productType'>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        name='pType'
                        placeholder='product type for flavours or any type'
                        onChange={handleInputs} 
                        value={productData.pType}
                        required
                      />
                    </div>
                    <div className='productDescription'>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        name='pDescription'
                        placeholder='product Description'
                        onChange={handleInputs} 
                        value={productData.pDescription}
                        required
                      />
                    </div>
                    <div className='productDescription'>
                      <input 
                        className='rounded-lg p-2 shadow-lg border-1 w-full' 
                        type='text' 
                        name='pQuantity'
                        placeholder='product quantity'
                        onChange={handleInputs} 
                        value={productData.pQuantity}
                        required
                      />
                    </div>
                    <div className='reviewRatin'>
                      <div>
                                      <input  type="number" name='rrtaste'
                                          value={rrtaste}
                                          placeholder="Rate taste of product "
                                          onChange={(e) => setrrTaste(e.target.value)}
                                      />
                                      <input  type="number" name='rrcolor'
                                          value={rrcolor}
                                          placeholder="Rate Color of Product"
                                          onChange={(e) => setrrColor(e.target.value)}
                                      />
                                      <input  type="number" name='rrsmell'
                                          value={rrsmell}
                                          placeholder="Rate Aroma of product"
                                          onChange={(e) => setrrSmell(e.target.value)}
                                      />      
                                      <input  type="number" name='pkg'
                                          value={pkg}
                                          placeholder="Rate packaging of product"
                                          onChange={(e) => setPkg(e.target.value)}
                                      />
                                      <input  type="text" name='writenReview'
                                          value={writenReview}
                                          placeholder="Product Review"
                                          onChange={(e) => setWriteReview(e.target.value)}
                                      />
                                      <button className='bg-green-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addRateReview}>
                                      +
                                  </button>
                      </div>
                      <div>
                        {productData.pRatingAndReviews.map((product, ind) => {
                                              return <tr key={ind}>
                                                  <td>{product.tasteRating}</td>
                                                  <td>{product.colorRating}</td>
                                                  <td>{product.smellRating}</td>
                                                  <td>{product.packageRating}</td>
                                                  <td>{product.wReview}</td>

                                                  <td>
                                                      <i className="fa fa-trash cursor-pointer mr-3" onClick={() => removeRateReview(ind)}></i>
                                                  </td>
                                              </tr>
                                          })}
                          
                      </div>
                    </div>

                    <button 
                            className='bg-cyan-300 border-2 px-4 py-1 shadow-lg rounded-lg' onClick={addData}>Add
                        </button>
              </div>
    )
}