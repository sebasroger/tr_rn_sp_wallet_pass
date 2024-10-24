package com.walletpass;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.util.SparseArray;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.google.android.gms.pay.Pay;
import com.google.android.gms.pay.PayApiAvailabilityStatus;
import com.google.android.gms.pay.PayClient;

@ReactModule(name = WalletPassModule.NAME)
public class WalletPassModule extends ReactContextBaseJavaModule {

    public static final String NAME = "WalletPass";
    private Promise activityPromise;
    private ReactApplicationContext reactContext;
    private PayClient walletClient;
    private int addToGoogleWalletRequestCode = 1000;

    public WalletPassModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return NAME;
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == addToGoogleWalletRequestCode) {
                if (activityPromise != null) {
                    switch (resultCode) {
                        case Activity.RESULT_OK:
                            activityPromise.resolve("Pass added to Google Wallet successfully");
                            break;
                        case Activity.RESULT_CANCELED:
                            activityPromise.reject("Error adding pass to Google Wallet RESULT_CANCELED Result Code: " + resultCode);
                            break;
                        case PayClient.SavePassesResult.INTERNAL_ERROR:
                            activityPromise.reject("Error adding pass to Google Wallet INTERNAL_ERROR Result Code: " + resultCode);
                            break;
                        case PayClient.SavePassesResult.API_UNAVAILABLE:
                            activityPromise.reject("Error adding pass to Google Wallet API_UNAVAILABLE Result Code: " + resultCode);
                            break;
                        case PayClient.SavePassesResult.SAVE_ERROR:
                            if (data != null) {
                                String apiErrorMessage = data.getStringExtra(PayClient.EXTRA_API_ERROR_MESSAGE);
                                activityPromise.reject("Error adding pass to Google Wallet apiErrorMessage: " + apiErrorMessage);
                            }
                            break;
                        default:
                            activityPromise.reject("Error adding pass to Google Wallet default option: " + resultCode);
                            break;
                    }
                }
            }
        }
    };

    @ReactMethod
    public void canAddPasses(Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            this.walletClient = Pay.getClient(this.reactContext);
            this.walletClient.getPayApiAvailabilityStatus(PayClient.RequestType.SAVE_PASSES)
                    .addOnSuccessListener(status -> promise.resolve(status == PayApiAvailabilityStatus.AVAILABLE))
                    .addOnFailureListener(e -> promise.reject("400", "Something went wrong"));
        }
    }

    @ReactMethod
    public void addPass(String passJWTObject, Promise promise) {
        Activity activity = getCurrentActivity();
        activityPromise = promise;
        if (activity != null && this.walletClient != null) {
            this.walletClient.savePassesJwt(passJWTObject, activity, this.addToGoogleWalletRequestCode);
        } else {
            promise.reject("Activity is null", "Activity is null");
        }
    }
}
