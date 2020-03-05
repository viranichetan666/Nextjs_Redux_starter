import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <div className="pa15 dark flex-x center">
            <div className="pr15">
              <Link href='/'>
                <a>Home</a>
              </Link>
            </div>
            <div className="pr15">
              <Link href='/about'>
                <a>About</a>
              </Link>
            </div>
            <div className="pr15">
              <Link href='/login'>
                <a>Login</a>
              </Link>
            </div>
            <div className="pr15">
              <Link href='/signup'>
                <a>Signup</a>
              </Link>
            </div>
        </div>
    )
}

export default Header