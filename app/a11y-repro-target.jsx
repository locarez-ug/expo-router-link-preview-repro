import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Destination() {
  return <View style={{ flex: 1, padding: 24, paddingTop: 120 }}>
    <Stack.Screen options={{ headerShown: true, title: "Destination" }} />
    <Text>Link opened successfully</Text>
  </View>;
}
