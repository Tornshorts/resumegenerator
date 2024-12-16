import React from "react";
import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function Header() {
  return (
    <>
      <div className="heaerstyles">
        {" "}
        <Navbar bg="primary" className="d-flex justify-content-center ">
          {" "}
          ResumeGo
        </Navbar>{" "}
      </div>
    </>
  );
}

export default Header;
