// iOS 27 does not launch an app that has no UIScene life cycle. Expo 57 ships the scene
// delegate (`EXExpoAppSceneDelegate`), but its project template still makes the window in the
// app delegate. Remove this plugin when the template adopts the scene delegate.
const { withAppDelegate, withInfoPlist } = require("expo/config-plugins");

const WINDOW_SETUP = `#if os(iOS) || os(tvOS)
    window = UIWindow(frame: UIScreen.main.bounds)
    factory.startReactNative(
      withModuleName: "main",
      in: window,
      launchOptions: launchOptions)
#endif
`;

function replaceOnce(source, from, to) {
  if (source.includes(to)) return source;
  if (!source.includes(from)) {
    throw new Error(`with-scene-life-cycle: AppDelegate.swift no longer contains:\n${from}`);
  }
  return source.replace(from, to);
}

module.exports = function withSceneLifeCycle(config) {
  config = withAppDelegate(config, (mod) => {
    let source = mod.modResults.contents;
    source = replaceOnce(
      source,
      "class AppDelegate: ExpoAppDelegate {",
      "class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider {",
    );
    source = source.replace(WINDOW_SETUP, "");
    if (source.includes("UIWindow(frame:")) {
      throw new Error("with-scene-life-cycle: AppDelegate.swift still makes its own window");
    }
    mod.modResults.contents = source;
    return mod;
  });

  return withInfoPlist(config, (mod) => {
    mod.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: "Default Configuration",
            UISceneDelegateClassName: "EXExpoAppSceneDelegate",
          },
        ],
      },
    };
    return mod;
  });
};
