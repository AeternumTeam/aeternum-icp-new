import React from "react";
import routes from "./allRoutes";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Index";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {routes.map((route, idx) => (
            <Route path={route.path} element={
              <Layout>
                {route.component}
              </Layout>
            } key={idx} />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;



