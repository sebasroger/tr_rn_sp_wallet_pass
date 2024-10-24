// React Native
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  ReactNative.NativeModules.DeviceInfoManager = {
    getUniqueDeviceId: jest.fn().mockResolvedValue('device-id-test-12345'),
  };

  ReactNative.NativeModules.WalletPass = {
    canAddPasses: jest.fn().mockResolvedValue(true),
  };

  return ReactNative;
});

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);
