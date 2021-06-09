import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { COLUMNS } from "../components/submissionColumns";
import { useTable } from "react-table";
import styled from "styled-components";
import Moment from "moment";

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
      setSubmissions([...response.data.data]);
    });
  }, []);

  const deleteSubmit = (index) => {
    var list = submissions;
    axios({
      method: "post",
      url: "https://g14gr1ugze.execute-api.us-east-1.amazonaws.com/dev/deleteSubmission",
      data: submissions[index],
    });
    list.splice(index, 1);
    setSubmissions([...list]);
  };
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
          <Link to="/proposalSubmission">
            <div className="main-box mb-red">
              <i className="fa fa-bolt fa-5x"></i>
              <h5>Proposal Submission</h5>
            </div>
          </Link>
        </div>
        <div className="col-md-4 simple-table">
          <a href="./report_form.php">
            <div className="main-box mb-dull">
              <i className="fa fa-plug fa-5x"></i>
              <h5>Report Submission</h5>
            </div>
          </a>
        </div>
        <div className="col-md-4 simple-table">
          <a href="./plan_form.php">
            <div className="main-box mb-pink">
              <i className="fa fa-dollar fa-5x"></i>
              <h5>Annual Plan Report Submission</h5>
            </div>
          </a>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Submission History</h2>
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
                          <td>
                            {(() => {
                              if (submission.submit_type === "P") {
                                return "Proposal";
                              } else if (submission.submit_type === "R") {
                                return "Report";
                              } else {
                                return "Annual Plan Report";
                              }
                            })()}
                          </td>
                          <td>
                            {(() => {
                              if (submission.type === "LC") {
                                return "Local Chapter";
                              } else if (submission.type === "APS") {
                                return "APS";
                              } else {
                                return "Regional Conference";
                              }
                            })()}
                          </td>
                          <td>{submission.amount}</td>
                          <td>
                            {Moment(submission.event_date_from).format(
                              "MM-DD-YYYY"
                            )}
                          </td>
                          <td>
                            {Moment(submission.event_date_to).format(
                              "MM-DD-YYYY"
                            )}
                          </td>
                          <td>
                            <button onClick={() => deleteSubmit(index)}>
                              Delete
                            </button>
                          </td>
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
