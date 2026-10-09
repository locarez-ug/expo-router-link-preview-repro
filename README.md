# Expo Router Link Preview accessibility reproduction

The home screen has three links to the same destination:

1. A plain `Link asChild` around an accessible `Pressable`.
2. The same control inside `Link.Trigger`, with `Link.Preview`.
3. A preview link inside a separate accessible `View`, with an activate action.

On iOS 27, the accessibility tree lists the first and third controls. It omits the second control even though its text and border are visible and touch navigation works.

## Run

```sh
npm ci
npm run ios -- --device "iPhone 18 Pro"
```

Use an iOS development build. This repository has no app accounts or server requirements. The scene-life-cycle config plugin connects Expo's scene delegate so SDK 57 can launch under the iOS 27 SDK. It does not change links or accessibility. SDK 57 scene support is described in [Expo's guide](https://github.com/expo/fyi/blob/main/ios-scene-lifecycle.md).

## Verify

Inspect the iOS accessibility tree with Accessibility Inspector or XCTest. Compare all three visible rows. Enable VoiceOver to check focus separately.

`accessibility.txt` contains the XCTest snapshot from a clean native development build of this project. `screenshot.png` shows the three visible rows. These observations confirm an accessibility-tree defect. They do not claim a manual VoiceOver test.

Suspected boundary: `LinkWithPreview` places `NativeLinkPreview` around the trigger with `display: contents`. The wrapper has no layout frame. The accessible child disappears under this native parent. Giving accessibility to a normal wrapper outside the preview restores the row.

Environment: Xcode 27.0, iOS 27.0 Simulator, React Native 0.86.3, Expo Router 57.0.25, Expo 57.0.27. `npx expo-doctor` passed all 21 checks on 9 October 2026. A clean simulator build completed with 0 errors.
