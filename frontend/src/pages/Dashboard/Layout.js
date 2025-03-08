import React from "react";
import NavBar from "../../Layout/Navbar";
import BackToTop from "../../components/BackToTop";
import Footer from "../../Layout/Footer";
import FooterAlt from "../../Layout/FooterAlt";
import ContainerProfile from "../../components/ContainerProfile";
import NavBarDashboard from "../../Layout/NavbarDashboard";
import BadgeWalletCard from "../../components/Badge";
import useAuth from "../../hooks/auth-check";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { username } = useParams();
  const { error, isAuthenticated } = useAuth();

  if (error) {
      console.error(error)
  }

  return (
    <React.Fragment>
      <NavBarDashboard isDark={true} />
      {}
    <ContainerProfile />
    <BadgeWalletCard />
      <Footer />
      <FooterAlt />
      <BackToTop />
    </React.Fragment>
  );
};

export default Dashboard;
