'use client';
import { useEffect } from 'react';
import {  useRouter } from 'next/navigation';
import Link from 'next/link';
import { FilterBox } from '../imports/ComponentExports'
import { deleteCookie } from 'cookies-next';
import { useSelector } from 'react-redux'
import Logo from '../app/assets/youtubelogo.png'
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { setUser, setIsAuthenticated } from '../app/redux/slices/UserSlice'
import axios from 'axios';

const Navbar = () => {

    /* getting the user information from the global state */
    const { user, isAuthenticated } = useSelector(state => state.User);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        import('preline')

        console.log({ user, isAuthenticated });

        const token = localStorage.getItem('token');

        /* if token is available then we must always show user information in the navbar right (to protect user info loss on hard reloading) */
        async function fetchUserInfo(token) {
            console.log("hello from navbar ");
            /* make the api call to get the user information here */
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/user`,
                    { headers: { 'Authorization': `Bearer ${token}` } });

                const { user } = response.data;

                console.log('Inside app folder page : ', { user });

                dispatch(setUser(user));
                dispatch(setIsAuthenticated(true));


            } catch (error) {
                console.log("some error occured while fetching the user information in navbar");
            }
        }

        if (token) {
            localStorage.setItem('token', token);
            /* also fetch user information and set it to global state */
            fetchUserInfo(token);
        }else{
            router.push('/login');
        }
    }, []);

    

    /* Handle Logout function to come up here */
    const handleLogout = () => {
        localStorage.removeItem('token');

        /* deleting the cookies */
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('isLoggedIn');
        deleteCookie('expirationTime');

        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));

        router.push('/login');
    }

    return (
        <>

            {isAuthenticated ? <><header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
                <nav className="  border-black relative flex flex-wrap basis-full items-center w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">


                    <div className="pl-3 sm:pl-2 sm:border-l sm:border-gray-300 dark:border-gray-700">
                        <button type="button" className="p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800 " data-hs-overlay="#navbar-secondary-content" aria-controls="navbar-secondary-content" aria-label="Toggle navigation">

                            <svg className="hs-overlay-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                            <svg className="hs-overlay-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>

                        </button>
                    </div>

                    <div className="flex items-center justify-between flex-row-reverse">
                        <a className="flex-none text-xl font-semibold  border-black dark:text-white" href="#" aria-label="Brand">
                            <Image
                                src={Logo}
                                width={80}
                                height={80}
                                alt="Picture of the author"
                                onClick={() => router.push('/')}
                            />

                        </a>
                    </div>


                    <div id="navbar-offcanvas-example" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r basis-full grow sm:order-2 sm:static sm:block sm:h-auto sm:max-w-none sm:w-auto sm:border-r-transparent sm:transition-none sm:translate-x-0 sm:z-40 sm:basis-auto dark:bg-gray-800 dark:border-r-gray-700 sm:dark:border-r-transparent hidden" tabIndex="-1" data-hs-overlay-close-on-resize>
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">

                            < Link className="font-medium  text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="/" aria-current="page" > Home</ Link>
                            <Link className="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="/form"
                            >Upload</Link>
                            <Link className="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="/myplaylist" >
                                Your Playlists
                            </Link>


                            {/* user menu starts */}

                            <div className="hs-dropdown inline-flex relative">
                                <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle py-1 pl-1 pr-3 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">

                                    <Image
                                        src={user?.picture}
                                        height={80}
                                        width={80}
                                        alt='Picture of the author'
                                        className='w-10 h-10 rounded-full'
                                    />

                                    <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">{user?.name}</span>
                                    <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>

                                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 translate-x-14" aria-labelledby="hs-dropdown-custom-trigger" onClick={handleLogout}>
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                        Logout
                                    </a>
                                </div>


                            </div>

                            {/* user menu ends  */}
                        </div>
                    </div>

                    <div className="flex items-center ml-auto sm:ml-0 sm:order-3">
                        <div className="sm:hidden">
                            <button type="button" className="p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#navbar-offcanvas-example" aria-controls="navbar-offcanvas-example" aria-label="Toggle navigation">
                                Menu
                                <svg className="hs-overlay-open:hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </nav>
            </header >

                <div id="navbar-secondary-content" className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700" tabIndex="-1">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                            Filters
                        </h3>

                        {/* cross button  */}
                        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800 border-2 border-pink-700" data-hs-overlay="#navbar-secondary-content">

                            <span className="sr-only">Close offcanvas</span>

                            {/* cross icon to close the sidebar  */}
                            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4">
                        <div className="text-gray-800 dark:text-gray-400">
                            <FilterBox />
                        </div>
                    </div>
                </div> </> : <div className='text-center flex items-center absolute '>
                <Image
                    src={Logo}
                    width={80}
                    height={80}
                    alt="Picture of the author"
                />
                <div className='text-xl text-bold'>

                    TubeSense
                </div>
            </div>}
        </>
    )
}

export default Navbar





