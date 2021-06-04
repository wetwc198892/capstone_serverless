import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { COLUMNS } from "../components/submissionColumns";
import { useTable } from "react-table";
import styled from "styled-components";

function Submission() {
  const Styles = styled.div`
    table {
      border-spacing: 0;
      border: 1px solid black;

      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
          border-right: 0;
        }
      }

      th {
        background: green;
        border-bottom: 3px solid blue;
        color: white;
        fontweight: bold;
      }
    }
  `;
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://g14gr1ugze.execute-api.us-east-1.amazonaws.com/dev/getSubmissions",
    }).then((response) => {
      const res = response.data.data;
      if (Array.isArray(res)) {
        setSubmissions(res);
      } else {
        setSubmissions([res]);
      }
    });
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => submissions, [submissions]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div
      className="panel panel-default"
      style={{ width: "100%", padding: "75px 50px 50px 50px", align: "center" }}
    >
      <div className="row" style={{ marginTop: "0%" }}>
        <div className="col-md-4 simple-table">
          <a href="./form.php">
            <div className="main-box mb-red">
              <i className="fa fa-bolt fa-5x"></i>
              <h5>Proposal Submition</h5>
            </div>
          </a>
        </div>
        <div className="col-md-4 simple-table">
          <a href="./report_form.php">
            <div className="main-box mb-dull">
              <i className="fa fa-plug fa-5x"></i>
              <h5>Report Submition</h5>
            </div>
          </a>
        </div>
        <div className="col-md-4 simple-table">
          <a href="./plan_form.php">
            <div className="main-box mb-pink">
              <i className="fa fa-dollar fa-5x"></i>
              <h5>Annual Plan Report Submition</h5>
            </div>
          </a>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Submition History</h2>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <Styles>
                <table {...getTableProps()} style={{ width: "100%" }}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {submissions.map((submission, index) => {
                      return (
                        <tr key={index}>
                          <td>{submission.title}</td>
                          <td>{submission.amount}</td>
                          <td>{submission.event_date_from}</td>
                          <td>{submission.event_date_to}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Styles>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submission;
