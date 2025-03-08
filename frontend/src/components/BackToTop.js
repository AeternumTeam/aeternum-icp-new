import React, { useEffect, useState } from "react";

// When the user clicks on the button, scroll to the top of the document
const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


const BackToTop = () => {

  const [Class, setClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
  });
  
  function scrollFunction() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      setClass("d-block");

    } else {
      setClass("d-none");
    }
  }

  return (
    <React.Fragment>
      <button onClick={topFunction} id="back-to-top" className={Class}>
        <i className="mdi mdi-arrow-up-bold"></i>
      </button>
    </React.Fragment>
  );
}

export default BackToTop;
