'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import classes from './edit.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { AiOutlineFileImage } from 'react-icons/ai'

const Edit = (ctx) => {
    const CLOUD_NAME = 'dxizw3qvz'
    const UPLOAD_PRESET = 'my_blog_project-webdev'
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("Nature")
    const [sem, setSem]= useState("")
    const [photo, setPhoto] = useState("")
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`)

            const blog = await res.json()

            setTitle(blog.title)
            setDesc(blog.desc)
            setCategory(blog.category)
            setSem(blog.sem)
        }
        fetchBlog()
    }, [])

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

        if(title === '' || category === '' || desc === '' || sem === ''){
            toast.error("All fields are required")
            return
        }

        try {
            let imageUrl = null
            if(photo){
                imageUrl = await uploadImage()
            }

            const body = {
                title, 
                desc, category,sem
            }

            if(imageUrl != null){
                body.imageUrl = imageUrl
            }
            
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method: "PUT",
                body: JSON.stringify(body)
            })

            if(!res.ok){
                throw new Error("Error has occured")
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
            <div className={classes.wrapper}>
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <input value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={desc} placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Web Developement">Web Developement</option>
                        <option value="Android Development">Android Development</option>
                        <option value="Arificial intelligence">Arificial intelligence</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Java">Java</option>
                        <option value="C/C++">C/C++</option>
                    </select>
                    <select value={sem} onChange={(e) => setSem(e.target.value)}>
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
                    <button className={classes.createBlog}>Edit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit