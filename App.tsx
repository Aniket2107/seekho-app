import React from "react";

import Routes from "./Routes";

import Auth from "./context/store/Auth";

export default function App() {
  return (
    <Auth>
      <Routes />
    </Auth>
  );
}
