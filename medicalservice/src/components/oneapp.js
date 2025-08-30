import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ComponentsCSS/oneapp.css";

function Oneapp(props) {
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div id="App-appoint" ref={printRef}>
                <h2>Selected Details:</h2>
                <p className="fw-5 fs-5 mb-3">
                  Patient Name: {props.selectedDetails.name}
                </p>
                <p className="fw-5 fs-5 mb-3">
                  Patient Gender: {props.selectedDetails.gender}
                </p>
                <p className="fw-5 fs-5 mb-3">
                  Service: {props.selectedDetails.service}
                </p>
                <p className="fw-5 fs-5 mb-3">
                  Doctor Name: {props.selectedDetails.doctor}
                </p>
                <p className="fw-5 fs-5 mb-3">
                  Hospital: {props.selectedDetails.hospital}
                </p>
                <p className="fw-5 fs-5 mb-3">
                  Time: {props.selectedDetails.time}
                </p>
                <p className="fw-5 fs-5 mb-3">
                  Date: {props.selectedDetails.date}
                </p>
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  id="okbtn"
                  type="button"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  OK
                </button>
                <button
                  className="btn btn-primary"
                  id="printbtn"
                  type="button"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oneapp;
