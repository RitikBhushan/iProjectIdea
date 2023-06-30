import React from 'react'
import classes from './footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import github from '../../../public/github.png'
import Linkedin from '../../../public/linkedin.png'
import instagram from '../../../public/instagram.png'
import website from '../../../public/website.png'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
          This is a website where you can share your project-related ideas, and if someone is interested,
             they can comment and request to join. Submit your project idea and find people to collaborate with. <br />
             **This website is under Developing stage**
             
          </p>
        </div>
        <div className={classes.col}>
          <h2 className={classes.resh2}>Contacts</h2>
          <Link href="https://github.com/RitikBhushan">
            <Image className={classes.git} src={github}/>
            
          </Link>
          <Link href="https://www.linkedin.com/in/ritik-bhushan-2b2910224/">
            <Image className={classes.git} src={Linkedin}/>
            
          </Link>
          
        </div>
        <div className={classes.col1}>
          
          <Link href="">
            <Image className={classes.git} src={website}/>
            
          </Link>
          <Link href="https://www.instagram.com/ritikbhushan/">
            <Image className={classes.git} src={instagram}/>
            
          </Link>
          
        </div>
        <a href="https://www.buymeacoffee.com/bhushanji"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=bhushanji&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
      </div>
    </footer>
  )
}

export default Footer


