cd android
./gradlew clean && ./gradlew assemble
rm /mnt/d/app.apk
cp app/build/outputs/apk/debug/app-debug.apk /mnt/d/app.apk