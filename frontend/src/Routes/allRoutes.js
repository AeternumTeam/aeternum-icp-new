
import Dashboard from "../pages/Dashboard/Layout";
import Layout1 from "../pages/Layout1/Layout1";
import Instansi from "../pages/Instansi/Layout";
import Callback from "../pages/Callback/Layout";
import CheckSertificate from "../pages/CheckSertificate/Layout";
import AboutPage from "../pages/About/Layout";

const Routes = [
  { path: "/", component: <Layout1 /> },
  { path: "/about", component: <AboutPage /> },
  { path: "/checkcertificate", component: <CheckSertificate /> },
  { path: "/:username", component: <Dashboard /> },
  { path: "/auth/callback", component: <Callback/> },
  { path: "/instansi", component: <Instansi /> },
];

export default Routes;
