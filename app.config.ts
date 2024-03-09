export default {
  expo: {
    name: 'Park Finder',
    displayName: 'Park Finder',
    owner: 'iammond',
    slug: 'park-finder',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.parkfinder.app',
      adaptiveIcon: {
        foregroundImage: './src/assets/icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '49ae23db-7dff-46de-8913-ad2ecb7c584e',
      },
    },
    updates: {
      url: 'https://u.expo.dev/49ae23db-7dff-46de-8913-ad2ecb7c584e',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
};
