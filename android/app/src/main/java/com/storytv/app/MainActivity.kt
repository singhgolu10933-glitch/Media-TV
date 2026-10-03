package com.storytv.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage

data class MediaStory(
    val title: String,
    val category: String,
    val image: String,
    val description: String
)

data class Episode(
    val number: Int,
    val title: String,
    val description: String,
    val duration: String
)

private val Background = Color(0xFF07070A)
private val SurfaceDark = Color(0xFF111116)
private val CardDark = Color(0xFF18181F)
private val TextPrimary = Color(0xFFF7F7F8)
private val TextSecondary = Color(0xFF9999A5)
private val Accent = Color(0xFF8B5CF6)

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MediaTvApp()
        }
    }
}

@Composable
fun MediaTvApp() {

    var selectedTab by remember {
        mutableIntStateOf(0)
    }

    var selectedStory by remember {
        mutableStateOf<MediaStory?>(null)
    }

    MaterialTheme {

        Scaffold(
            containerColor = Background,

            bottomBar = {
                if (selectedStory == null) {
                    MediaBottomNavigation(
                        selectedTab = selectedTab,
                        onTabSelected = {
                            selectedTab = it
                        }
                    )
                }
            }

        ) { paddingValues ->

            if (selectedStory != null) {

                StoryDetailsScreen(
                    story = selectedStory!!,
                    modifier = Modifier
                        .padding(paddingValues),
                    onBack = {
                        selectedStory = null
                    }
                )

            } else {

                when (selectedTab) {

                    0 -> HomeScreen(
                        modifier = Modifier.padding(paddingValues),
                        onStoryClick = {
                            selectedStory = it
                        }
                    )

                    1 -> SearchScreen(
                        modifier = Modifier.padding(paddingValues),
                        onStoryClick = {
                            selectedStory = it
                        }
                    )

                    2 -> LibraryScreen(
                        modifier = Modifier.padding(paddingValues)
                    )

                    3 -> ProfileScreen(
                        modifier = Modifier.padding(paddingValues)
                    )
                }
            }
        }
    }
}

/* ================= HOME ================= */

@Composable
fun HomeScreen(
    modifier: Modifier = Modifier,
    onStoryClick: (MediaStory) -> Unit
) {

    val trending = listOf(
        MediaStory(
            "The Last Letter",
            "Drama",
            "https://placehold.co/600x900/24143d/ffffff?text=The+Last+Letter",
            "A mysterious letter changes everything."
        ),
        MediaStory(
            "Midnight Mystery",
            "Mystery",
            "https://placehold.co/600x900/151b32/ffffff?text=Midnight+Mystery",
            "A strange mystery begins at midnight."
        ),
        MediaStory(
            "Campus Days",
            "Romance",
            "https://placehold.co/600x900/3d202d/ffffff?text=Campus+Days",
            "Friendship, love and college life."
        ),
        MediaStory(
            "The Hidden Room",
            "Thriller",
            "https://placehold.co/600x900/20252c/ffffff?text=Hidden+Room",
            "Nobody knows what is behind the door."
        )
    )

    val newReleases = listOf(
        MediaStory(
            "Broken Promises",
            "Drama",
            "https://placehold.co/600x900/302020/ffffff?text=Broken+Promises",
            "Some promises are impossible to keep."
        ),
        MediaStory(
            "Dark Signal",
            "Thriller",
            "https://placehold.co/600x900/17252d/ffffff?text=Dark+Signal",
            "A mysterious signal appears every night."
        ),
        MediaStory(
            "First Love",
            "Romance",
            "https://placehold.co/600x900/3b2038/ffffff?text=First+Love",
            "A first love nobody expected."
        ),
        MediaStory(
            "Lost City",
            "Adventure",
            "https://placehold.co/600x900/172e28/ffffff?text=Lost+City",
            "An impossible journey begins."
        )
    )

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Background),
        contentPadding = PaddingValues(bottom = 30.dp)
    ) {

        item {
            TopHeader()
        }

        item {
            HeroBanner(
                onWatch = {
                    onStoryClick(trending[0])
                }
            )
        }

        item {
            StorySection(
                title = "🔥 Trending Now",
                stories = trending,
                onStoryClick = onStoryClick
            )
        }

        item {
            StorySection(
                title = "Continue Watching",
                stories = newReleases,
                onStoryClick = onStoryClick
            )
        }

        item {
            StorySection(
                title = "✨ New Releases",
                stories = trending.reversed(),
                onStoryClick = onStoryClick
            )
        }

        item {
            StorySection(
                title = "Popular Stories",
                stories = newReleases.reversed(),
                onStoryClick = onStoryClick
            )
        }
    }
}

