package com.storytv.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
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
        setContent { StoryTvApp() }
    }
}

@Composable
fun StoryTvApp() {
    val stories = listOf(
        Story("The Last Letter", "Drama", "A sample short-story series."),
        Story("Midnight Mystery", "Mystery", "A sample mystery series."),
        Story("Campus Days", "Romance", "A sample college story.")
    )

    MaterialTheme {
        Scaffold(
            topBar = { TopAppBar(title = { Text("Story TV") }) }
        ) { padding ->
            LazyColumn(
                modifier = Modifier
                    .padding(padding)
                    .fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    Text("Featured Stories", style = MaterialTheme.typography.headlineSmall)
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
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(18.dp)) {
            Text(story.title, style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.height(5.dp))
            Text(story.category, style = MaterialTheme.typography.labelMedium)
            Spacer(Modifier.height(8.dp))
            Text(story.description)
            Spacer(Modifier.height(12.dp))
            Button(onClick = { }) {
                Text("Watch")
            }
        }
    }
}
