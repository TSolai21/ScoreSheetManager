import React from "react";
import styles from "./TableRow.module.css";
const TableRow = ({ data }) => {
  return (
    <>
      <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.phone}</td>
        <td>{data.gender}</td>
        <td>{data.standard}</td>
        <td>{data.tamil}</td>
        <td>{data.english}</td>
        <td>{data.maths}</td>
        <td>{data.science}</td>
        <td>{data.social_science}</td>
        <td>{data.total}</td>
        <td>{data.average}</td>
        <td>{data.grade}</td>
      </tr>
    </>
  );
};

export default TableRow;
