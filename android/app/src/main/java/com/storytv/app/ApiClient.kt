package com.storytv.app

import androidx.compose.ui.graphics.Color
import org.json.JSONArray
import java.net.HttpURLConnection
import java.net.URL

object ApiClient {

    /*
     * Media TV Backend
     *
     * Backend deploy hone ke baad
     * is URL ko actual API URL se replace karna hai.
     */
    private const val BASE_URL =
        "https://YOUR-MEDIA-TV-BACKEND.com"

    fun getStories(): List<MediaStory> {

        return try {

            val connection =
                URL("$BASE_URL/api/stories")
                    .openConnection() as HttpURLConnection

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

            parseStories(response)

        } catch (exception: Exception) {

            exception.printStackTrace()

            emptyList()
        }
    }

    private fun parseStories(
        json: String
    ): List<MediaStory> {

        val stories = mutableListOf<MediaStory>()

        val array = JSONArray(json)

        for (index in 0 until array.length()) {

            val item =
                array.getJSONObject(index)

            val title =
                item.optString(
                    "title",
                    "Untitled Story"
                )

            val category =
                item.optString(
                    "category",
                    "Drama"
                )

            val thumbnail =
                item.optString(
                    "thumbnail_url",
                    ""
                )

            val description =
                item.optString(
                    "description",
                    "A new story from Media TV."
                )

            stories.add(
                MediaStory(
                    title = title,
                    category = category,
                    image = thumbnail,
                    description = description,
                    gradient =
                        gradientForCategory(
                            category
                        )
                )
            )
        }

        return stories
    }

    private fun gradientForCategory(
        category: String
    ): List<Color> {

        return when (
            category.lowercase()
        ) {

            "mystery" -> listOf(
                Color(0xFF193A6B),
                Color(0xFF0B101D)
            )

            "romance" -> listOf(
                Color(0xFF963B66),
                Color(0xFF21101A)
            )

            "thriller" -> listOf(
                Color(0xFF38505C),
                Color(0xFF0D1114)
            )

            "comedy" -> listOf(
                Color(0xFF8A5A18),
                Color(0xFF21180A)
            )

            "action" -> listOf(
                Color(0xFF9A3412),
                Color(0xFF1C0B05)
            )

            "horror" -> listOf(
                Color(0xFF4C0519),
                Color(0xFF09090B)
            )

            else -> listOf(
                Color(0xFF54258C),
                Color(0xFF17101F)
            )
        }
    }
}
