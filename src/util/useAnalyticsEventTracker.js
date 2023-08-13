import React from "react";
import ReactGA from "react-ga";

ReactGA.initialize('G-T0656S73M1');

const useAnalyticsEventTracker = (category="Blog category") => {
  const eventTracker = (action = "test action", label = "test label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;