/* ================= HEADER ================= */

@Composable
fun TopHeader() {

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(
                start = 20.dp,
                end = 20.dp,
                top = 18.dp,
                bottom = 14.dp
            ),
        verticalAlignment = Alignment.CenterVertically
    ) {

        Column(
            modifier = Modifier.weight(1f)
        ) {

            Text(
                text = "MEDIA TV",
                color = TextPrimary,
                fontSize = 22.sp,
                fontWeight = FontWeight.ExtraBold,
                letterSpacing = 1.2.sp
            )

            Text(
                text = "Stories worth watching",
                color = TextSecondary,
                fontSize = 11.sp
            )
        }

        Surface(
            modifier = Modifier.size(40.dp),
            shape = RoundedCornerShape(14.dp),
            color = CardDark
        ) {

            Box(
                contentAlignment = Alignment.Center
            ) {

                Text(
                    text = "⌕",
                    color = TextPrimary,
                    fontSize = 22.sp
                )
            }
        }
    }
}

/* ================= HERO ================= */

@Composable
fun HeroBanner(
    onWatch: () -> Unit
) {

    Box(
        modifier = Modifier
            .padding(horizontal = 16.dp)
            .fillMaxWidth()
            .height(420.dp)
            .clip(RoundedCornerShape(24.dp))
    ) {

        AsyncImage(
            model = "https://placehold.co/1200x1600/24113d/ffffff?text=MEDIA+TV",
            contentDescription = "Featured story",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )

        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color.Transparent,
                            Color.Transparent,
                            Color(0xFF07070A)
                        )
                    )
                )
        )

        Column(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(22.dp)
        ) {

            Text(
                text = "MEDIA TV ORIGINAL",
                color = Color(0xFFC4B5FD),
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.5.sp
            )

            Spacer(
                modifier = Modifier.height(7.dp)
            )

            Text(
                text = "The Last Letter",
                color = Color.White,
                fontSize = 30.sp,
                fontWeight = FontWeight.ExtraBold
            )

            Spacer(
                modifier = Modifier.height(7.dp)
            )

            Text(
                text = "A mysterious letter changes everything.",
                color = Color(0xFFD0D0D5),
                fontSize = 12.sp,
                maxLines = 2
            )

            Spacer(
                modifier = Modifier.height(15.dp)
            )

            Button(
                onClick = onWatch,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.White,
                    contentColor = Color.Black
                ),
                shape = RoundedCornerShape(12.dp)
            ) {

                Text(
                    text = "▶  Watch Now",
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

/* ================= STORY SECTION ================= */

@Composable
fun StorySection(
    title: String,
    stories: List<MediaStory>,
    onStoryClick: (MediaStory) -> Unit
) {

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 26.dp)
    ) {

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {

            Text(
                text = title,
                color = TextPrimary,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1f)
            )

            Text(
                text = "See all",
                color = Color(0xFFA78BFA),
                fontSize = 11.sp
            )
        }

        Spacer(
            modifier = Modifier.height(13.dp)
        )

        Row(
            modifier = Modifier
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {

            stories.forEach { story ->

                StoryPoster(
                    story = story,
                    onClick = {
                        onStoryClick(story)
                    }
                )
            }
        }
    }
}

/* ================= POSTER ================= */

@Composable
fun StoryPoster(
    story: MediaStory,
    onClick: () -> Unit
) {

    Column(
        modifier = Modifier
            .width(132.dp)
            .clickable(onClick = onClick)
    ) {

        AsyncImage(
            model = story.image,
            contentDescription = story.title,
            modifier = Modifier
                .fillMaxWidth()
                .height(188.dp)
                .clip(RoundedCornerShape(14.dp)),
            contentScale = ContentScale.Crop
        )

        Spacer(
            modifier = Modifier.height(8.dp)
        )

        Text(
            text = story.title,
            color = TextPrimary,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis
        )

        Spacer(
            modifier = Modifier.height(3.dp)
        )

        Text(
            text = story.category,
            color = TextSecondary,
            fontSize = 10.sp
        )
    }
}

/* ================= STORY DETAILS ================= */

