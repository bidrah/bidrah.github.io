async function loadSubreddit() {
    const subreddit = document.getElementById('subredditInput').value.trim();
    if (!subreddit) {
        alert('Please enter a subreddit!');
        return;
    }

    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // Clear existing content

    try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`);
        const data = await response.json();
        const posts = data.data.children;

        posts.forEach(post => {
            const postData = post.data;
            const url = postData.url;

            // Filter for images and videos only
            if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif')) {
                const img = document.createElement('img');
                img.src = url;
                const item = document.createElement('div');
                item.className = 'feed-item';
                item.appendChild(img);
                feed.appendChild(item);
            } else if (postData.is_video && postData.media?.reddit_video) {
                const video = document.createElement('video');
                video.src = postData.media.reddit_video.fallback_url;
                video.controls = true;
                video.autoplay = false;
                video.loop = true;
                const item = document.createElement('div');
                item.className = 'feed-item';
                item.appendChild(video);
                feed.appendChild(item);
            }
        });

        if (feed.children.length === 0) {
            feed.innerHTML = '<p>No media found in this subreddit.</p>';
        }
    } catch (error) {
        console.error('Error fetching subreddit:', error);
        feed.innerHTML = '<p>Error loading subreddit. Try again!</p>';
    }
}

// Load default subreddit on page load (optional)
window.onload = () => {
    document.getElementById('subredditInput').value = 'pics';
    // loadSubreddit(); // Uncomment to auto-load
};