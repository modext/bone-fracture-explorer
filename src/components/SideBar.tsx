// Sidebar.tsx
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { classes } from "@/utils/constants";
import ClassFilter from "@/components/ClassFilter";
import useSearchData, { areAllNone } from "@/utils/hooks/useFilterData";
import RangeSelector from "@/components/RangeSelector";

const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [activePhotoCount, setActivePhotoCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string[]>([]);
  const [selectedMinRange, setSelectedMinRange] = useState<number>(0);
  const [selectedMaxRange, setSelectedMaxRange] = useState<number>(2);
  const [photos, setPhotos] = useState<any>({
    allGroups: [],
    test: [],
    train: [],
    valid: [],
  });
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

  const handleSelectClassFilter = (btnName: string) => {
    if (selectedClassFilter.includes(btnName)) {
      const newSelectedClassFilter = selectedClassFilter.filter((item) => item !== btnName);
      setSelectedClassFilter(newSelectedClassFilter);
    } else {
      setSelectedClassFilter([...selectedClassFilter, btnName]);
    }
  };

  const handleRangeSelector = (searchRange: string[]) => {
    console.log("searchRange-->", searchRange);
    handleSearchDataAll(photos?.allGroups, searchRange);
    handleSearchDataTrain(photos?.train, searchRange);
    handleSearchDataValid(photos?.valid, searchRange);
    handleSearchDataTest(photos?.test, searchRange);
  };

  const clearFilters = () => {
    setSelectedClassFilter([]);
    setSelectedMinRange(0);
    setSelectedMaxRange(2);
    setSelected(0);
  };

  return (
    <div className="lg:w-[25%]">
      <div className="border-[#D1D1D6] border rounded-lg p-5 lg:h-screen xl:h-screen md:h-screen">
        <img
          src="/assets/svgs/logo.svg"
          width={200}
          height={200}
          alt="Distal Humerus Fracture"
          className="w-[350px]"
        />
        <p className="mt-10 font-[600] text-[15px]">Classes filter</p>
        <p className="mt-10">
          {selection.map((item, index) => (
            <Link key={index} href="#" onClick={item.handleOnSelect} className={`me-5 ${item.tab === selected ? "text-[#2081D2]" : "text-gray-400"}`}>
              {item.label}
            </Link>
          ))}
        </p>
        <ClassFilter
          classFilterButtons={classFilterButtons}
          selectedClassFilter={selectedClassFilter}
          handleSelectClassFilter={handleSelectClassFilter}
        />
        <div>
          <p className="font-[600] mt-5">Polygon range</p>
          <RangeSelector
            onRangeUpdate={handleRangeSelector}
            minimumValue={selectedMinRange}
            updateMinimumValue={setSelectedMinRange}
            maximumValue={selectedMaxRange}
            updateMaximumValue={setSelectedMaxRange}
          />
          <div className="flex justify-between mt-5 px-5">
            <div className="font-[600] cursor-pointer" onClick={clearFilters}>
              <i className="bi bi-trash"></i> Clear filters
            </div>
            <div className="text-gray-400 cursor-pointer">Need help?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