@Composable
fun StoryDetailsScreen(
    story: MediaStory,
    modifier: Modifier = Modifier,
    onBack: () -> Unit
) {

    val episodes = listOf(
        Episode(
            1,
            "The Beginning",
            "Everything starts with a mysterious letter.",
            "12:42"
        ),
        Episode(
            2,
            "The Mysterious Letter",
            "The truth behind the letter starts to appear.",
            "14:18"
        ),
        Episode(
            3,
            "A Secret Revealed",
            "One secret changes the entire story.",
            "16:05"
        ),
        Episode(
            4,
            "The Unexpected Visitor",
            "Someone from the past returns.",
            "13:37"
        )
    )

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Background),
        contentPadding = PaddingValues(bottom = 30.dp)
    ) {

        item {

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(430.dp)
            ) {

                AsyncImage(
                    model = story.image,
                    contentDescription = story.title,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )

                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.verticalGradient(
                                listOf(
                                    Color(0x9907070A),
                                    Color.Transparent,
                                    Color(0xFF07070A)
                                )
                            )
                        )
                )

                Text(
                    text = "‹",
                    modifier = Modifier
                        .align(Alignment.TopStart)
                        .padding(
                            start = 18.dp,
                            top = 20.dp
                        )
                        .clickable(onClick = onBack),
                    color = Color.White,
                    fontSize = 38.sp
                )

                Column(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .padding(22.dp)
                ) {

                    Text(
                        text = story.category.uppercase(),
                        color = Color(0xFFC4B5FD),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(
                        modifier = Modifier.height(6.dp)
                    )

                    Text(
                        text = story.title,
                        color = Color.White,
                        fontSize = 30.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                }
            }
        }

        item {

            Column(
                modifier = Modifier.padding(
                    horizontal = 20.dp
                )
            ) {

                Text(
                    text = story.description,
                    color = TextSecondary,
                    fontSize = 13.sp,
                    lineHeight = 20.sp
                )

                Spacer(
                    modifier = Modifier.height(18.dp)
                )

                Button(
                    onClick = {},
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.White,
                        contentColor = Color.Black
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {

                    Text(
                        text = "▶  Start Watching",
                        fontWeight = FontWeight.Bold
                    )
                }

                Spacer(
                    modifier = Modifier.height(25.dp)
                )

                Text(
                    text = "Episodes",
                    color = TextPrimary,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )

                Spacer(
                    modifier = Modifier.height(12.dp)
                )
            }
        }

        items(episodes) { episode ->

            EpisodeCard(
                episode = episode
            )
        }
    }
}

/* ================= EPISODE CARD ================= */

@Composable
fun EpisodeCard(
    episode: Episode
) {

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(
                horizontal = 20.dp,
                vertical = 6.dp
            )
            .clip(RoundedCornerShape(14.dp))
            .background(CardDark)
            .padding(10.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {

        Box(
            modifier = Modifier
                .size(72.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(
                    Brush.linearGradient(
                        listOf(
                            Color(0xFF312E81),
                            Color(0xFF7C3AED)
                        )
                    )
                ),
            contentAlignment = Alignment.Center
        ) {

            Text(
                text = "▶",
                color = Color.White,
                fontSize = 20.sp
            )
        }

        Spacer(
            modifier = Modifier.width(12.dp)
        )

        Column(
            modifier = Modifier.weight(1f)
        ) {

            Text(
                text = "Episode ${episode.number}",
                color = Color(0xFFA78BFA),
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(
                modifier = Modifier.height(3.dp)
            )

            Text(
                text = episode.title,
                color = TextPrimary,
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(
                modifier = Modifier.height(3.dp)
            )

            Text(
                text = episode.description,
                color = TextSecondary,
                fontSize = 10.sp,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }

        Text(
            text = episode.duration,
            color = TextSecondary,
            fontSize = 10.sp
        )
    }
}

/* ================= SEARCH ================= */

@Composable
fun SearchScreen(
    modifier: Modifier = Modifier,
    onStoryClick: (MediaStory) -> Unit
) {

    val story = MediaStory(
        "The Last Letter",
        "Drama",
        "https://placehold.co/600x900/24143d/ffffff?text=The+Last+Letter",
        "A mysterious letter changes everything."
    )

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Background)
            .padding(20.dp)
    ) {

        Text(
            text = "Search",
            color = TextPrimary,
            fontSize = 28.sp,
            fontWeight = FontWeight.ExtraBold
        )

        Spacer(
            modifier = Modifier.height(18.dp)
        )

        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp),
            color = CardDark
        ) {

            Text(
                text = "⌕  Search stories, episodes...",
                modifier = Modifier.padding(17.dp),
                color = TextSecondary,
                fontSize = 13.sp
            )
        }

        Spacer(
            modifier = Modifier.height(30.dp)
        )

        Text(
            text = "Featured",
            color = TextPrimary,
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(
            modifier = Modifier.height(14.dp)
        )

        StoryPoster(
            story = story,
            onClick = {
                onStoryClick(story)
            }
        )
    }
}

/* ================= LIBRARY ================= */

@Composable
fun LibraryScreen(
    modifier: Modifier = Modifier
) {

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Background)
            .padding(20.dp)
    ) {

        Text(
            text = "My Library",
            color = TextPrimary,
            fontSize = 28.sp,
            fontWeight = FontWeight.ExtraBold
        )

        Spacer(
            modifier = Modifier.height(12.dp)
        )

        Text(
            text = "Your saved stories will appear here.",
            color = TextSecondary,
            fontSize = 13.sp
        )
    }
}

