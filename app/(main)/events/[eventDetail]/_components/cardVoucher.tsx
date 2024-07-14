// import React from 'react';

// interface VoucherCardProps {
//     code: string;
//     discount: string;
//     description: string;
//     onClaim: () => void;
// }

// const VoucherCard: React.FC<VoucherCardProps> = ({ code, discount, description, onClaim }) => {
//     return (
//         <div className="border rounded-lg p-4 flex items-center justify-between shadow-sm bg-white w-72 mx-2">
//             <div className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 bg-black text-white rounded-full p-4">
//                     <span className="text-lg font-bold">{discount}</span>
//                 </div>
//                 <div>
//                     <h3 className="text-md font-semibold">{code}</h3>
//                     <p className="text-sm text-gray-500">{description}</p>
//                 </div>
//             </div>
//             <button
//                 onClick={onClaim}
//                 className="bg-black text-white text-sm px-3 py-1 rounded-md hover:bg-gray-800 transition duration-300"
//             >
//                 Claim
//             </button>
//         </div>
//     );
// };

// export default VoucherCard;


// File: CouponTicket.jsx
// import React from 'react';

// const CouponTicket = ({ title, description, company, amount }) => {
//     return (
//         <div className="relative bg-white text-black py-4 px-6 text-lg shadow-lg rounded-lg my-4 w-80 mx-auto">
//             <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full w-8 h-full bg-blue-600 rounded-r-full"></div>
//             <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full w-8 h-full bg-blue-600 rounded-l-full"></div>
//             <div className="text-center">
//                 <div className="text-2xl font-bold mb-2">{title}</div>
//                 <div className="text-lg">{amount}</div>
//                 <div className="text-sm text-gray-500 mt-2">{company}</div>
//                 <div className="text-sm text-gray-500 mt-2">{description}</div>
//             </div>
//         </div>
//     );
// };

// export default CouponTicket;

// File: CouponTicket.jsx
// import React from 'react';

// const CouponTicket = ({ status, detail, info, daysLeft }) => {
//     return (
//         <div className="relative bg-white border text-black py-4 px-6 text-lg shadow-lg rounded-lg my-4 w-full max-w-2xl mx-auto flex items-center">
//             {/* Top and bottom cut-outs */}
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-b "></div>
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-white rounded-full border-t "></div>

//             <div className="flex items-center">
//                 {/* <img src={qrCode} alt="QR Code" className="w-20 h-20 mr-4" /> */}

//                 <div>
//                     {/* <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">{status}</span> */}

//                     <div className="font-bold text-xl mt-2">{detail}</div>
//                     <div className="text-gray-500">{info}</div>
//                     {/* <div className='flex justify-center items-center h-full border-r-2'></div> */}
//                 </div>
//             </div>
//             <div className="ml-auto text-right">
//                 <div className="text-2xl font-bold">{daysLeft} days</div>
//                 <button className="border border-red-500 text-red-500 px-4 py-2 rounded mt-2">show</button>
//             </div>
//         </div>
//     );
// };

// export default CouponTicket;

