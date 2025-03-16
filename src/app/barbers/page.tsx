"use client";

import React, { useEffect, useState } from "react";
import api from "../services/config";
import { Barber } from "../../types/type";
import BarberCard from "@/components/BarberCard/BarberCard";
import { Box, Tabs, Tab, TextField, CircularProgress } from "@mui/material";
import BarberSkeleton from "@/components/BarberSkeleton/BarberSkeleton";
import ServiceSelectCheckmarks from "@/components/ServiceSelectCheckmarks/SortServis";
// import ServiceSelectCheckmarks from "../facility/page";

const BarbersPage: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateURL = (newParams: {
    isShop?: boolean;
    search?: string;
    services?: string[];
  }) => {
    const params = new URLSearchParams(window.location.search);
  
    if (newParams.isShop !== undefined) {
      params.set("is_shop", newParams.isShop.toString());
    } else {
      params.delete("is_shop");
    }
  
    if (newParams.search && newParams.search.trim() !== "") {
      params.set("search", newParams.search);
    } else {
      params.delete("search"); 
    }
  
    if (newParams.services && newParams.services.length > 0) {
      params.set("services", newParams.services.join(","));
    } else {
      params.delete("services");
    }
  
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };
  

  const fetchBarbers = async (
    isShop?: boolean,
    search?: string,
    services?: string[]
  ) => {
    setLoading(true);
    try {
      const response = await api.get("/barbers", {
        params: {
          is_shop: isShop,
          search: search,
          services: services?.join(","),
        },
      });
      setBarbers(response.data.results);
    } catch (error) {
      console.error("Error fetching barbers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    const isShop = newValue === 1 ? true : newValue === 2 ? false : undefined;
  
    const params = new URLSearchParams(window.location.search);
    
    if (!searchTerm) {
      params.delete("search");
    }
  
    if (isShop !== undefined) {
      params.set("is_shop", isShop.toString());
    } else {
      params.delete("is_shop");
    }
  
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  
    fetchBarbers(isShop, searchTerm, selectedServices);
  };
  

  const handleServiceChange = (newServices: string[]) => {
    setSelectedServices(newServices);
  
    const params = new URLSearchParams(window.location.search);
    const isShopParam = params.get("is_shop");
    
    if (newServices.length > 0) {
      params.set("services", newServices.join(","));
    } else {
      params.delete("services");
    }
  
    if (isShopParam !== null) {
      params.set("is_shop", isShopParam);
    }
  
    
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  
    
    fetchBarbers(isShopParam === "true", searchTerm, newServices);
  };
  
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isShopParam = params.get("is_shop");
      const searchParam = params.get("search") || "";
      const servicesParam = params.get("services")?.split(",") || [];
      const isShop =
        isShopParam === "true"
          ? true
          : isShopParam === "false"
          ? false
          : undefined;

      setActiveTab(isShop === undefined ? 0 : isShop ? 1 : 2);
      setSelectedServices(servicesParam);
      fetchBarbers(isShop, searchParam, servicesParam);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
  
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
  
    
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  
    fetchBarbers(undefined, searchTerm, selectedServices);
  }, [searchTerm]);
  
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (!isClient) {
    return null;
  }

  if (activeTab === null) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="همه" />
        <Tab label="مغازه" />
        <Tab label="غیرمغازه" />
      </Tabs>
      <div className="mt-2 mb-2 mx-auto w-[80%]  md:w-1/2 flex flex-col md:flex-row gap-y-2 items-center"
       
      >
        <TextField
          label="جست و جو بر اساس نام آرایشگر ... "
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ServiceSelectCheckmarks
          onChange={handleServiceChange}
          selectedServices={selectedServices}
        />
      </div>
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <BarberSkeleton />
        ) : barbers.length === 0 ? (
          <Box sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem" }}>
            <p className="font-bold text-xl text-red-500">آرایشگر مورد نظر وجود ندارد</p>
          </Box>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-4 py-5 px-10">
            {barbers.map((barber) => (
              <BarberCard key={barber.slug} barber={barber} />
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default BarbersPage;
