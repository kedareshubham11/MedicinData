import "./MedicineData.css";
import react, { useEffect, useState } from "react";
import axios from "../api/api.config";

function MedicineData() {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  async function getAll() {
    await axios
      .get("/getAllMedicine")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function search() {
    await axios
      .post("/searchMedicine", { c_name: searchKey })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteAll() {
    await axios
      .post("/deleteAll")
      .then((res) => {
        alert("data deleted from database.");
        setData([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function upload(e) {
    //
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    await axios
      .post("/uploadCSV", formData, {
        headers: { "content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("file uploaded successfully");
      })
      .catch((err) => {
        console.log(err);

        alert("file uploading failed");
      });
  }
  return (
    <div className="container">
      <h2>Medicine Data</h2>
      <div className="header">
        <span>
          <form onSubmit={upload}>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
            <button type="submit"> Upload CSV</button>
          </form>
        </span>
        <button type="button" onClick={() => getAll()}>
          Get All Medicine
        </button>
        <div className="searchBox">
          <input
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
            defaultValue={searchKey}
          ></input>
          <button type="button" onClick={() => search()}>
            search
          </button>
        </div>
        <button type="button" onClick={() => deleteAll()}>
          Deleta All data
        </button>
      </div>
      <div className="body">
        <table>
          <tr>
            <th>c_name</th>
            <th>c_batch_no</th>
            <th>d_expiry_date</th>
            <th>n_balance_qty</th>
            <th>c_packaging</th>
            <th>c_unique_code</th>
            <th>c_schemes</th>
            <th>n_mrp</th>
            <th>c_manufacturer</th>
            <th>hsn_code</th>
          </tr>

          {data.length !== 0 ? (
            data.map((item) => {
              return (
                <tr>
                  <td>{item.c_name}</td>
                  <td>{item.c_batch_no}</td>
                  <td>{item.d_expiry_date}</td>
                  <td>{item.n_balance_qty}</td>
                  <td>{item.c_packaging}</td>
                  <td>{item.c_unique_code}</td>
                  <td>{item.c_schemes}</td>
                  <td>{item.n_mrp}</td>
                  <td>{item.c_manufacturer}</td>
                  <td>{item.hsn_code}</td>
                </tr>
              );
            })
          ) : (
            <p>No Record Found. </p>
          )}
        </table>
      </div>
    </div>
  );
}

export default MedicineData;
