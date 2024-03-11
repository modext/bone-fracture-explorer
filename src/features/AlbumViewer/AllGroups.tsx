// import React, { useState } from "react";

// import PopupContainer from "@/components/PopupContainer";
// import ImagePaginator, { fetchPageData } from "@/components/ImagePaginator";

// export default function PhotoCollection({ images }: { images: any[] }) {
//   const [isViewerOpen, setViewerOpen] = useState<boolean>(false);
//   const [selectedImage, setSelectedImage] = useState<any>({});
//   const [currentPage, setCurrentPage] = useState(1);

//   const displayImageDetails = (image: any) => {
//     setSelectedImage(image);
//     setViewerOpen(true);
//   };

//   const IMAGE_PER_PAGE = 54;

//   const totalImages = images.length;
//   const totalPageCount = Math.ceil(totalImages / IMAGE_PER_PAGE);

//   const paginatedImages = fetchPageData(images, currentPage, IMAGE_PER_PAGE);

//   const changePage = (page: number) => {
//     if (page >= 1 && page <= totalPageCount) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 gap-y-2">
//         {paginatedImages.map((image: any, index: number) => (
//           <div key={index} className="mb-1">
//             <img
//               className="w-24 h-24 rounded-lg bg-white shadow-inner object-cover cursor-pointer"
//               onClick={() => displayImageDetails(image)}
//               src={image.image}
//               alt={image.image}
//             />
//             <div className="truncate" title={image.name}>
//               {image.name}
//             </div>
//           </div>
//         ))}
//       </div>
//       <ImagePaginator
//         currentPage={currentPage}
//         totalPages={totalPageCount}
//         onPageChange={changePage}
//       />
//       {isViewerOpen && (
//         <PopupContainer
//           containerWidth={"md:w-[700px] sm:!mt-40"}
//           header={selectedImage.name}
//           isVisible={isViewerOpen}
//           content={
//             <div>
//               <p className="mb-3">Image Details:</p>
//               <button className="rounded-full px-5 mb-4 bg-yellow-400">
//                 Detail Button
//               </button>
//               <img
//                 className="w-full h-full rounded-lg bg-white shadow-inner object-cover cursor-pointer"
//                 src={selectedImage?.image}
//                 alt={selectedImage?.image}
//               />
//             </div>
//           }
//           toggleVisibility={() => setViewerOpen(false)}
//         />
//       )}
//     </div>
//   );
// }
