import { getAnalytics, logEvent as firebaseLogEvent } from "firebase/analytics";

import { isDevMode } from "@/consts/env";

const useAnalytics = () => {
  const analytics = getAnalytics();

  const logEvent = (eventName: string, eventParam: Record<string, any>) => {
    if (isDevMode) return;
    firebaseLogEvent(analytics, eventName, eventParam);
  };

  return { logEvent };
};

export default useAnalytics;
