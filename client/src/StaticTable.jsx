import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios'; // Import Axios for making HTTP requests

const StaticTable = ({ userData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the "/data" endpoint
        const response = await axios.get('http://localhost:5000/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, display an error message, etc.
      }
    };

    fetchData();
  }, []); // Run once on component mount

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StaticTable;
