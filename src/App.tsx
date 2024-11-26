import { useEffect, useState } from "react";
import svgOverlay from "../public/assets/0-floor.png";
import FilteredData from "./components/FilteredData";

export interface Unit {
  code: number;
  status: string;
  price: number;
}

function App() {
  const [data, setData] = useState<Unit[]>([]);
  const [filterPrice, setfilterPrice] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const getData = async () => {
    try {
      const response = await fetch("/assets/data.json");
      const data: Unit[] = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0  ",
          width: "40%",
          height: "auto",
          zIndex: 1,
        }}
      >
        {" "}
        <FilteredData
          data={data.filter((ele) => {
            return (
              (filterPrice === 0 || ele.price >= filterPrice) &&
              (statusFilter === "" || ele.status === statusFilter)
            );
          })}
        />
      </div>

      <img
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "40%",
          height: "auto",
          objectFit: "cover",
        }}
        src={svgOverlay}
      />
      <div style={{ width: "90%", margin: "0 auto" }}>
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "30px",
            position: "absolute",
            top: "10px",
            left: "50%",
            zIndex: 33,
          }}
        >
          Price:
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <input
              onChange={(e) => setfilterPrice(parseFloat(e.target.value))}
              type="range"
              min="0"
              max="100000"
              step="0.01"
              defaultValue="0"
            />
            <span>{filterPrice}</span>
          </div>
          <label style={{ marginLeft: 20 }}>
            Status:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </label>
        </label>
      </div>
    </>
  );
}

export default App;
