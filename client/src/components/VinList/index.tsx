import React from "react";

const VinList = ({ data }: VinListTypes) => {
  return (
    <table className="vin-table">
      <thead>
        <tr>
          <th>VIN Number</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((vin, index) => (
          <tr key={index}>
            <td>{vin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VinList;
