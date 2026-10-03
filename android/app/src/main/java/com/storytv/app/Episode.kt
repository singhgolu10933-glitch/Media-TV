package com.storytv.app

data class Episode(
    val number: Int,
    val title: String,
    val description: String,
    val videoUrl: String,
    val durationSeconds: Int
)
