'use client';

import VideoAndCard from '@/app/components/Isend/VideoAndCard';
import CouriersAvailable from '../../components/Ishop/CouriersAvailable';
import HowDoesWork from '../../components/Ishop/HowDoesWork';
import React, { useEffect, useRef, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiCalendar, CiDollar, CiLocationOn, CiUser } from 'react-icons/ci';
import { IoAddCircleOutline, IoSearchOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'; // Corrected import for IoSearchOutline
import PopularProducts from '@/app/components/Ishop/PopularProducts';
import i18n from '@/app/utils/i18';
import { useSearchIShopMutation, useSearchItravelMutation } from '@/app/redux/Features/Search/searchItravel';
import toast, { Toaster } from 'react-hot-toast';
import { FaBox, FaEuroSign, FaRegClock, FaStar, FaToggleOff, FaToggleOn } from 'react-icons/fa6';
import { IoIosNotificationsOutline, IoMdCheckbox, IoMdInformationCircle, IoMdInformationCircleOutline, IoMdTrain } from 'react-icons/io';
import { CiImageOn } from "react-icons/ci";
import { useCreateIshopMutation, useGetAllIshopQuery } from '@/app/redux/Features/Ishop/ishop';
import { useGetAllPostQuery } from '@/app/redux/Features/Itravel/createPlane';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { usePaymentMutation } from '@/app/redux/Features/payment/createPayment';
import { MdVerifiedUser } from 'react-icons/md';
import { FiMessageSquare } from 'react-icons/fi';
import baseUrl from '@/app/redux/api/baseUrl';
import { LuPlane } from 'react-icons/lu';
import { useGetSingleUserQuery } from '@/app/redux/Features/Auth/getUser';
import { useCreateSingleChatMutation } from '@/app/redux/Features/message/getMessage';
import { Spin, Tooltip } from 'antd';
import moment from 'moment';



const Page = () => {

    const { t } = i18n;

    const { data: getAllData } = useGetAllIshopQuery();

    // console.log(getAllData);

    const [selectedOption, setSelectedOption] = useState('1'); // State to manage the selected radio button

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value); // Update the selected option
    };

    const [isFlexible, setIsFlexible] = useState(false);
    const handleFlexibleCheckboxChange = (e) => {
        setIsFlexible(e.target.checked); // Update state when checkbox is toggled
    };



    const [showFlexibleDate, setShowFlexibleDate] = useState(false); // State for Flexible Dates checkbox
    const [formValues, setFormValues] = useState({
        departureCity: '',
        arrivalCity: '',
        desiredDate: '',
        alternateDate: '',
    });

    const handleCheckboxChange = (e) => {
        setShowFlexibleDate(e.target.checked); // Toggle state for Flexible Dates

    };

    const handleInputChange = (field, value) => {
        setFormValues({ ...formValues, [field]: value }); // Update form values dynamically
    };

    // ================ search ================

    const [searchIshop, { isLoading }] = useSearchItravelMutation();
    const [searchTerm, setSearchTerm] = useState([]);

    // console.log(searchTerm);

    const [postIshop, { isLoading: isPostLoading }] = useCreateIshopMutation();


    const [allSearchResutl, setAllSearchResutl] = useState([]);

    // console.log('allSearchResutl', allSearchResutl);

    const [ishopAllData] = useSearchIShopMutation();

    const [count, setCount] = useState(false);


    const handleSubmit = async (e) => {

        setCount(true);

        e.preventDefault();
        const form = e.target;
        const departureCity = form?.departureCity?.value || '';
        const arrivalCity = form?.arrivalCity?.value || '';
        const departureDate = form?.desiredDate?.value || '';
        const arrivalDate = form?.desiredFlexibleDate?.value || ''; // Add this line
        const maxpurchAmountAdvance = Number(form?.desiredPrice?.value) || 0; // Add this line
        const packageWeight = Number(form?.packageWeight?.value) || 0;
        const name = form?.name?.value || '';
        const quantity = Number(form?.quantity?.value) || 0;
        const weight = Number(form?.weight?.value);




        if (selectedOption === '1' || selectedOption == '2') {

            const formData = {
                transportMode: 'all',
                departureCity,
                arrivalCity,
                departureDate,
                arrivalDate,
                price: maxpurchAmountAdvance || 0,
                totalSpace: packageWeight
            };

            console.log('formData :', formData);




            const fromDataPost = new FormData();
            if (showFlexibleDate) {
                fromDataPost.append('departureCity', departureCity);
                fromDataPost.append('arrivalCity', arrivalCity);
                fromDataPost.append('departureDate', departureDate);
                fromDataPost.append('arrivalDate', arrivalDate);
                fromDataPost.append('PurchasePrice', maxpurchAmountAdvance);
                fromDataPost.append('productName', name);
                fromDataPost.append('quantity', quantity);
                fromDataPost.append('uploadImage', form.image.files[0]);
            }

            if (departureDate === '' || arrivalDate === '' || packageWeight === 0 || !maxpurchAmountAdvance) {
                // Determine which specific field is missing and show the corresponding error message

                if (arrivalCity === '') {
                    return toast.error('Please input a deliver city.');
                }
                if (departureDate === '') {
                    return toast.error('Please select a departure date.');
                }
                if (packageWeight === 0) {
                    return toast.error('Please enter the package weight.');
                }
                if (!maxpurchAmountAdvance) {
                    return toast.error('Please enter the purchase price.');
                }
            }


            try {
                if (!showFlexibleDate) {
                    const response = await searchIshop(formData).unwrap();
                    console.log(response);
                    if (response?.success) {
                        setAllSearchResutl(response?.data)
                        router.push(`/ishop#routes`)
                        toast.success(`Search successfully !! See ${response?.data?.length} Item`);
                    }
                }
                else {
                    const response = await postIshop(fromDataPost).unwrap();
                    const response2 = await searchIshop(formData).unwrap();


                    console.log(response);

                    //======== this is for search ===========
                    if (response2?.success) {
                        setAllSearchResutl(response2?.data)
                        router.push(`/ishop#routes`)
                        toast.success(`Search successfully !! See ${response2?.data?.length} Item`);
                    }
                    else if (!response2?.success) {
                        toast.error('Faild to Search Try again')
                    }


                    //======== this is for post ===========
                    if (response?.success) {
                        console.log(response?.data);
                        setSearchTerm(response?.data)
                        toast.success(`Post successfully `);
                    }
                    else if (!response?.success) {
                        toast.error('Faild to Post Try again')
                    }
                }


            } catch (error) {
                console.log(error);
            }
        }
        if (selectedOption == '3' || selectedOption == '4' || selectedOption == '5') {
            const formData = {
                departureCity,
                arrivalCity,
                departureDate,
                arrivalDate,
                totalSpace: packageWeight,
            };


            if (!packageWeight) {
                return toast.error('Please enter the package weight.');
            }


            console.log(formData);

            const fromDataPost = new FormData();
            if (showFlexibleDate) {
                fromDataPost.append('departureCity', departureCity);
                fromDataPost.append('arrivalCity', arrivalCity);
                fromDataPost.append('departureDate', departureDate);
                fromDataPost.append('arrivalDate', arrivalDate);
                fromDataPost.append('PurchasePrice', maxpurchAmountAdvance);
                fromDataPost.append('productName', name);
                fromDataPost.append('quantity', quantity);
                fromDataPost.append('uploadImage', form.image.files[0]);
            }

            try {
                if (!showFlexibleDate) {
                    const response = await searchIshop(formData).unwrap();
                    console.log(response);
                    if (response?.success) {
                        router.push(`/ishop#routes`)
                        setAllSearchResutl(response?.data)
                        toast.success(`Search successfully !! See ${response?.data?.length} Item`);
                    }
                }
                else {

                    const response = await postIshop(fromDataPost).unwrap();
                    const response2 = await searchIshop(formData).unwrap();

                    console.log(response);

                    //======== this is for search ===========
                    if (response2?.success) {
                        router.push(`/ishop#routes`)
                        setAllSearchResutl(response2?.data)
                        toast.success(`Search successfully !! See ${response2?.data?.length} Item`);
                    }
                    else if (!response2?.success) {
                        toast.error('Faild to Search Try again')
                    }


                    //======== this is for post ===========
                    if (response?.success) {
                        console.log(response?.data);
                        setSearchTerm(response?.data)
                        toast.success(`Post successfully `);
                    }
                    else if (!response?.success) {
                        toast.error('Faild to Post Try again')
                    }

                }
            } catch (error) {
                console.log(error);
            }
        }
    }



    // Create a reference to the section you want to scroll to
    const routesSectionRef = useRef(null);


    const router = useRouter();
    const user = useUser();
    // console.log(user?.subscription === false);
    const [payment20Persent] = usePaymentMutation();

    const [creatChat] = useCreateSingleChatMutation();


    const [currency, setCurrency] = useState('usd');
    useEffect(() => {
        const getcurrency = localStorage.getItem('currency');
        setCurrency(getcurrency);
    }, [currency]);


    const { data: userData } = useGetSingleUserQuery(user?._id);
    const userDetails = userData?.data;



    const handleGoMessage = async (request) => {


        const formData = new FormData();
        formData.append("amount", `${Number(5 * 100)}`);
        formData.append("cobagProfit", request?.cobagProfit);
        formData.append("currency", currency !== 'Euro' ? 'usd' : 'eur' || 'usd');
        formData.append("paymentMethodId", "pm_card_visa");
        formData.append("isTwentyPercent", 'true');
        formData.append("senderId", user?._id);
        formData.append("sellKgId", request?._id);
        formData.append("travellerId", request?.user?._id);

        console.log(user);

        if (!userDetails?.isTwentyPercent) {

            toast.error('Please pay 5$ for Sucure All Transection');
            const res = await payment20Persent(formData).unwrap();
            console.log('paymnent ', res);

            if (res) {

                // window.location.href = res?.data?.url;
                return router.push(res?.url);
            }
        }

        console.log(request?.user?._id);

        const createChatData = {
            receiverId: request?.user?._id,
            sellKgId: request?._id
        }

        if (userDetails?.isTwentyPercent) {

            const res = await creatChat(createChatData).unwrap();
            console.log('chat Data ', res?.data);
            if (res?.code === 201) {

                // window.location.href = res?.data?.url;
                return router.push(`/message/${res?.data?._id}`);
            }
        }


        // toast.success('Message sent successfully');
    }


    const [isAnywhere, setIsAnywhere] = useState(false);


    const [isNotification, setIsNotification] = useState(false);
    const handleNotificationShowHide2 = () => {
        setIsNotification(prev => !prev);

        // Scroll to the section smoothly
        if (routesSectionRef.current) {
            routesSectionRef.current.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'start' // Scroll to the top of the section
            });
        }
    };


    console.log(allSearchResutl);

    return (
        <div>
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} containerStyle={{ zIndex: 999999 }} />
            <div className='bg-[url("/Images/Ishop/banner.png")] w-full min-h-[90vh] duration-500 bg-cover bg-center'>
                <div>
                    <div className='bg-[#000d1a8a] min-h-[90vh] md:py-32 py-20'>
                        <div className='lg:w-2/4 mx-auto text-center'>
                            <h1 className='md:text-4xl text-3xl font-semibold text-white'>
                                {/* {t('worldPurchasesInYourBasket5454')} */}
                                The world's purchases in your shopping cart
                            </h1>
                            <p className='text-white lg:text-xl lg:mt-5 mt-3'>
                                {/* {t('whatYouCantFindAtHome5454')} */}
                                {/* What you can't find at home, our courier travelers will bring it to you! The world has never been so close */}
                                At local price, no customs fees, instant delivery within hours
                            </p>
                        </div>
                        <form className="lg:w-2/4 w-11/12 mx-auto mt-10 bg-[#ffffffab] backdrop-blur-lg lg:p-10 p-5 rounded-lg" onSubmit={handleSubmit}>
                            <div className='mb-5'>
                                <h2 className='md:text-3xl text-2xl font-semibold text-primary'>Find a traveler for:</h2>

                                <div className="space-y-4 my-5">
                                    {/* Radio Button 1 */}
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            id="radio1"
                                            value="1"
                                            defaultChecked
                                            className="h-4 w-4"
                                            checked={selectedOption === '1'}
                                            onChange={handleRadioChange}
                                        />
                                        <label htmlFor="radio1" className=" text-sm cursor-pointer">Buying abroad for myself</label>
                                        <Tooltip title="Tip: Compare prices for your item in countries around the world. Then find a traveler in that country to buy the item at the local price, with no customs fees and instant delivery.">
                                            <span className="text-blue-500 cursor-pointer">
                                                <IoMdInformationCircleOutline />
                                            </span>
                                        </Tooltip>
                                    </div>

                                    {/* Radio Button 2 */}
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            id="radio2"
                                            value="2"
                                            className="h-4 w-4"
                                            checked={selectedOption === '2'}
                                            onChange={handleRadioChange}
                                        />
                                        <label htmlFor="radio2" className=" text-sm cursor-pointer">Buy and send to a loved one abroad</label>
                                        <Tooltip title="Tip: Compare prices for your item in countries around the world. Then find a traveler in that country to buy the item at the local price, with no customs fees and instant delivery.">
                                            <span className="text-blue-500 cursor-pointer">
                                                <IoMdInformationCircleOutline />
                                            </span>
                                        </Tooltip>
                                    </div>

                                    {/* Radio Button 3 */}
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            id="radio3"
                                            value="3"
                                            className="h-4 w-4"
                                            checked={selectedOption === '3'}
                                            onChange={handleRadioChange}
                                        />
                                        <label htmlFor="radio3" className=" text-sm cursor-pointer">Send documents abroad (passport, birth certificate, etc.)</label>
                                        <Tooltip title="Passport, driver's license, birth certificate, etc. Give your documents to a traveler upon departure at the airport or train station.">
                                            <span className="text-blue-500 cursor-pointer">
                                                <IoMdInformationCircleOutline />
                                            </span>
                                        </Tooltip>

                                    </div>

                                    {/* Radio Button 4 */}
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            id="radio4"
                                            value="4"
                                            className="h-4 w-4"
                                            checked={selectedOption === '4'}
                                            onChange={handleRadioChange}
                                        />
                                        <label htmlFor="radio4" className=" text-sm cursor-pointer">Receiving documents from abroad (passport, birth certificate, etc.)</label>
                                        <Tooltip title="Passport, driver's license, birth certificate, etc. A relative will give your documents to a traveler at the airport or train station, who will bring them back to you.">
                                            <span className="text-blue-500 cursor-pointer">
                                                <IoMdInformationCircleOutline />
                                            </span>
                                        </Tooltip>
                                    </div>

                                    {/* Radio Button 5 */}
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            id="radio5"
                                            value="5"
                                            className="h-4 w-4"
                                            checked={selectedOption === '5'}
                                            onChange={handleRadioChange}
                                        />
                                        <label htmlFor="radio5" className=" text-sm cursor-pointer">Share my excess baggage on the same flight</label>
                                        <Tooltip title="Find a traveler on the same flight as you who has room in their suitcase to help you carry your excess baggage at a lower cost">
                                            <span className="text-blue-500 cursor-pointer">
                                                <IoMdInformationCircleOutline />
                                            </span>
                                        </Tooltip>

                                    </div>
                                </div>


                            </div>
                            <div className="mb-5">
                                <div className="grid lg:grid-cols-2 gap-4">
                                    {/* Departure City */}
                                    <div>
                                        <label className="block mb-2 font-semibold  text-[#474747]">
                                            {/* {t('cityOfPurchase5454')}  */}

                                            {
                                                selectedOption == '1' || selectedOption == '2' ? "City where the item was purchased" : "City of departure of documents"
                                            }

                                            <sup className='text-blue-500'><small> ( Optional )</small></sup></label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                name="departureCity"
                                                placeholder={t('enterDepartureCity5454')} // Your translation function
                                                className={`w-full py-2 px-10 border rounded bg-gray-100 focus:outline-none focus:ring-0 ${isAnywhere ? 'bg-gray-200' : ''}`}
                                                disabled={isAnywhere} // This disables the input when isAnywhere is true
                                            />

                                            <span className="absolute left-3 text-gray-400">
                                                <CiLocationOn className="text-2xl" />
                                            </span>
                                        </div>
                                        <div>
                                            <label className='flex items-center gap-2 mt-1' htmlFor="checkbox40">
                                                <input
                                                    onChange={() => setIsAnywhere(!isAnywhere)}
                                                    type="checkbox" name="" id="checkbox40" />
                                                <span className='flex items-center gap-2'>Anywhere
                                                    <Tooltip title="Tip: You can choose to send your item from anywhere in the world.">
                                                        <span className="text-blue-500 cursor-pointer">
                                                            <IoMdInformationCircleOutline />
                                                        </span>
                                                    </Tooltip>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Arrival City */}
                                    <div>
                                        <label className="block mb-2 font-semibold  text-[#474747]">
                                            {/* {t('deliveryCity5454')} */}
                                            Desired delivery date
                                            <sup className='text-red-500'> *</sup>
                                        </label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                name='arrivalCity'
                                                placeholder={t('enterArrivalCity5454')}
                                                className="w-full py-2 px-10 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                            />
                                            <span className="absolute left-3 text-gray-400">
                                                <CiLocationOn className="text-2xl" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 items-start gap-4 my-5">
                                    {/* Desired Date */}
                                    <div>
                                        <label className="block mb-2 font-semibold  text-[#474747]">{t('desiredDate5454')}
                                            <sup className='text-red-500'> *</sup>
                                        </label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="date"
                                                name='desiredDate'
                                                className="w-full py-2 px-10 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                            />
                                            <span className="absolute left-3 text-gray-400">
                                                <CiCalendar className="text-2xl" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Checkbox for Flexible Dates */}



                                    <div>

                                        <div className="flex items-center justify-between">
                                            {
                                                isFlexible &&
                                                <label className="block mb-2 font-semibold  text-[#474747]">
                                                    Flexible Dates
                                                    <sup className='text-red-500'> *</sup>
                                                </label>
                                            }

                                            <label htmlFor={`flexible`} className="flex font-semibold  text-[#474747] text-sm items-center gap-2 mb-2">
                                                <input
                                                    type="checkbox"
                                                    name="flexible"
                                                    id={`flexible`}
                                                    onChange={handleFlexibleCheckboxChange}
                                                />
                                                <span>Flexible Dates</span>
                                            </label>
                                        </div>
                                        {
                                            isFlexible &&
                                            <div className="">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="date"
                                                        name='desiredFlexibleDate'
                                                        className="w-full py-2 px-10 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                                    />
                                                    <span className="absolute left-3 text-gray-400">
                                                        <CiCalendar className="text-2xl" />
                                                    </span>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div>

                                {
                                    selectedOption == '1' || selectedOption == '2' ?

                                        <div>
                                            <label className="block mb-2 font-semibold  text-[#474747]">{t('Estimatedpurchaseprice')}
                                                <sup className='text-red-500'> *</sup>
                                            </label>
                                            <div className="relative flex items-center">
                                                <input
                                                    type="text"
                                                    name='desiredPrice'
                                                    placeholder={`Enter Your Price`}
                                                    className="w-full py-2 px-10 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                                />
                                                <span className="absolute left-3 text-gray-400">
                                                    <FaEuroSign className="text-xl" />
                                                </span>
                                            </div>
                                        </div>
                                        : ''
                                }


                                <div className='my-5'>
                                    <label className="block mb-2 font-semibold  text-[#474747]">
                                        {
                                            selectedOption == '1' || selectedOption == '2' ? 'Item weight (kg)' : 'Weight of documents (kg)'
                                        }
                                        <sup className='text-red-500'> *</sup>
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="number"
                                            name='packageWeight'
                                            placeholder={`0`}
                                            className="w-full py-2 pl-3 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                </div>


                                <div>



                                    <label id="flexibleDate" className="flex items-center gap-5 border-2 p-2 rounded-md border-[#b0e6e8] mt-10 font-semibold  text-[#474747]">
                                        <input
                                            type="checkbox"
                                            checked={showFlexibleDate}
                                            onChange={handleCheckboxChange}
                                            name="flexibleDate"
                                            className="w-4 h-4 text-primary focus:ring-0"
                                        />
                                        {/* {t('flexibleDates454')} */}
                                        <div>
                                            <h2 className='text-sm font-semibold'>I also want to post my ad and be contacted by a traveler</h2>
                                            <p className='text-xs font-normal'>By checking, you also post an ad visible to travelers and can be contacted, while continuing your search</p>
                                        </div>

                                    </label>



                                    {showFlexibleDate && (
                                        <div className="">
                                            <div>
                                                <label className="block mb-2 mt-5 text-sm font-semibold text-[#474747]">Product name</label>
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="text"
                                                        name='name'
                                                        placeholder="Product name"
                                                        className="w-full py-2 px-2 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 mt-5 text-sm font-semibold text-[#474747]">Quantity </label>
                                                <div className="relative  flex items-center">
                                                    <input
                                                        type="text"
                                                        name='quantity'
                                                        placeholder="quantity"
                                                        className="w-full py-2 px-2 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                                    />
                                                    {/* <span className="absolute left-3 text-gray-400">
                                                        <FaBox className="text-xl" />
                                                    </span> */}
                                                </div>
                                            </div>
                                            <div>
                                                {/* image upload  */}
                                                <label className="block mb-2 mt-5 text-sm font-semibold text-[#474747]">Upload image</label>
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="file"
                                                        name='image'
                                                        className="w-full py-2 px-2 border rounded bg-gray-100 focus:outline-none focus:ring-0"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                            {
                                !showFlexibleDate ?
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#98DED9] to-[#C7FFD8] text-primary px-4 py-2 rounded-md mt-4 font-semibold flex items-center justify-center gap-3 w-full"
                                    >
                                        <IoSearchOutline />
                                        {/* {t('searchForRoute454')} */}
                                        Find a courier
                                    </button>
                                    :
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#98DED9] to-[#C7FFD8] text-primary px-4 py-2 rounded-md mt-4 font-semibold flex items-center justify-center gap-3 w-full"
                                    >
                                        <IoAddCircleOutline />
                                        Post Now
                                        {
                                            isPostLoading && <Spin />
                                        }
                                    </button>
                            }

                        </form>
                    </div>
                </div>
            </div>



            {
                allSearchResutl.length < 1 && count &&
                <div className='my-10'>
                    <div className='lg:w-[80%] mx-auto mb-5 flex justify-center items-center gap-3'>
                        <p className='text-base font-semibold text-gray-600'>Be alerted</p>
                        <a href="#routes" onClick={handleNotificationShowHide2}>
                            {
                                isNotification ?
                                    <FaToggleOff className='text-4xl cursor-pointer text-primary' />
                                    :
                                    <FaToggleOn className='text-4xl cursor-pointer text-primary' />
                            }
                        </a>

                    </div>
                    <div className='md:w-[600px] mx-auto my-10 px-5 md:px-0'>
                        <div className=' grid md:grid-cols-2 gap-5'>
                            <div>
                                <img src="/Images/NewSection/available-routes.png" alt="" />
                            </div>
                            <div className='bg-gray-200 p-5 rounded-xl'>
                                <h2 className='text-2xl font-semibold text-primary flex items-center gap-2 mb-5'><span className='text-4xl'>😋</span> Victim of its success</h2>
                                <p>Oooh... Too bad, all the travelers have already sold their kilos for this destination. But don't worry! Sign up for the alert and be the first to know as soon as a new traveler offers their space.</p>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <p className='text-base my-3 text-gray-600'>Receive an alert for new places available:</p>
                            <div className='grid grid-cols-2 gap-5'>
                                <input className='w-full p-3 rounded-lg border border-gray-300' type="email" placeholder='Enter your email' name="email" id="" />
                                <button className='w-full p-3 rounded-lg bg-primary text-white flex items-center justify-center gap-2'><IoIosNotificationsOutline className='text-2xl' />Activate alert</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <section ref={routesSectionRef} id="routes" className="lg:w-[60%] w-[95%] mx-auto py-10">
                <h2 className="text-2xl font-semibold text-primary mt-10">Available routes</h2>

                {allSearchResutl.length > 0 ? (
                    allSearchResutl.map((item, index) => (
                        <div key={index} className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] relative rounded-lg md:p-10 p-5 my-5">
                            <div className="md:flex flex-wrap items-center justify-between">

                                <div>
                                    {/* <span className='py-1 px-3 capitalize font-semibold rounded-lg absolute left-2 top-2 text-[#0b2f9f] bg-[#f6f6fb]'>courier</span> */}
                                    <div className="flex items-center text-primary gap-3 font-medium">
                                        <div className="w-14 h-14 bg-[#f6f6fb] text-primary flex items-center justify-center rounded-lg">
                                            {item.transportMode === 'plane' ? (
                                                <LuPlane className="text-2xl" />
                                            ) : (
                                                <IoMdTrain className="text-2xl" />
                                            )}
                                        </div>
                                        <h2 className="capitalize">
                                            {item.transportType} {item.transportMode}
                                        </h2>
                                    </div>

                                    <div>
                                        <div className="flex gap-2 my-8">
                                            <CiLocationOn className="text-2xl" />
                                            <div>
                                                <p>{item.departureCity}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-2 text-sm">
                                                        <CiCalendar />
                                                        {item.departureDate}
                                                    </span>
                                                    <span className="flex items-center gap-2 ml-5 text-sm">
                                                        <FaRegClock />
                                                        {item.departureTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 my-8">
                                            <CiLocationOn className="text-2xl" />
                                            <div>
                                                <p>{item.arrivalCity}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-2 text-sm">
                                                        <CiCalendar />
                                                        {item.arrivalDate}
                                                    </span>
                                                    <span className="flex items-center gap-2 ml-5 text-sm">
                                                        <FaRegClock />
                                                        {item.arrivalTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div>
                                    <div className="flex flex-col justify-end items-end text-gray-500">
                                        <h3 className="text-3xl font-semibold text-primary mb-3 flex items-center  gap-3">{item.price}€
                                            <div className='group relative'>
                                                <IoMdInformationCircle className="text-gray-500 text-xl cursor-pointer" />
                                                <span className='shadow-[0_0_15px_0_rgba(0,0,0,0.1)] font-medium w-[200px] group-hover:opacity-100 opacity-0 absolute top-10 right-0 transform  bg-white text-gray-600 text-sm py-1 px-2 rounded-lg hidden group-hover:block'>
                                                    <h2 className='font-semibold mb-2'>Price details :</h2>

                                                    <span className='font-semibold'> {(15).toFixed(2)} € </span> Mission fee<br />
                                                    <span className='font-semibold'>{(item?.totalSpace * item?.pricePerKilo).toFixed(2)} €</span>  Price {item?.totalSpace} KG * {item?.pricePerKilo} €/KG
                                                    <br />
                                                    <span >
                                                        <span className='font-semibold'> {(item?.price - (Number(item?.totalSpace * item?.pricePerKilo) + 15)).toFixed(2)} € </span>
                                                        Commision 20%
                                                    </span>

                                                    <hr className='block my-1' />

                                                    <span>Total Price :
                                                        <span className='font-semibold'> {(item?.price).toFixed(2)}  €</span>
                                                    </span>
                                                </span>
                                            </div>


                                        </h3>
                                        <span className="flex items-center gap-3">
                                            <IoShieldCheckmarkOutline className="text-green-500 capitalize" />
                                            including insurance and protection
                                        </span>

                                    </div>
                                    <div className='w-full mt-5'>
                                        <div className="bg-[#eeeff8] py-5 md:w-96 w-full px-10 rounded-lg text-primary">
                                            <h3 className="font-semibold">Your shipment</h3>
                                            <h2 className="text-2xl font-semibold">{item.totalSpace} kg</h2>
                                        </div>
                                        <div className='my-5 bg-[#F2FEF8] py-5 md:w-96 w-full md:px-10 px-5 rounded-lg text-primary text-sm'>
                                            <h2>Delivery by {item.user.firstName}</h2>

                                            <p>
                                                <span className="font-semibold">
                                                    {(() => {
                                                        const arrival = moment(item.arrivalDate).startOf('day');

                                                        const today = moment().startOf('day');
                                                        const tomorrow = moment().add(1, 'day').startOf('day');

                                                        if (arrival.isSame(today)) {
                                                            return "Today";
                                                        } else if (arrival.isSame(tomorrow)) {
                                                            return "Tomorrow";
                                                        } else {
                                                            const daysDiff = moment(item.arrivalDate).diff(moment(item.departureDate), 'days');
                                                            return `In ${daysDiff} ${Math.abs(daysDiff) === 1 ? "day" : "days"} on ${arrival.format("MMM D, YYYY")}`;
                                                        }
                                                    })()}
                                                </span>


                                            </p>


                                            <p>In <span className='font-semibold'>{item?.destinationArea}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-wrap justify-between gap-10 items-center my-5">


                            </div>

                            <div className="flex flex-wrap items-center md:justify-between gap-5">
                                <div className="flex flex-wrap items-center gap-5">
                                    <img className="w-14 rounded-full" src={baseUrl + item.user.profileImage} alt="" />
                                    <div>
                                        <h3 className="font-semibold text-primary">{item.user.firstName}</h3>
                                        <div className="flex items-center flex-wrap gap-3">
                                            <span className="flex items-center gap-3 text-gray-500">
                                                {item.user.reviewAva}
                                                <FaStar className="text-yellow-400" /> ({item.user.reviewInt} reviews)
                                            </span>
                                            <li className="list-disc text-gray-600 ml-5 mr-2">0 packages delivered</li>

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center justify-end gap-5">
                                        {/* <Link href={`/ishop/${item._id}`} className="flex items-center gap-3 py-3 px-10 text-primary border-2 border-primary rounded-lg">
                                            <CiStar /> View review
                                        </Link> */}
                                        <p className="text-right text-sm text-gray-500">Languages spoken: French, English</p>
                                        <button onClick={() => handleGoMessage(item)} className="flex items-center gap-3 py-3 px-10 bg-primary text-white border-2 border-primary rounded-lg">
                                            <FiMessageSquare /> Contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        {/* <h2 className="text-center text-2xl font-semibold text-red-500 my-20">No Search Data Found !!</h2> 
                        */}
                        {/* <img className='max-w-[250px]  mx-auto' src="/Images/searchnotfound.webp" alt="" /> */}
                    </div>
                )}
            </section>


            <VideoAndCard />
            <CouriersAvailable searchIshopItem={getAllData?.data} />
            <HowDoesWork />
            <PopularProducts />

        </div>
    );
};

export default Page;
