import { useEffect, useState } from "react";
import api from "../api/axios";

//const API_URL = import.meta.env.VITE_API_URL;

function AboutManager() {

  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: null,
    email: "",
    phone: "",
    location: "",
    cv_file: null,
  });


  // ================= FETCH =================

  const fetchAbouts = async () => {
    try {

      const res = await api.get("/api/abouts");

      setAbouts(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

     const loadAbouts = async () => {
    try {
      const res = await api.get("/api/abouts");
      setAbouts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadAbouts();

  }, []);



  // ================= HANDLE TEXT INPUT =================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  // ================= IMAGE UPLOAD =================

  const handleImageChange = (e) => {

    setForm({
      ...form,
      image: e.target.files[0],
    });

  };

  // ================= CV UPLOAD =================

    const handleCvChange = (e) => {
    setForm({
      ...form,
      cv_file: e.target.files[0],
    });
  };



  // ================= RESET =================

  const resetForm = () => {

    setForm({
      title: "",
      subtitle: "",
      description: "",
      image: null,
      email: "",
      phone: "",
      location: "",
      cv_file: null,
    });

    setEditingId(null);

  };



  // ================= CREATE =================

  const createAbout = async () => {


    const data = new FormData();


    Object.keys(form).forEach((key)=>{

      if(form[key]){
        data.append(key, form[key]);
      }

    });



    await api.post(
      "/api/abouts",
      data,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    );

  };




  // ================= UPDATE =================

  const updateAbout = async () => {


    const data = new FormData();


    Object.keys(form).forEach((key)=>{

      if(form[key]){
        data.append(key, form[key]);
      }

    });


    data.append("_method","PUT");


    await api.post(
      `/api/abouts/${editingId}`,
      data,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    );


  };




  // ================= SUBMIT =================

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      if(editingId){

        await updateAbout();

      }else{

        await createAbout();

      }


      resetForm();

      fetchAbouts();


    }catch(err){

      console.log(err);

    }

  };




  // ================= DELETE =================

  const handleDelete = async(id)=>{


    if(!confirm("Delete this About record?")) return;


    try{

      await api.delete(`/api/abouts/${id}`);

      fetchAbouts();


    }catch(err){

      console.log(err);

    }

  };




  // ================= EDIT =================


  const handleEdit = (about)=>{


    setEditingId(about.id);


    setForm({

      title: about.title || "",
      subtitle: about.subtitle || "",
      description: about.description || "",
      image:null,
      email: about.email || "",
      phone: about.phone || "",
      location: about.location || "",
      cv_file: null,

    });


  };




  if(loading){

    return(

      <div className="flex justify-center items-center py-20">

        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      </div>

    );

  }




return (

<div className="max-w-6xl mx-auto p-6">


<h1 className="text-3xl font-bold mb-6">
About Manager
</h1>



<form
onSubmit={handleSubmit}
className="bg-gray-100 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
>

<div><label className="block font-semibold mb-1">
    Title
  </label>
<input
name="title"
value={form.title}
onChange={handleChange}
placeholder="Title"
className="p-2 border rounded w-80"
/>
</div > 


<div><label className="block font-semibold mb-1">
    Subtitle
  </label>
<input
name="subtitle"
value={form.subtitle}
onChange={handleChange}
placeholder="Subtitle"
className="p-2 border rounded w-80"
/>
</div>



{/* IMAGE UPLOAD */}
<div><label className="block font-semibold mb-1">
    Image
  </label>
<input
type="file"
accept="image/*"
onChange={handleImageChange}
className="p-2 border rounded w-80"
/>

{editingId && abouts.find(a => a.id === editingId)?.image && (

<p className="text-sm mt-2">

Current Image:

<a
href={abouts.find(a => a.id === editingId).image}
target="_blank"
rel="noopener noreferrer"
className="text-blue-600 underline ml-2"
>
{
abouts.find(a => a.id === editingId).image.split("/").pop()
}
</a>

</p>

)}

</div>



<div><label className="block font-semibold mb-1">
    Email
  </label>
<input
name="email"
value={form.email}
onChange={handleChange}
placeholder="Email"
className="p-2 border rounded w-80"
/>
</div>


<div><label className="block font-semibold mb-1">
    Phone
  </label>
<input
name="phone"
value={form.phone}
onChange={handleChange}
placeholder="Phone"
className="p-2 border rounded w-80"
/>
</div>


<div><label className="block font-semibold mb-1">
    Location
  </label>
<input
name="location"
value={form.location}
onChange={handleChange}
placeholder="Location"
className="p-2 border rounded w-80"
/>
</div>



<div><label className="block font-semibold mb-1">
    Upload CV
  </label>
<input
  type="file"
  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
  onChange={handleCvChange}
  className="p-2 border rounded md:col-span-2 w-80"
/>

{editingId && abouts.find(a => a.id === editingId)?.cv_file && (

<p className="text-sm mt-2">

Current CV:

<a
href={abouts.find(a => a.id === editingId).cv_file}
target="_blank"
rel="noopener noreferrer"
className="text-blue-600 underline ml-2"
>
{
abouts.find(a => a.id === editingId).cv_file.split("/").pop()
}
</a>

</p>

)}
</div>



<div><label className="block font-semibold mb-1">
    Description
  </label>
<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Description"

rows="5"

className="p-2 border rounded md:col-span-2 w-80"

/>
</div>




<div className="md:col-span-2 flex gap-3">


<button

type="submit"

className={`px-4 py-2 rounded text-white ${
editingId
?"bg-green-600"
:"bg-blue-600"
}`}

>

{editingId ? "Update About":"Create About"}

</button>



{editingId && (

<button

type="button"

onClick={resetForm}

className="bg-gray-500 text-white px-4 py-2 rounded"

>

Cancel

</button>

)}


</div>


</form>





<div className="grid gap-4">


{abouts.map((about)=>(


<div
key={about.id}
className="bg-white shadow rounded-lg p-5 border"
>



{about.image && (

<img

src={about.image}

className="w-40 h-40 object-cover rounded mb-4"

/>

)}





<h2 className="text-2xl font-bold">

{about.title}

</h2>



<p className="text-gray-500">

{about.subtitle}

</p>



<p className="mt-3">

{about.description}

</p>



<div className="mt-3 text-sm">

<p>Email: {about.email}</p>

<p>Phone: {about.phone}</p>

<p>Location: {about.location}</p>

{about.cv_file && (
  <p className="mt-2">
    <strong>Current CV:</strong>{" "}

    <a
href={about.cv_file}
target="_blank"
rel="noopener noreferrer"
className="text-blue-600 underline"
>
View File
</a>
  </p>
)}
</div>





<div className="flex gap-3 mt-4">


<button

onClick={()=>handleEdit(about)}

className="bg-yellow-500 text-white px-3 py-1 rounded"

>

Edit

</button>

 

<button

onClick={()=>handleDelete(about.id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete

</button>


</div>


</div>


))}


</div>


</div>

);

}


export default AboutManager;