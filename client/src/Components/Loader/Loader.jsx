import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="Loader_Container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
