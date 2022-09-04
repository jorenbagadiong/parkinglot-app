import { useState } from "react";
import moment from "moment";
import Vehicle from "./Vehicle";

const PARKING_ENTRANCE = [
  {
    entry: "1",
    distance: 5,
  },
  {
    entry: "2",
    distance: 10,
  },
  {
    entry: "3",
    distance: 15,
  },
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";

export default function Form({ parking }) {
  const [parkingEntrance, setParkingEntrance] = useState(PARKING_ENTRANCE);
  const l = () => {
    return LETTERS[Math.floor(Math.random() * LETTERS.length)];
  };
  const n = () => {
    return NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  };

  const park_in = moment().format("MM-DD-YYYY, h:mm:ss a");

  const vehicle = (entry, size, price) => {
    parking({
      plate_number: l() + l() + l() + "-" + n() + n() + n(),
      entrance: entry,
      vehicle_type: size,
      price: price,
      park_in: park_in,
    });
  };

  const addEntrance = () => {
    setParkingEntrance([
      ...parkingEntrance,
      {
        entry: parkingEntrance.length + 1,
        distance: n() + n(),
      },
    ]);
  };

  return (
    <div className="px-4">
      <div className="w-[200px] flex items-center">
        <button
          className="buttonBlue"
          onClick={() => {
            addEntrance();
          }}
        >
          Add Entrance
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 pb-[40px] mt-[20px]">
        {parkingEntrance.map(({ entry }) => (
          <div className="border-2 p-2 gap-[10px] rounded-[10px]" key={entry}>
            <h3 className="text-center">Entrance {entry}</h3>
            <Vehicle entrance={entry} vehicle={vehicle} />
          </div>
        ))}
      </div>
    </div>
  );
}
