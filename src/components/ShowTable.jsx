import styled from 'styled-components';
import axios from 'axios';

export function ShowTable({ data,baseURL,getData }) {

    const TableHead = styled.th`
      width: 25vw;
    `;

    const Table = styled.table`
      border: 1px solid black;
      text-align: center;
    `;

    const handleDelete = async (id) => {
        
        const res = await axios.delete(`http://localhost:3001/user/${id}`);
        getData();
    }

  return (
    <Table>
      <tr>
    
          <TableHead>Name</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Salary</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Department</TableHead>
              <TableHead>Marital Status</TableHead>
              <TableHead>Edit</TableHead>
        
      </tr>
      {data.map((el) => {
        return (
          <tr key={el.id}>
            <td>{el.name}</td>
            <td>{el.address}</td>
            <td>&#8377; {" "}{el.salary}</td>
            <td>{el.age}</td>
            <td>{el.department}</td>
            <td>{el.maritalStatus ? "Married" : "Single"}</td>
            <td>
              <button onClick={() => handleDelete(el.id)}>Delete</button>
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
