// src/components/BarberCard.tsx
import React from "react";
import { Barber } from "../../types/type";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
interface BarberCardProps {
  barber: Barber;
}

const BarberCard: React.FC<BarberCardProps> = ({ barber }) => {
  return (
    <div className="shadow-2xl text-sm px-5 py-4 rounded-b-lg text-left text-gray-500">
      <img
        className="w-[180px] border-4 border-dotted p-1  mx-auto h-[180px] rounded-full"
        src={barber.avatar}
        alt={barber.fullname}
        width={100}
      />

      <Box sx={{ textAlign: "center", marginTop: "10px" }}>
        <Rating name="read-only" value={barber.rate} readOnly />
      </Box>
      <h2 className="mt-8">
        <span className="font-bold text-black">Name :</span> {barber.fullname}
      </h2>
      <p className="">
        <span className="font-bold text-black">Address</span>:{barber.address}
      </p>

      <p>
        <span className="font-bold text-black">Distance :</span>
        {barber.distance} km
      </p>
      <p>
        <span className="font-bold text-black">Phone :</span>
        {barber.phone_number}
      </p>
      <Grid sx={{marginTop:"20px"}} item>
        <Tooltip
          title={
            <div>
              {barber.services.map((service, index) => (
                <Typography key={index} sx={{ mt: 1 }}>
                  {service}
                </Typography>
              ))}
            </div>
          }
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "#fcc203",
                color: "black",
                boxShadow: "none",
                textAlign:"center",
                paddingInline:"20px",
                paddingBottom:"10px",
                paddingTop:"10px"
              },
            },
            arrow: {
              sx: {
                color: "#fcc203",
              },
            },
          }}
          arrow
        >
          <Button
            variant="contained"
            sx={{ width: "100%", backgroundColor: "#fcc203" }}
          >
            Services
          </Button>
        </Tooltip>
      </Grid>
    </div>
  );
};

export default BarberCard;
