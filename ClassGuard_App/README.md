# mvc

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

```bash
brew install automake
brew install libtool
git clone https://github.com/tensorflow/tensorflow

# Bazel là một công cụ xây dựng được sử dụng để xây dựng TensorFlow. https://bazel.build/install/os-x
# https://bazel.build/install/os-x#install-on-mac-os-x-homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install bazel
bazel --version
cd && cd tensorflow && ./configure

```
https://github.com/am15h/object_detection_flutter/issues/39#issue-1607307182
To add the TensorFlowLiteC.framework successfully and avoid the compile error, download the .zip file, unpack it. Then move this folder (TensorFlowLiteC.framework) into your pub.dev cache folder: ~/pub-cache/hosted/pub.dev/tflite_flutter-0.9.0/ios/ (macOS).

Run flutter clean && flutter pub get,
then pod install in your ios folder.

This should work 😎

Just FYI, I only ran the project for iOS, so if you're wanting to add Android just 
```
flutter create . --platforms=android
```
inside the root of the project folder.
