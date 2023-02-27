import React, { FC } from "react";
import Banner from "./components/Banner";
import MainView from "./components/MainView";
import Tags from "./components/Tags";
import useStores from "../../hooks/useStores";

const Home: FC = () => {
  const { commonStore } = useStores();
  const { token, appName } = commonStore;
  return (
    <div className="home-page">
      <Banner token={token} appName={appName} />
      <div className="container page">
        <div className="row">
          <MainView />
          <Tags />
        </div>
      </div>
    </div>
  );
};

export default Home;
