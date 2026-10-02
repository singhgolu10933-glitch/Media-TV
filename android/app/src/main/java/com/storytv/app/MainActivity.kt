 package com.storytv.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

data class Story(
    val title: String,
    val category: String,
    val description: String
)

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            StoryTvApp()
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StoryTvApp() {

    val stories = listOf(
        Story(
            title = "The Last Letter",
            category = "Drama",
            description = "A mysterious letter changes everything."
        ),
        Story(
            title = "Midnight Mystery",
            category = "Mystery",
            description = "A strange mystery begins at midnight."
        ),
        Story(
            title = "Campus Days",
            category = "Romance",
            description = "A story about friendship, love and college life."
        )
    )

    MaterialTheme {

        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text("Story TV")
                    }
                )
            }
        ) { paddingValues ->

            LazyColumn(
                modifier = Modifier
                    .padding(paddingValues)
                    .fillMaxSize(),

                contentPadding = PaddingValues(16.dp),

                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {

                item {

                    Text(
                        text = "Featured Stories",
                        style = MaterialTheme.typography.headlineSmall
                    )

                    Spacer(
                        modifier = Modifier.height(12.dp)
                    )
                }

                items(stories) { story ->

                    StoryCard(story)
                }
            }
        }
    }
}

@Composable
fun StoryCard(story: Story) {

    Card(
        modifier = Modifier
            .fillMaxWidth()
    ) {

        Column(
            modifier = Modifier
                .padding(18.dp)
        ) {

            Text(
                text = story.title,
                style = MaterialTheme.typography.titleLarge
            )

            Spacer(
                modifier = Modifier.height(5.dp)
            )

            Text(
                text = story.category,
                style = MaterialTheme.typography.labelLarge
            )

            Spacer(
                modifier = Modifier.height(8.dp)
            )

            Text(
                text = story.description
            )

            Spacer(
                modifier = Modifier.height(12.dp)
            )

            Button(
                onClick = {
                    // Watch button action will be added later
                }
            ) {
                Text("Watch")
            }
        }
    }
}
