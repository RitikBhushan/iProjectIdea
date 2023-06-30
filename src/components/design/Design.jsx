import React from 'react'
import Image from 'next/image'
import classes from './design.module.css'
import img1 from '../../../public/design1.jpg'

const Design = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.word}>
          <h1>Are you looking for project?
          </h1>
          <div className={classes.dis}>
          <h3>Place where you can share your project-related ideas, and if someone is interested,
             they can comment and request to join. Submit your project idea and find people to collaborate with.
             Please log in before proceeding further.</h3>
          </div>
          <div className={classes.scrolldown}></div>
        </div>
        <div className={classes.img}>
           <Image className={classes.resImg} src={img1} width='600' height='520'/>
        </div>
      </div>
    </>
  )
}

export default Design
