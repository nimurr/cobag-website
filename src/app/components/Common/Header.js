'use client'; // Ensure this is a client-side component
// import baseUrl from '@/app/redux/api/baseUrl';
// import { useGetUserQuery } from '@/app/redux/Features/Auth/getUser';
// import i18n from '@/app/utils/i18';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa6';
import { IoMenu } from "react-icons/io5";
import { MdContentPasteSearch } from 'react-icons/md';
import { PiAirplaneTiltThin } from 'react-icons/pi';
import { RxCross2 } from "react-icons/rx";
import baseUrl from '../../redux/api/baseUrl';
import { useGetUserQuery } from '../../redux/Features/Auth/getUser';
import i18n from '../../utils/i18';

const Header = () => {

    const { data, isLoading: userLoading } = useGetUserQuery();

    console.log(data?.user?.profileImage);
    console.log(baseUrl + data?.user?.profileImage);



    const { t } = i18n;

    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
    const pathname = usePathname(); // Get the current route path

    // Function to check if a link is active
    const isActive = (path) => {
        // Normalize both the current path and link path for accurate matching
        return pathname === path || pathname?.startsWith(path);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu state
    };



    console.log(baseUrl + '' + data?.user?.profileImage);

    return (
        <header className="fixed  top-0 py-10 left-0 w-full bg-white flex items-center justify-between px-5 xl:px-48 md:px-10  z-[99] ">
            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-5 ">
                <li className='font-semibold text-[#4d4d4d]'>{t('navWhatdoWYouWantTo')}</li>
                <li className="relative group cursor-pointer ">
                    <span className='font-semibold text-primary group-hover:bg-primary duration-500 group-hover:text-white flex items-center gap-10 py-4 px-4  m rounded-full navbar-item-hover z-[9999]'>
                        <FaChevronRight className='group-hover:hidden text-white z-[9999] ' />
                        <FaArrowRight className='hidden group-hover:block text-white z-[9999] ' />
                        {/* {t('Discoverourservices')} */}
                    </span>
                    <ul className="absolute hidden group-hover:block top-12 left-0 bg-white shadow-md rounded-md min-w-96">



                        <li >
                            <Link
                                className={`font-medium hover:font-semibold hover:bg-slate-200 min-w-48 hover:text-primary py-3 px-5 flex items-center gap-1`}
                                href={'/itravel'}
                            >
                                {/* I want to travel abroad */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane text-gray-600"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>  {t('NavbarItem1')}
                            </Link>
                        </li>

                        {/* <li>
                            <Link
                                className={`font-medium hover:font-semibold hover:bg-slate-200 min-w-48 hover:text-primary py-3 px-5 block `}
                                href={'/isend'}
                            >
                                {t('NavbarItem4')}
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                className={`font-medium hover:font-semibold hover:bg-slate-200 min-w-48 hover:text-primary py-3 px-5 flex items-center gap-1`}
                                href={'/ishop'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search text-gray-600"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>{t('NavbarItem3')}
                            </Link>
                        </li>



                        <li>
                            <Link
                                className={`font-medium hover:font-semibold hover:bg-slate-200 min-w-48 hover:text-primary py-3 px-5 flex items-center gap-1`}
                                href={'/ishop#shop'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-search text-gray-600"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><circle cx="5" cy="14" r="3"></circle><path d="m9 18-1.5-1.5"></path></svg> I want to see the requests
                            </Link>
                        </li>


                        <li>
                            <Link
                                className={`font-medium hover:font-semibold hover:bg-slate-200 min-w-48 hover:text-primary py-3 px-5 flex items-center gap-1`}
                                href={'/itravel'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-up text-gray-600"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M12 12v6"></path><path d="m15 15-3-3-3 3"></path></svg>  I want to submit an application
                            </Link>
                        </li>


                    </ul>
                </li>
            </ul>

            <div className="flex items-center gap-3  md:hidden ">
                {/* <Link
                    href={'/commission'}
                    className="hidden md:block bg-gradient-to-r text-white from-[#2F387F] to-[#C6FADB] px-6 py-3 rounded-full font-semibold  border"
                >
                    {t('NavCommission')}
                </Link> */}


                {
                    !data?.user && <Link href={'/login'}>
                        <button className='  rounded-full font-semibold text-[#19191b] '>
                            {/* {t('NavLogin')} */}
                            My profile
                        </button>
                    </Link>
                }

                {/* when user is available then show it else not */}

                {
                    data?.user && <div className="relative group cursor-pointer">


                        <img className='w-16 h-16 rounded-full border-4 border-[#161d6f]' src={data?.user?.profileImage ? baseUrl + data?.user?.profileImage : 'https://res.cloudinary.com/nerob/image/upload/v1742636667/ForBdcolling/neyqgnpepzdve7cm12h3.png'} alt="" />

                        <div className=" bg-slate-100 p-2 rounded-lg absolute sm:top-16 sm:right-0 -right-52 min-w-72 hidden group-hover:block">
                            <Link
                                href={'/dashboard/profile'}
                                className="border-2 text-center block my-3 w-full hover:bg-[#161d6f] hover:text-white duration-300 border-[#161d6f] rounded-full px-10 py-2 text-[#161d6f]"
                            >
                                {t('NavProfile')}
                            </Link>
                            <button
                                className="border-2 text-center block my-3 w-full hover:bg-[#161d6f] hover:text-white duration-300 border-[#161d6f] rounded-full px-10 py-2 text-[#161d6f]"
                            >
                                Switch to Sender
                            </button>
                        </div>
                    </div>
                }


            </div>

            {/* Logo Section (Always Visible) */}
            <Link href={'/'} className="w-[100px] md:w-[120px] block xl:-ml-[200px] -ml-7 cursor-pointer">
                <Image
                    src="/Images/NewSection/cobag-logo.png"
                    alt="Company Logo"
                    width={80}
                    height={40}
                    layout="responsive"
                />

            </Link>


            {/* bg-gradient-to-r text-white from-[#2F387F] to-[#C7FFD8] w-full text-center py-2 rounded-full font-semibold  border */}

            {/* User Icon Section (Always Visible) */}
            <div className="md:flex items-center gap-3  hidden ">
                {/* <Link
                    href={'/commission'}
                    className="hidden md:block bg-gradient-to-r text-white from-[#2F387F] to-[#C6FADB] px-6 py-2 rounded-full font-semibold  border"
                >
                    {t('NavCommission')}
                </Link> */}


                {
                    !data?.user && <Link href={'/login'}>
                        <button className='rounded-full font-medium text-[#161618] px-6 py-2 duration-300 hover:bg-gray-100'>
                            {/* {t('NavLogin')} */}
                            My profile
                        </button>
                    </Link>
                }

                {/* when user is available then show it else not */}

                {
                    data?.user && <div className="relative group cursor-pointer">


                        <img className='w-16 h-16 rounded-full border-4 border-[#161d6f]' src={data?.user?.profileImage ? baseUrl + data?.user?.profileImage : 'https://res.cloudinary.com/nerob/image/upload/v1742636667/ForBdcolling/neyqgnpepzdve7cm12h3.png'} alt="" />

                        <div className=" bg-slate-100 p-2 rounded-lg absolute sm:top-16 sm:right-0 -right-20 min-w-72 hidden group-hover:block">
                            <Link
                                href={'/dashboard/profile'}
                                className="border-2 text-center block my-3 w-full hover:bg-[#161d6f] hover:text-white duration-300 border-[#161d6f] rounded-full px-10 py-2 text-[#161d6f]"
                            >
                                {t('NavProfile')}
                            </Link>
                            <button
                                className="border-2 text-center block my-3 w-full hover:bg-[#161d6f] hover:text-white duration-300 border-[#161d6f] rounded-full px-10 py-2 text-[#161d6f]"
                            >
                                Switch to Sender
                            </button>
                        </div>
                    </div>
                }


            </div>

            {/* Mobile Navigation Button */}
            <button
                onClick={toggleMenu}
                className="p-2 border rounded-full text-black md:hidden"
            >
                {!isMenuOpen ? <IoMenu className="md:text-3xl text-2xl" /> : <RxCross2 className="md:text-3xl text-2xl" />}
            </button>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-28 right-0 w-full bg-white shadow-lg py-4 px-5 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ height: '100vh' }}
            >
                <ul className="space-y-4">
                    {[
                        { path: '/itravel', label: t('NavbarItem1'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane text-gray-600"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg> },
                        // { path: '/isend', label: 'I want to buy abroad' },  // Updated unique path
                        { path: '/ishop', label: t('NavbarItem3'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search text-gray-600"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> },
                        { path: '/ishop#shop', label: ' I want to see the requests', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-search text-gray-600"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><circle cx="5" cy="14" r="3"></circle><path d="m9 18-1.5-1.5"></path></svg> },
                        { path: '/itravel', label: ' I want to submit an application', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-up text-gray-600"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M12 12v6"></path><path d="m15 15-3-3-3 3"></path></svg> },
                        // { path: '/isend', label: 'I want to send a parcel' },
                    ].map((item, index) => (
                        <li key={index}>
                            <Link
                                className={`font-medium hover:font-semibold hover:bg-slate-200 min-w-48 hover:text-primary py-3 px-5 flex items-center gap-2 ${isActive(item.path) ? '' : 'text-black'}`}
                                href={item.path}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.icon}{item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile User Section */}
                <div className="mt-10 flex flex-col items-center gap-3">
                    {/* <Link
                        href={'/commission'}
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-gradient-to-r text-white from-[#2F387F] to-[#C7FFD8] w-full text-center py-2 rounded-full font-semibold  border"
                    >
                        0% Commission
                    </Link> */}

                    {/* <Image
                        src="/Images/header-user.svg"
                        alt="User Icon"
                        width={40}
                        height={40}
                        className="rounded-full"
                    /> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
