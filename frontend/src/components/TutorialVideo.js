import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";

import imgVideo from "../assets/images/video.png"

const TutorialVideo = () => {
    const [isOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <section className="mt-5" id="process">
        <div className="home-dashboard mt-4 mt-lg-0 text-center">

            <div className="">
            <Link to="#" onClick={() => setOpen(true)} className="image-popup">
            <img 
            width={700}
            src={imgVideo} 
            alt="" 
            className="img-fluid mt-5" 
            />
            </Link>
            </div>
        </div>
      </section>

      <ModalVideo
        channel="youtube"
        videoId="dIYi-v5pvGk"
        autoplay
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
    </React.Fragment>
  );
}

export default TutorialVideo;
