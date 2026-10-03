package com.storytv.app

import androidx.compose.ui.graphics.Color

data class MediaStory(
    val title: String,
    val category: String,
    val image: String,
    val description: String,
    val gradient: List<Color>
)
