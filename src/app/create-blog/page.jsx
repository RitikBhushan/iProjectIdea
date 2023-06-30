'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'
import classes from './create-blog.module.css'
import creatImg from '../../../public/create.jpg'
import Image from 'next/image'
const CreateBlog = () => {
    const CLOUD_NAME = 'dxizw3qvz'
    const UPLOAD_PRESET = 'my_blog_project-webdev'

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState("")
    const [sem, setSem]= useState("")
    const [photo, setPhoto] = useState('')

    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>
            Access Denied
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!photo || !title || !category || !desc || !sem){
            toast.error("All fields are required")
            return
        }

        try {
          const imageUrl = await uploadImage()
          
          const res = await fetch(`http://localhost:3000/api/blog`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}` 
            },
            method: 'POST',
            body: JSON.stringify({title,desc,category,sem,imageUrl,authorId: session?.user?._id})
          })

          if(!res.ok){
            throw new Error("Error occured")
          }

          const blog = await res.json()

          router.push(`/blog/${blog?._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
          })

          const data = await res.json()

          const imageUrl = data['secure_url']

          return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.logindiv}>
                <Image className={classes.img} src={creatImg}/>
            </div>
            <div className={classes.wrapper}>
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <select value={category} placeholder='Select Categorie' onChange={(e) => setCategory(e.target.value)}>
                        <option value="Web Developement">Web Developement</option>
                        <option value="Android Development">Android Development</option>
                        <option value="Arificial intelligence">Arificial intelligence</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Java">Java</option>
                        <option value="C/C++">C/C++</option>
                    </select>
                    <select value={sem} placeholder='Select Semester' onChange={(e) => setSem(e.target.value)}>
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="4th Semester">4th Semester</option>
                        <option value="5th Semester">5th Semester</option>
                        <option value="6th Semester">6th Semester</option>
                        <option value="7th Semester">7th Semester</option>
                        <option value="8th Semester">8th Semester</option>

                    </select>
                    <label htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                  <button className={classes.createBlog}>Create</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog







// const CLOUD_NAME= 'dxizw3qvz'
// ULOAD_PRESET='my_blog_project-webdev'