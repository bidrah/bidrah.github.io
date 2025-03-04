async function loadContent() {
    const input = document.getElementById('inputField').value.trim();
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // Clear existing content

    if (!input) {
        alert('Please enter a subreddit or search term!');
        return;
    }

    try {
        let url;
        if (mode === 'subreddit') {
            url = `https://www.reddit.com/r/${input}.json?limit=100`;
        } else {
            url = `https://www.reddit.com/search.json?q=${encodeURIComponent(input)}&limit=100`;
        }

        const response = await fetch(url);
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
            feed.innerHTML = '<p>No media found for this ' + (mode === 'subreddit' ? 'subreddit' : 'search') + '.</p>';
        }
    } catch (error) {
        console.error('Error fetching content:', error);
        feed.innerHTML = '<p>Error loading content. Try again!</p>';
    }
}

// Update placeholder text based on mode
document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const mode = document.querySelector('input[name="mode"]:checked').value;
        const inputField = document.getElementById('inputField');
        inputField.placeholder = mode === 'subreddit' 
            ? 'Enter subreddit (e.g., pics)' 
            : 'Enter search term (e.g., funny cats)';
        inputField.value = ''; // Clear input when mode changes
    });
});

// Load default subreddit on page load (optional)
window.onload = () => {
    document.getElementById('inputField').value = 'pics';
    // loadContent(); // Uncomment to auto-load
};