// ContentArea.tsx
import React, { useEffect, useState } from 'react';
import MenuTabs from "@/components/MenuTabs";
import {GetTabContent} from "@/components/GetTabContent";
import ImageGridSkeleton from "@/components/Skeleton";
import useSearchData from "@/utils/hooks/useFilterData"; // Adjust import paths as needed

const ContentArea = () => {
  const [photos, setPhotos] = useState<any>({
    allGroups: [],
    test: [],
    train: [],
    valid: [],
  });
  const [tab, setTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesPerPage, setImagesPerPage] = useState<number>(54);

  const viewAlbum = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/album?albumName=${encodeURIComponent("bone-fracture-detection")}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch album data: ${response.statusText}`);
      }
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    viewAlbum();
  }, []);

  const handleOnTabClick = (selectedTab: number) => {
    setTab(selectedTab);
    setCurrentPage(1);
  };

  const displayImageRange = () => {
    const activePhotoCount = photos?.[tab === 1 ? "allGroups" : tab === 2 ? "train" : tab === 3 ? "valid" : "test"]?.length || 0;
    const endIndex = Math.min(currentPage * imagesPerPage, activePhotoCount);
    return `${endIndex} of ${activePhotoCount}`;
  };

  const {
    handleSearchData: handleSearchDataAll,
    responseData: responseDataAll,
  } = useSearchData(photos?.allGroups);

  const {
    handleSearchData: handleSearchDataTrain,
    responseData: responseDataTrain,
  } = useSearchData(photos?.train);

  const {
    handleSearchData: handleSearchDataValid,
    responseData: responseDataValid,
  } = useSearchData(photos?.valid);

  const {
    handleSearchData: handleSearchDataTest,
    responseData: responseDataTest,
  } = useSearchData(photos?.test);

  const menus = [
    { tab: 1, label: "All groups", handleOnclick: () => handleOnTabClick(1) },
    { tab: 2, label: "Train", handleOnclick: () => handleOnTabClick(2) },
    { tab: 3, label: "Valid", handleOnclick: () => handleOnTabClick(3) },
    { tab: 4, label: "Test", handleOnclick: () => handleOnTabClick(4) },
  ];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  const { handleSearchData, responseData } = useSearchData(photos?.[tab === 1 ? "allGroups" : tab === 2 ? "train" : tab === 3 ? "valid" : "test"]);

  // Invoke handleSearchData as needed based on user interactions or effects

  return (
    <div className="lg:w-[75%]">
      <div className="px-5">
        <div className="flex justify-between">
          <div className="text-[32px] font-[600]">Bone-fracture-detection</div>
          <div className="mt-3">
            <span><span className="font-[600]">{displayImageRange()} images</span></span>
          </div>
        </div>
        <MenuTabs tab={tab} handleOnTabClick={handleOnTabClick} menus={menus} />
        <div className="flex justify-center mt-5">
          {isLoading ? <ImageGridSkeleton count={54} /> : <GetTabContent
                  tab={tab}
                  responseDataAll={responseDataAll}
                  responseDataTrain={responseDataTrain}
                  responseDataValid={responseDataValid}
                  responseDataTest={responseDataTest}
                  imagesPerPage={imagesPerPage}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                />}
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
