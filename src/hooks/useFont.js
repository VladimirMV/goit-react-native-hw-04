import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
export const fontFamily = {
  roboto400: "Roboto-Regular",
  roboto500: "Roboto-Medium",
  roboto700: "Roboto-Bold",
  inter500: "Inter-Medium",
};

export const useFont = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          [fontFamily.roboto500]: require("../assets/fonts/Roboto-Medium.ttf"),
          [fontFamily.roboto700]: require("../assets/fonts/Roboto-Bold.ttf"),
          [fontFamily.roboto400]: require("../assets/fonts/Roboto-Regular.ttf"),
          [fontFamily.inter500]: require("../assets/fonts/Inter-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  return { isReady, onLayoutRootView };
};
