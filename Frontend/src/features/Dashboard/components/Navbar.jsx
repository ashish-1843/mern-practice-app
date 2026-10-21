import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BookA, BookOpen, LogOut, User } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import '../dashboard.css'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'react-toastify'

const Navbar = () => {

    const { user, handleLogout } = useAuth();

    const logout = async () => {
        try {
            await handleLogout();
            toast.success("Logout successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    }

    return (
        <nav className='app-navbar border-b border-gray-200 bg-transparent'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <BookOpen className='h-6 w-6 text-green-600' />
                    <h1 className='font-bold text-xl'><span className='text-green-600'>Notes</span>App</h1>
                </div>
                <div className='flex items-center'>
                    <ul className='nav-links flex gap-3 items-center text-lg font-semibold'>
                        <li className='nav-secondary-link'>Features</li>
                        <li className='nav-secondary-link'>Pricing</li>
                        <li className='nav-secondary-link'>About</li>
                        {
                            user ?
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='cursor-pointer !p-0 !m-0'>
                                        <Avatar>
                                            <AvatarFallback>ON</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-35 h-30 !mt-3 !p-1'>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel className='text-base'>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem className='text-base'><User />Profile</DropdownMenuItem>
                                            <DropdownMenuItem className='text-base'><BookA />Notes</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className='text-base cursor-pointer'
                                                onClick={logout}
                                            ><LogOut />Logout</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu> :
                                <Link to={'/login'}>
                                    <li>Login</li></Link>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar