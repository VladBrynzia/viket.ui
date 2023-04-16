import React from "react";
import { useScreenResolution } from "../../hooks/useScreenResolution";
import { Loading } from "../../ui/common/Loading";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export const Navigation: React.FC = () => {
  const { width, resolution } = useScreenResolution();
  return (
    <>
      {width === 0 ? (
        <Loading />
      ) : (
        <>
          {resolution === "desktop" ? (
            <DesktopNavigation />
          ) : (
            <MobileNavigation />
          )}
        </>
      )}
    </>
  );
};
