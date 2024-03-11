// GetTabContent.tsx
import React from 'react';
import PhotoGallery from "@/components/PhotoGallery";

interface TabContentProps {
  tab: number;
  responseDataAll: any[]; // Consider replacing any with a more specific type
  responseDataTrain: any[];
  responseDataValid: any[];
  responseDataTest: any[];
  imagesPerPage: number;
  handlePageChange: (newPage: number) => void;
  currentPage: number;
}

interface ContentObj {
  [key: number]: JSX.Element | null;
}

export const GetTabContent: React.FC<TabContentProps> = ({
  tab,
  responseDataAll,
  responseDataTrain,
  responseDataValid,
  responseDataTest,
  imagesPerPage,
  handlePageChange,
  currentPage
}) => {
  const contentObj: ContentObj = {
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
  };

  return contentObj[tab] || null;
};
