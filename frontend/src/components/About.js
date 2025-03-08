import React, { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <React.Fragment>
      <section className="bg-light">
        <div className="about mt-5 container d-flex flex-column align-items-center justify-content-center" id="about">
          <div className="mt-4 mt-lg-0 text-center">
              <h3 className="text-uppercase title">Tentang Aeternum</h3>
              <p className="title-about mt-4">Platform penyimpanan sertifikat berbasis <Link to="https://www.blockchain.com/" className="link">blockchain</Link> yang menawarkan keamanan, transparansi, dan kemudahan akses. Dengan teknologi blockchain, setiap sertifikat dicatat secara desentralisasi dalam blok data yang tidak dapat diubah atau dimanipulasi. Hal ini memastikan keaslian sertifikat dan melindunginya dari risiko pemalsuan atau kehilangan.</p>
              <p className="title-about mt-3">
                  Aeternum menggabungkan teknologi blockchain dengan AI untuk memverifikasi data dan metadata sertifikat secara otomatis. Proses ini memastikan setiap dokumen yang diunggah valid dan sesuai standar tanpa memerlukan pemeriksaan manual. Solusi ini dirancang untuk mempermudah individu, institusi pendidikan, dan perusahaan dalam mengelola dan memverifikasi dokumen penting mereka.
              </p>
              <p className="title-about mt-3">
                  Aeternum terus berkembang untuk memenuhi kebutuhan pengguna dengan menambahkan fitur-fitur seperti integrasi fleksibel dan alat analitik. Dengan komitmen pada inovasi, Aeternum tidak hanya menjadi tempat penyimpanan sertifikat, tetapi juga solusi terpercaya untuk membangun kepercayaan di era digital.
              </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default About;
