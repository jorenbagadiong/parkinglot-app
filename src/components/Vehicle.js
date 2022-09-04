export default function Vehicle({ entrance, vehicle }) {
  const vehicleType = [
    {
      name: "Small",
      vehicle_type: 0,
      exceeed_price: 20,
    },
    {
      name: "Medium",
      vehicle_type: 1,
      exceeed_price: 60,
    },
    {
      name: "Large",
      vehicle_type: 2,
      exceeed_price: 100,
    },
  ];

  return (
    <div className="mx-auto px-2 mt-[10px]">
      <div className="flex flex-col md:flex-row justify-between gap-[10px]">
        {vehicleType.map(({ name, vehicle_type, exceeed_price }) => (
          <button
            key={name}
            className="buttonBlue"
            onClick={() => vehicle(entrance, vehicle_type, exceeed_price)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
