import { useState, useEffect } from "react";
import Notiflix from "notiflix";

import Form from "./components/Form";
import Header from "./components/Header";
import ParkingSlot from "./components/ParkingSlot";

import PARKING_SLOT from "./data/index";

export default function App() {
  const [parkingSlot, setParkingSlot] = useState([]);

  useEffect(() => {
    setParkingSlot(PARKING_SLOT);
  }, []);

  const addSlot = (data) => {
    setParkingSlot([...parkingSlot, data]);
  };

  const parking = (data) => {
    const newPark = [...parkingSlot];

    const index = parkingSlot.findIndex((park) =>
      park.parking_type >= data.vehicle_type ? !park.park_in : ""
    );

    const park = {
      ...newPark[index],
      ...data,
    };

    newPark[index] = park;

    if (index >= 0) {
      setParkingSlot(newPark);
      Notiflix.Report.success("Success", "Successfully Park In", "Okay");
    } else {
      Notiflix.Report.failure("Failed", "NO PARKING AVAILABLE", "Okay");
    }
  };

  const unpark = (data, index) => {
    const parkOut = [...parkingSlot];

    const park = {
      ...parkOut[index],
      ...data,
    };

    parkOut[index] = park;

    setParkingSlot(parkOut);
  };

  return (
    <div>
      <Header />
      <div className="container w-full mx-auto px-3">
        <Form parking={parking} />
        <div className="px-5">
          <ParkingSlot
            parkingSlot={parkingSlot}
            unpark={unpark}
            addSlot={addSlot}
          />
        </div>
      </div>
    </div>
  );
}
