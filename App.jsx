import { useState , useEffect } from 'react'
import "./App.css"
import axios from "axios"

function App() {
 
   const [users,setUsers]=useState([]); 

 
  //  PUT
   const [isEditMode,setISEditMode]= useState(false);
   const [editIndex,setEditIndex]= useState(null);
  

   const link = "http://localhost:5000/users" ;
   
   // form data
   const [formData,setFormData]=useState({ name:"", email:"",phone:""})
   
  

   // fetching users
   const fetch_users=async ()=>{
    const response = await axios.get(link);
    setUsers(response.data);
  }

  useEffect(()=>{
  fetch_users();
  },[])

  // handlechange

  const handleChange=(e)=>{
     setFormData({...formData,[e.target.name]:e.target.value});
  }
  
  const handleSubmit=async()=>{

    if(formData.name!=="" && (formData.email!=="" && formData.phone!=="")){
      const response = await axios.post(link,formData);
      setFormData({name:"",email:"",phone:""})
      fetch_users();
    }
  }

   // const handle edit
   const edit=(pos)=>{
    const userData = users[pos];
    setFormData({
      name:userData.name,
      phone:userData.phone,
      email:userData.email,
    })
    setISEditMode(true);
    setEditIndex(pos)
   }


   const updateUser=async()=>{
        await axios.put(`${link}/${editIndex}`,formData);
        setFormData({name:"",email:"",phone:""});
        setISEditMode(false);
        setEditIndex(null);
        fetch_users();
   }



   // delte user
   const del= async(pos)=>{
    const deleteContent = users[pos];
    await axios.delete(`${link}/${pos}`);
      fetch_users();
   }
   
  return (
    <div className='box'>
    <div>
      <div>
        <div className='myinput'>

          <div>
            <label>Name : </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}/>
          </div>
          <div>
            
            <label>Email : </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            
            <label>Phone : </label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}  />
          </div>
         

              <button
  style={{ height: "40px", width: "120px", fontSize: "15px" }}
  onClick={isEditMode ? updateUser : handleSubmit}
>
  {isEditMode ? "Update" : "Add"}
</button>


        </div>
        <div className='display'>
        {
          users.map((val,index)=>(
            <div  key={index} className='data'>
            
            <p>{val.name}</p>
            <p>{val.phone}</p>
            <p>{val.email}</p>
            <div className='btns'>
            <button onClick={()=>edit(index)}>Edit</button>
            <button onClick={()=>del(index)}>Delete</button>
            </div>
            
            </div>
          ))
        }
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
