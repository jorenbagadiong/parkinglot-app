import moment from "moment";
import Notiflix from "notiflix";

export default function ParkingSlot({ parkingSlot, unpark, addSlot }) {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const parkSlot = () => {
    addSlot({
      id: parkingSlot.length + 1,
      slot_number: parkingSlot.length + 1,
      parking_type: randomIntFromInterval(0, 2),
      plate_number: undefined,
      distance: randomIntFromInterval(0, 20),
      park_in: undefined,
      park_out: undefined,
    });
  };

  const vehicle = (index, parkIn, exceed_price) => {
    const parkOut = moment().format("MM-DD-YYYY, h:mm:ss a");

    const park_in = moment(parkIn, "MM-DD-YYYY, h:mm:ss a");
    const park_out = moment(parkOut, "MM-DD-YYYY, h:mm:ss a");
    const consumeTime = Math.round(park_out.diff(park_in, "hours", true));

    const price = () => {
      if (consumeTime <= 3) {
        return 40;
      } else if (consumeTime >= 24) {
        const penalty_price = Math.floor(consumeTime / 24) * 5000;
        const exceed_price_hours = (consumeTime % 24) * exceed_price;
        return penalty_price + exceed_price_hours;
      } else {
        const exceed_time = (consumeTime - 3) * exceed_price + 40;
        return exceed_time;
      }
    };

    Notiflix.Confirm.show(
      "You need to pay before leave",
      `Amount: ${price()}`,
      "Pay Now",
      "Pay Later",
      () => {
        unpark(
          {
            plate_number: undefined,
            park_in: undefined,
            park_out: undefined,
          },
          index
        );
      },
      () => {
        //do nothing
      }
    );
  };

  return (
    <div className="grid grid-cols-5 gap-[30px]">
      {parkingSlot.map(
        (
          { slot_number, plate_number, parking_type, park_in, price },
          index
        ) => {
          let type;
          if (parking_type === 0) type = "Small";
          if (parking_type === 1) type = "Medium";
          if (parking_type === 2) type = "Large";
          return (
            <button
              key={slot_number}
              className={park_in ? "buttonRed" : "buttonBlue"}
              onClick={() => {
                vehicle(index, park_in, price);
              }}
              disabled={park_in ? false : true}
            >
              <p>{type}</p>
              <p>{plate_number || "Slot " + slot_number}</p>
            </button>
          );
        }
      )}
      <button
        className="buttonBlue"
        onClick={() => {
          parkSlot();
        }}
      >
        <p>Add Parking</p>
        <p>Slot</p>
      </button>
    </div>
  );
}
