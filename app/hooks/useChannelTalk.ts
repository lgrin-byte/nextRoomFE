"use client";

import { useEffect } from "react";

import ChannelTalk from "@/apis/ChannelTalk";
import { isDevMode } from "@/consts/env";

const useChannelTalk = () => {
  useEffect(() => {
    if (isDevMode) return () => null;
    const channelTalkInstance = new ChannelTalk();

    channelTalkInstance.loadScript();
    channelTalkInstance.boot({
      pluginKey: "acb0febb-fe4a-45ac-aca1-e7d8c5ed746f",
    });

    return () => {
      channelTalkInstance.shutdown();
    };
  }, []);
};

export default useChannelTalk;