/* ================= PROFILE ================= */

@Composable
fun ProfileScreen(
    modifier: Modifier = Modifier
) {

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Background)
            .padding(20.dp)
    ) {

        Text(
            text = "Profile",
            color = TextPrimary,
            fontSize = 28.sp,
            fontWeight = FontWeight.ExtraBold
        )

        Spacer(
            modifier = Modifier.height(25.dp)
        )

        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(18.dp),
            color = CardDark
        ) {

            Row(
                modifier = Modifier.padding(18.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {

                Box(
                    modifier = Modifier
                        .size(55.dp)
                        .clip(RoundedCornerShape(18.dp))
                        .background(
                            Brush.linearGradient(
                                listOf(
                                    Accent,
                                    Color(0xFFEC4899)
                                )
                            )
                        ),
                    contentAlignment = Alignment.Center
                ) {

                    Text(
                        text = "M",
                        color = Color.White,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Spacer(
                    modifier = Modifier.width(14.dp)
                )

                Column {

                    Text(
                        text = "Media TV User",
                        color = TextPrimary,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Text(
                        text = "Free Account",
                        color = TextSecondary,
                        fontSize = 11.sp
                    )
                }
            }
        }
    }
}

/* ================= BOTTOM NAV ================= */

@Composable
fun MediaBottomNavigation(
    selectedTab: Int,
    onTabSelected: (Int) -> Unit
) {

    Surface(
        color = SurfaceDark
    ) {

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .navigationBarsPadding()
                .padding(
                    horizontal = 12.dp,
                    vertical = 8.dp
                ),
            horizontalArrangement =
                Arrangement.SpaceAround
        ) {

            BottomItem(
                icon = "⌂",
                label = "Home",
                selected = selectedTab == 0,
                onClick = {
                    onTabSelected(0)
                }
            )

            BottomItem(
                icon = "⌕",
                label = "Search",
                selected = selectedTab == 1,
                onClick = {
                    onTabSelected(1)
                }
            )

            BottomItem(
                icon = "♡",
                label = "Library",
                selected = selectedTab == 2,
                onClick = {
                    onTabSelected(2)
                }
            )

            BottomItem(
                icon = "●",
                label = "Profile",
                selected = selectedTab == 3,
                onClick = {
                    onTabSelected(3)
                }
            )
        }
    }
}

@Composable
fun BottomItem(
    icon: String,
    label: String,
    selected: Boolean,
    onClick: () -> Unit
) {

    Column(
        modifier = Modifier
            .width(72.dp)
            .clickable(onClick = onClick)
            .padding(vertical = 5.dp),
        horizontalAlignment =
            Alignment.CenterHorizontally
    ) {

        Text(
            text = icon,
            color =
                if (selected)
                    Color(0xFFA78BFA)
                else
                    TextSecondary,
            fontSize = 21.sp
        )

        Spacer(
            modifier = Modifier.height(3.dp)
        )

        Text(
            text = label,
            color =
                if (selected)
                    Color.White
                else
                    TextSecondary,
            fontSize = 9.sp,
            fontWeight =
                if (selected)
                    FontWeight.Bold
                else
                    FontWeight.Normal
        )
    }
}
