'use client';
import baseUrl from '@/app/redux/api/baseUrl';
import i18n from '@/app/utils/i18';
import React, { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { usePaymentMutation } from '@/app/redux/Features/payment/createPayment';

const CouriersAvailable = ({ searchIshopItem }) => {
    // Either use filtered data from searchTerm or original data from searchIshopItem
    const postData = searchIshopItem?.filter(item => item?.uploadImage?.length > 0);
    console.log(postData);

    // console.log(searchTerm);


    const router = useRouter();
    const user = useUser();
    // console.log();
    const [payment20Persent] = usePaymentMutation();

    const handleContact = async (request) => {

        const data = {
            amount: `${Number(5 * 100)}`,
            cobagProfit: `${request?.PurchasePrice / 100 * 20}`,
            currency: "eur",
            paymentMethodId: "pm_card_visa",
            isEightyPercent: 'true',
            senderId: user?._id,
            sellKgId: request?._id,
            travellerId: request?.userId?._id
        }
        console.log(data);
        if (user?.isTwentyPercent === false) {
            toast.error('Please pay 5$ for Sucure All Transection');

            const res = await payment20Persent(data).unwrap();
            console.log(res);
            if (res) {
                // window.location.href = res?.data?.url;
                return router.push(res?.url);
            }

        }

        

        // toast.success('Message sent successfully');
    }

    const { t } = i18n;

    // Pagination settings
    const itemsPerPage = 4;  // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Filter settings
    const [cityPurchase, setCityPurchase] = useState('');
    const [cityDelivery, setCityDelivery] = useState('');
    const [minRating, setMinRating] = useState(4.5);
    const [untilDate, setUntilDate] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    // Filtered data state
    const [filteredData, setFilteredData] = useState(postData);

    // Function to apply filters
    const applyFilter = () => {
        const filterResults = postData?.filter(item => {
            const meetsCityPurchase = cityPurchase ? item?.departureCity.toLowerCase().includes(cityPurchase.toLowerCase()) : true;
            const meetsCityDelivery = cityDelivery ? item?.arrivalCity.toLowerCase().includes(cityDelivery.toLowerCase()) : true;

            return meetsCityPurchase && meetsCityDelivery;
        });

        console.log(filterResults);
        if (filterResults?.length < 1) {
            return toast.error('No data found')
        }

        setFilteredData(filterResults);  // Update filtered data
        setCurrentPage(1);  // Reset to page 1 after filter is applied
    };

    // If no filter is applied, use all items
    const displayData = filteredData?.length > 0 ? filteredData : postData;

    // Calculate the start and end index based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = displayData?.slice(startIndex, endIndex);
    const totalPages = Math?.ceil(displayData?.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <section id="shop" className="bg-[#f7f7fc]">
            <div className="lg:py-32 py-20 bg-[#]">
                <div className="lg:w-[80%] w-[90%] mx-auto">

                    {/* Filter Card */}
                    <div className="bg-white shadow-lg rounded-lg p-8 border text-left mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Filter ads</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            {/* City of purchase */}
                            <div className=" space-y-2">
                                <span className="text-gray-600 block">City of purchase</span>
                                <input
                                    type="text"
                                    placeholder="Ex: New York"
                                    value={cityPurchase}
                                    onChange={(e) => setCityPurchase(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                                />
                            </div>

                            {/* Delivery city */}
                            <div className=" space-y-2">
                                <span className="text-gray-600 block">Delivery city</span>
                                <input
                                    type="text"
                                    placeholder="Ex: Paris"
                                    value={cityDelivery}
                                    onChange={(e) => setCityDelivery(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                                />
                            </div>
                            {/* Until date */}
                            <div className=" space-y-2">
                                <span className="text-gray-600 block">Until</span>
                                <input
                                    type="date"
                                    value={untilDate}
                                    onChange={(e) => setUntilDate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                                />
                            </div>
                            {/* Maximum amount */}
                            <div className=" space-y-2">
                                <span className="text-gray-600 block">Maximum amount to advance</span>
                                <input
                                    type="number"
                                    value={maxAmount}
                                    onChange={(e) => setMaxAmount(e.target.value)}
                                    placeholder="Maximum amount"
                                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                                />
                            </div>

                            {/* Minimum traveler rating */}
                            <div className="items-center">
                                <span className="text-gray-600 block">Minimum traveler rating</span>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        value={minRating}
                                        onChange={(e) => setMinRating(e.target.value)}
                                        className="w-full"
                                    />
                                    <span className="text-gray-700 min-w-16">{minRating} <span className="text-2xl text-[#f3d423]">★</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Apply Filter Button */}
                        <div className="flex justify-end">
                            <button onClick={applyFilter} className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">Apply Filter</button>
                        </div>
                    </div>

                    {/* Items Display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                        {currentItems?.map((request, index) => (
                            <div key={index} className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="relative h-60">
                                    <img src={baseUrl + request?.uploadImage} alt={request.title} className="w-full h-60 object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                        <h3 className="text-lg font-semibold mb-5 text-white">{request.title}</h3>
                                        <div className="flex items-center gap-3 justify-between">
                                            <p className="text-3xl text-white">{request.PurchasePrice}€</p>
                                            <p className="text-sm text-gray-100 bg-green-600 px-3 py-2 rounded-full">
                                                Earnings: {request.PurchasePrice / 10}€ or more
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between ">
                                        <div className="text-left mt-2">
                                            <p className="text-sm text-gray-600">Purchase in: {request.departureCity}</p>
                                            <p className="text-sm text-gray-600">Delivery to: {request.arrivalCity}</p>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">Deadline: {request.arrivalDate}</p>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2">
                                        <img className="w-10 h-10 rounded-full" src={baseUrl + request?.userId?.profileImage} alt="" />
                                        <div className="text-left">
                                            <span className="mr-2">
                                                {request?.userId?.firstName + ' ' + request?.userId?.lastName}
                                            </span>
                                            <br />
                                            <span className="text-yellow-400">★</span>
                                            <span className="ml-2 text-gray-500 text-xs">
                                                {request?.userId?.travellerSuccessRate}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleContact(request)}
                                        className="mt-4 px-6 w-full py-3 text-xl bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2 ">
                                        <FiMessageSquare />Contact
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            className="px-4 py-2 text-primary rounded-l-lg hover:bg-primary-dark"
                            disabled={currentPage === 1}
                        >
                            <FaChevronLeft className="text-2xl" />
                        </button>
                        <span className="px-4 py-2 text-lg text-gray-700">{`${currentPage} / ${totalPages}`}</span>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            className="px-4 py-2 text-primary rounded-r-lg hover:bg-primary-dark"
                            disabled={currentPage === totalPages}
                        >
                            <FaChevronRight className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CouriersAvailable;
