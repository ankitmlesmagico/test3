//       {/* Pagination */}
//       <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
//         <div className="flex items-center">
//           <span className="text-sm text-gray-700">
//             Showing:
//             <select
//               className="mx-2 rounded border-gray-300"
//               value={itemsPerPage}
//               onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             >
//               <option value={15}>15</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length}
//           </span>
//         </div>

//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//             disabled={currentPage === 1}
//             className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
//           >
//             <MdKeyboardArrowDown className="w-5 h-5" />
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1)
//             .filter(
//               (page) =>
//                 page === 1 ||
//                 page === totalPages ||
//                 (page >= currentPage - 1 && page <= currentPage + 1)
//             )
//             .map((page, index, array) => (
//               <React.Fragment key={page}>
//                 {index > 0 && array[index - 1] !== page - 1 && (
//                   <span className="px-2">...</span>
//                 )}
//                 <button
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === page
//                       ? 'bg-blue-500 text-white'
//                       : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               </React.Fragment>
//             ))}

//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//             }
//             disabled={currentPage === totalPages}
//             className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
//           >
//             <MdKeyboardArrowDown className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
