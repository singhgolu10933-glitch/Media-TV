plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.storytv.app"

    compileSdk = 36

    defaultConfig {
        applicationId = "com.storytv.app"

        minSdk = 24
        targetSdk = 36

        versionCode = 1
        versionName = "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {

    implementation("androidx.activity:activity-compose:1.10.0")

    implementation("androidx.compose.ui:ui:1.7.6")
    implementation("androidx.compose.material3:material3:1.3.1")
    implementation("androidx.compose.ui:ui-tooling-preview:1.7.6")

    implementation("io.coil-kt:coil-compose:2.7.0")

    // Media TV video player
    implementation("androidx.media3:media3-exoplayer:1.8.0")
    implementation("androidx.media3:media3-ui:1.8.0")

    // Media TV API networking
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.10.2")
}
