import React, { useEffect, useState } from "react";
import Link from "next/link";

import useSearchData, { areAllNone } from "@/utils/hooks/useFilterData";
import { classes } from "@/utils/constants";
import CustomButton from "@/components/Button";
import RangeSelector from "@/components/RangeSelector";
import ImageGridSkeleton from "@/components/Skeleton";
import PhotoGallery from "@/components/PhotoGallery";
import Sidebar from "@/components/SideBar";
import ContentArea from "@/components/ContentArea";

export default function AlbumViewer() {
  const [photos, setPhotos] = useState<any>({
    allGroups: [],
    test: [],
    train: [],
    valid: [],
  });
  const [tab, setTab] = useState<number>(1);
  const [activePhotoCount, setActivePhotoCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [selectedClassFilter, setSelectedClassFilter] = useState<any[]>([]);
  const [selectedMinRange, setSelectedMinRange] = useState<number>(0);
  const [selectedMaxRange, setSelectedMaxRange] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesPerPage, setImagesPerPage] = useState<number>(54);

  const viewAlbum = async (albumName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/album?albumName=${encodeURIComponent(albumName)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch album data: ${response.statusText}`);
      }
      const data = await response.json();
      setPhotos(data);
      const totalCountAll = data?.allGroups?.length;
      if (totalCountAll) setActivePhotoCount(totalCountAll);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    viewAlbum("bone-fracture-detection");
  }, []);

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

  const handleSearchAll = (searchText: string[]) => {
    let searchBy = searchText;
    if (searchText.length > 0) {
      searchBy.push("none");
    }
    if (areAllNone(searchBy)) {
      searchBy = [];
    }

    handleSearchDataAll(photos?.allGroups, searchBy);
    handleSearchDataTrain(photos?.train, searchBy);
    handleSearchDataValid(photos?.valid, searchBy);
    handleSearchDataTest(photos?.test, searchBy);
    searchBy = [];
  };

  const handleRangeSelector = (searchRange: string[]) => {
    console.log("searchRange-->", searchRange);
    handleSearchDataAll(photos?.allGroups, searchRange);
    handleSearchDataTrain(photos?.train, searchRange);
    handleSearchDataValid(photos?.valid, searchRange);
    handleSearchDataTest(photos?.test, searchRange);
  };

  const handleOnTabClick = (tab: number) => {
    setTab(tab);
    setCurrentPage(1);

    if (tab === 1) {
      setActivePhotoCount(photos?.allGroups?.length || 0);
    } else if (tab === 2) {
      setActivePhotoCount(photos?.train?.length || 0);
    } else if (tab === 3) {
      setActivePhotoCount(photos?.valid?.length || 0);
    } else if (tab === 4) {
      setActivePhotoCount(photos?.test?.length || 0);
    }
  };

  const handleSelected = (select: number) => {
    setSelected(select);
    if (select == 1) {
      setSelectedClassFilter(classes);
      handleSearchAll(classes);
    } else {
      setSelectedClassFilter([]);
      handleSearchAll([]);
    }
  };

  const displayImageRange = () => {
    const startIndex = (currentPage - 1) * imagesPerPage + 1;
    const endIndex = Math.min(startIndex + imagesPerPage - 1, activePhotoCount);
    return `${endIndex} of ${activePhotoCount}`;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const selection = [
    {
      tab: 1,
      label: "Select all",
      handleOnSelect: () => handleSelected(1),
    },
    {
      tab: 2,
      label: "Deselect all",
      handleOnSelect: () => handleSelected(2),
    },
  ];

  const menus = [
    {
      tab: 1,
      label: "All groups",
      handleOnclick: () => handleOnTabClick(1),
    },
    {
      tab: 2,
      label: "Train",
      handleOnclick: () => handleOnTabClick(2),
    },
    {
      tab: 3,
      label: "Valid",
      handleOnclick: () => handleOnTabClick(3),
    },
    {
      tab: 4,
      label: "Test",
      handleOnclick: () => handleOnTabClick(4),
    },
  ];

  const classFilterButtons = [
    {
      label: "Elbow positive",
      btnColor: "custom-button-class",
      btnName: "elbow_positive",
      onclick: () => handleSelectClassFilter("elbow_positive"),
    },
    {
      label: "Fingers positive",
      btnColor: "btn-success",
      btnName: "fingers_positive",
      onclick: () => handleSelectClassFilter("fingers_positive"),
    },
    {
      label: "Humerus",
      btnColor: "btn-secondary",
      btnName: "humerus",
      onclick: () => handleSelectClassFilter("humerus"),
    },
    {
      label: "Forearm fracture",
      btnColor: "btn-warning",
      btnName: "forearm_fracture",
      onclick: () => handleSelectClassFilter("forearm_fracture"),
    },
    {
      label: "Humerus fracture",
      btnColor: "btn-danger",
      btnName: "humerus_fracture",
      onclick: () => handleSelectClassFilter("humerus_fracture"),
    },
    {
      label: "Shoulder fracture",
      btnColor: "btn-warning2",
      btnName: "shoulder_fracture",
      onclick: () => handleSelectClassFilter("shoulder_fracture"),
    },
    {
      label: "Wrist positive",
      btnColor: "btn-secondary2",
      btnName: "wrist_positive",
      onclick: () => handleSelectClassFilter("wrist_positive"),
    },
  ];

  const handleSelectClassFilter = (btnName: string) => {
    if (selectedClassFilter.includes(btnName)) {
      let classArray = selectedClassFilter.filter((item) => item !== btnName);
      setSelectedClassFilter(classArray);
      handleSearchAll(classArray);
    } else {
      const classesSel = [...selectedClassFilter, btnName];
      setSelectedClassFilter(classesSel);
      handleSearchAll(classesSel);
    }
  };
  const clearFilters = () => {
    setSelectedClassFilter([]);
    setSelected(0);
    handleSearchAll([]);
    setSelectedMinRange(0);
    setSelectedMaxRange(2);
  };

  const getTabContent = (tab: number) => {
    const contentObj = {
      1: (
        <PhotoGallery
          images={responseDataAll || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
      2: (
        <PhotoGallery
          images={responseDataTrain || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
      3: (
        <PhotoGallery
          images={responseDataValid || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
      4: (
        <PhotoGallery
          images={responseDataTest || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
    } as any;

    return contentObj[tab];
  };

  return (
    <div>
      <div className="flex flex-row gap-5">
        <Sidebar />
        <ContentArea />
      </div>
    </div>
  );
}
