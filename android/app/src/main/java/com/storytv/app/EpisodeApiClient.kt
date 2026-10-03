package com.storytv.app

import org.json.JSONArray
import java.net.HttpURLConnection
import java.net.URL

object EpisodeApiClient {

    private const val BASE_URL =
        "https://YOUR-MEDIA-TV-BACKEND.com"

    fun getEpisodes(
        storyId: Long
    ): List<Episode> {

        return try {

            val connection =
                URL(
                    "$BASE_URL/api/stories/$storyId/episodes"
                ).openConnection()
                    as HttpURLConnection

            connection.requestMethod = "GET"
            connection.connectTimeout = 10000
            connection.readTimeout = 10000

            if (connection.responseCode !in 200..299) {
                connection.disconnect()
                return emptyList()
            }

            val response =
                connection.inputStream
                    .bufferedReader()
                    .use { reader ->
                        reader.readText()
                    }

            connection.disconnect()

            parseEpisodes(response)

        } catch (exception: Exception) {

            exception.printStackTrace()

            emptyList()
        }
    }

    private fun parseEpisodes(
        json: String
    ): List<Episode> {

        val episodes =
            mutableListOf<Episode>()

        val array =
            JSONArray(json)

        for (index in 0 until array.length()) {

            val item =
                array.getJSONObject(index)

            val episodeNumber =
                item.optInt(
                    "episode_number",
                    index + 1
                )

            val title =
                item.optString(
                    "title",
                    "Episode $episodeNumber"
                )

            val description =
                item.optString(
                    "description",
                    "A new episode from Media TV."
                )

            val videoUrl =
                item.optString(
                    "video_url",
                    ""
                )

            val durationSeconds =
                item.optInt(
                    "duration_seconds",
                    0
                )

            val duration =
                formatDuration(
                    durationSeconds
                )

            episodes.add(
                Episode(
                    number = episodeNumber,
                    title = title,
                    description = description,
                    duration = duration,
                    videoUrl = videoUrl
                )
            )
        }

        return episodes
    }

    private fun formatDuration(
        seconds: Int
    ): String {

        if (seconds <= 0) {
            return "--:--"
        }

        val minutes =
            seconds / 60

        val remainingSeconds =
            seconds % 60

        return String.format(
            "%02d:%02d",
            minutes,
            remainingSeconds
        )
    }
}
