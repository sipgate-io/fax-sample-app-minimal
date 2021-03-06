# Fax example app - minimal blog version

This app demonstrates the fax sending capabilities of the [sipgateio](https://github.com/sipgate-io/sipgateio-node) library.

A tutorial using this code can be found in this [article](https://www.sipgate.io/blog/fax-app).

## Introduction

You might think sending faxes is a bit outdated, and you might be right. But there still might be [reasons](https://faxauthority.com/why-is-faxing-still-used/) for you or your organization to use it. In our [fax app tutorial](link to blog post), we show you how to build a state-of-the-art fax sending app which runs on both Android and iOS.


## Getting started

First make sure, you follow the [react-native environment setup guide](https://reactnative.dev/docs/environment-setup) for your respective environment.

After cloning the repository, fire up your shell and install the dependencies using `npm`.

```sh
git clone https://github.com/sipgate-io/fax-sample-app-minimal
cd fax-sample-app-minimal/
npm install
```

You should now be able to start the bundle server and build the package for either Android or iOS, depending on your target.

```sh
npm start

# Execute app on android targets (emulator or device)
npm run android

# Execute app on iOS targets
npm run ios
```

Now you can change the code according to your requirements.

## Building a release version

The last step is to prepare a standalone release package to install on an actual device.

### Android

Building an `.apk` for Android devices requires you change your working directory to `android/` and build the app using gradle.

```sh
cd android/
./gradlew assembleRelease
```

The final `app-release.apk` will end up in `app/build/outputs/apk/release`.

You can now copy the `.apk` to your device and install it by enabling unknown sources.
