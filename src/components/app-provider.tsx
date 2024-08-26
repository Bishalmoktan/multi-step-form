import {
  IAddressDetails,
  IPersonalDetails,
  IProfileDetails,
} from "@/lib/types";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type AppProviderProps = {
  children: React.ReactNode;
};

export interface ICompleteDetails {
  id: string;
  personalDetails: IPersonalDetails;
  addressDetails: IAddressDetails;
  profileDetails: IProfileDetails;
}

type AppProviderState = {
  detailsList: ICompleteDetails[];
  addDetails: (details: Omit<ICompleteDetails, "id">) => void;
  updateDetails: (
    id: string,
    updatedDetails: Omit<ICompleteDetails, "id">
  ) => void;
  deleteDetails: (id: string) => void;
  personalDetails: IPersonalDetails;
  setPersonalDetails: React.Dispatch<React.SetStateAction<IPersonalDetails>>;
  addressDetails: IAddressDetails;
  setAddressDetails: React.Dispatch<React.SetStateAction<IAddressDetails>>;
  profileDetails: IProfileDetails;
  setProfileDetails: React.Dispatch<React.SetStateAction<IProfileDetails>>;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
};

const AppProviderContext = createContext<AppProviderState | null>(null);

export function AppProvider({ children }: AppProviderProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("Nepal");
  const [detailsList, setDetailsList] = useState<ICompleteDetails[]>(() => {
    const savedDetails = localStorage.getItem("detailsList");
    return savedDetails ? JSON.parse(savedDetails) : [];
  });

  useEffect(() => {
    localStorage.setItem("detailsList", JSON.stringify(detailsList));
  }, [detailsList]);

  const addDetails = (details: Omit<ICompleteDetails, "id">) => {
    const newDetails = { ...details, id: uuidv4() };
    setDetailsList((prev) => [...prev, newDetails]);
    localStorage.setItem("personalDetails", "");
    localStorage.setItem("addressDetails", "");
    localStorage.setItem("profileDetails", "");
    localStorage.setItem("profileImage", "");
  };

  const updateDetails = (
    id: string,
    updatedDetails: Omit<ICompleteDetails, "id">
  ) => {
    setDetailsList((prev) =>
      prev.map((details) =>
        details.id === id ? { ...updatedDetails, id } : details
      )
    );
  };

  const deleteDetails = (id: string) => {
    setDetailsList((prev) => prev.filter((details) => details.id !== id));
  };

  const [personalDetails, setPersonalDetails] = useState<IPersonalDetails>(
    () => {
      const savedDetails = localStorage.getItem("personalDetails");
      return savedDetails
        ? JSON.parse(savedDetails)
        : {
            name: "",
            dateOfBirth: "",
            email: "",
            phone: "",
          };
    }
  );

  const [addressDetails, setAddressDetails] = useState<IAddressDetails>(() => {
    const savedDetails = localStorage.getItem("addressDetails");
    return savedDetails
      ? JSON.parse(savedDetails)
      : {
          city: "",
          country: "",
          district: "",
          state: "",
        };
  });

  const [profileDetails, setProfileDetails] = useState<IProfileDetails>(() => {
    const savedDetails = localStorage.getItem("profileDetails");
    return savedDetails
      ? JSON.parse(savedDetails)
      : {
          img: "",
        };
  });

  useEffect(() => {
      localStorage.setItem("personalDetails", JSON.stringify(personalDetails));
  }, [personalDetails]);

  useEffect(() => {
    localStorage.setItem("addressDetails", JSON.stringify(addressDetails));
  }, [addressDetails]);

  useEffect(() => {
    try {
      localStorage.setItem("personalDetails", JSON.stringify(personalDetails));
    } catch (error) {
      console.log(error);
      toast.error("Select image of smaller size");
    }
  }, [profileDetails]);

  return (
    <AppProviderContext.Provider
      value={{
        personalDetails,
        setPersonalDetails,
        addressDetails,
        setAddressDetails,
        profileDetails,
        setProfileDetails,
        detailsList,
        addDetails,
        updateDetails,
        deleteDetails,
        selectedCountry,
        setSelectedCountry,
      }}
    >
      {children}
    </AppProviderContext.Provider>
  );
}

export const useAppContext = () =>
  React.useContext(AppProviderContext) as AppProviderState;
