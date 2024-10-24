import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'wallet-pass' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const WalletPass = NativeModules.WalletPass
  ? NativeModules.WalletPass
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export async function canAddWalletPass(): Promise<boolean> {
  return await WalletPass.canAddPasses();
}

/*
 * walletPass: jwt or pkpass file
 */
export async function addWalletPass(walletPass: string): Promise<string> {
  return await WalletPass.addPass(walletPass);
}
