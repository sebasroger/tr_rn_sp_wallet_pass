import { Platform } from 'react-native';

import { canAddWalletPass } from '../index';

jest.mock('react-native', () => {
  const Platform = jest.requireActual('react-native');
  Platform.OS = 'android';
  return Platform;
});

describe('Wallet Passes', () => {
  it('should validate can add passes on Android', async () => {
    const result = await canAddWalletPass();
    expect(result).toBe(true);
  });

  it('should validate can add passes on IOS', async () => {
    Platform.OS = 'ios';
    const result = await canAddWalletPass();
    expect(result).toBe(true);
  });
});
