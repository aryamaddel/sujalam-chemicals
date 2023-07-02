import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { AuthStore } from "../store";

const Index = () => {
  const segments = useSegments();
  const router = useRouter();
  const { isLoggedIn } = AuthStore.useState((s) => s);
  const navigationState = useRootNavigationState();

  React.useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      router.replace("(auth)/login");
    } else if (isLoggedIn) {
      router.replace("(pages)/home");
    }
  }, [isLoggedIn, segments, navigationState?.key]);

  return <View>{!navigationState?.key ? <Text>LOADING...</Text> : <></>}</View>;
};
export default Index;
