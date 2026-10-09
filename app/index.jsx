import { Link, Stack, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const row = { width: 320, minHeight: 72, padding: 24, borderWidth: 1, marginBottom: 16 };

export default function Reproduction() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 120 }}>
      <Stack.Screen options={{ headerShown: true, title: "Link Preview accessibility" }} />
      <Link href="/a11y-repro-target" asChild>
        <Pressable accessible accessibilityRole="button" accessibilityLabel="Plain link" style={row}>
          <Text style={{ color: "black", fontSize: 17 }}>Plain link</Text>
        </Pressable>
      </Link>
      <Link href="/a11y-repro-target" asChild>
        <Link.Trigger>
          <Pressable accessible accessibilityRole="button" accessibilityLabel="Preview link" style={row}>
            <Text style={{ color: "black", fontSize: 17 }}>Preview link</Text>
          </Pressable>
        </Link.Trigger>
        <Link.Preview />
      </Link>
      <View accessible accessibilityRole="button" accessibilityLabel="Wrapped preview link"
        accessibilityActions={[{ name: "activate" }]}
        onAccessibilityAction={() => router.push("/a11y-repro-target")}>
        <Link href="/a11y-repro-target" asChild>
          <Link.Trigger>
            <Pressable style={row}><Text style={{ color: "black", fontSize: 17 }}>Wrapped preview link</Text></Pressable>
          </Link.Trigger>
          <Link.Preview />
        </Link>
      </View>
    </View>
  );
}
