// import { useState } from "react";

// import PopupContainer from "@/components/PopupContainer";
// import ImagePaginator, { fetchPageData } from "@/components/ImagePaginator";

// export default function Train({ images }: { images: any[] }) {
//   const [showImage, setShowImage] = useState<boolean>(false);
//   const [photoData, setPhotoData] = useState<any>({});
//   const [currentPage, setCurrentPage] = useState(1);

//   // Limit the photos array to the first 200 items
//   const limitedPhotos = images.slice(0, 200);

//   const handleShow = (data: any) => {
//     setPhotoData(data);
//     setShowImage(true);
//   };

//   const PAGE_SIZE = 54;
//   const totalItems = limitedPhotos.length;
//   const totalPages = Math.ceil(totalItems / PAGE_SIZE);

//   // Ensure getPageData operates on the limitedPhotos array
//   const currentData = fetchPageData(limitedPhotos, currentPage, PAGE_SIZE);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 gap-y-2">
//         {currentData?.map((photo: any, idx: number) => (
//           <div key={idx} className="mb-1" onClick={() => handleShow(photo)}>
//             <img
//               className="w-24 h-24 rounded-lg bg-white shadow-inner object-cover cursor-pointer"
//               src={photo.image}
//               alt={photo.image}
//             />
//             <div className="truncate" title={photo.name}>
//               {photo.name}
//             </div>
//           </div>
//         ))}
//       </div>
//       <ImagePaginator
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//       {showImage && (
//         <PopupContainer
//           containerWidth="md:w-[700px] sm:!mt-40"
//           header={photoData.name}
//           isVisible={showImage}
//           content={
//             <div>
//               <p className="mb-3">Details:</p>
//               <button className="rounded-full px-5 mb-4 bg-yellow-400">
//                 fracture_1
//               </button>
//               <img
//                 className="w-full h-full rounded-lg bg-white shadow-inner object-cover cursor-pointer"
//                 src={photoData?.image}
//                 alt={photoData?.image}
//               />
//             </div>
//           }
//           toggleVisibility={setShowImage}
//         />
//       )}
//     </div>
//   );
// }
