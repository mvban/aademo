# GitHub Actions Android APK Workflow Design

## Intent

Build a downloadable Android debug APK for this Capacitor app in GitHub
Actions, suitable for a public repository.

## Goals

- Build the existing Vite web app into `dist/`.
- Generate the missing Capacitor Android project inside CI.
- Build `app-debug.apk` without requiring secrets.
- Upload the APK as a retained GitHub Actions artifact.
- Run on pushes, pull requests, and manual dispatch.

## Non-goals

- Publishing to Google Play.
- Producing a signed release APK.
- Committing generated Android platform files to the repository.

## Approaches

The chosen approach generates Android during CI because this repository currently
has no `android/` directory. Committing the generated project would support more
native customization but adds a large platform-specific tree and maintenance
burden. Signing is intentionally excluded because a public repository must keep
keystores and passwords in GitHub Secrets.

## Implementation

- Add `@capacitor/android` matching the existing Capacitor major version.
- Add `.github/workflows/android-apk.yml` using Node, Java, and Android SDK setup.
- Run the Vite build, `npx cap add android`, and `npx cap sync android`.
- Build the debug APK with the generated Gradle wrapper.
- Upload `android/app/build/outputs/apk/debug/app-debug.apk` as an artifact.
