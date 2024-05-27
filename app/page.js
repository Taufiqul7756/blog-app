"use client";

import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import Timeline from "./components/Timeline.jsx";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex font-bold text-3xl min-h-screen flex-col items-center justify-between p-24">
        <Timeline />
      </div>
    </Provider>
  );
}
