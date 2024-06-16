import  { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../UserContext";
import MessageIcon from '../assets/icons/MessageIcon';
import UserIcon from '../assets/icons/UserIcon';
import LogoIcon from '../assets/icons/LogoIcon';

function Header() {
    const { user } = useContext(UserContext)

  return (
 
            <header className='   flex flex-row-reverse justify-between'>
            <Link to="/" className='flex flex-row-reverse items-center gap-2'>
                <LogoIcon></LogoIcon>
                <span className='font-bold text-xl text-primary'>پویابووک</span>
            </Link>
            <div className='flex items-center gap-2  justify-end'>
                <div className='bg-lightGrey rounded-full p-4 py-2 border flex gap-2 border-l-gray-500'>
                    <MessageIcon size={24}></MessageIcon>
                    <Link to={user? "/account" : "/login"} className='flex gap-2' >
                        <UserIcon size={24}></UserIcon>
                            { !!user && (
                            <span>{user.name}</span>
                            )}
                    </Link>

                </div>
            </div>
      
    </header>

  )
}

export default Header