const jsonUrl = `https://api.scyted.tv/parties/events.json?timestamp=${new Date().getTime()}`;
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                const events = data.events.sort((a, b) => a.epoch - b.epoch);
                const liveDiscussions = events.filter(event => event.epoch && event.endEpoch);
                const releases = events.filter(event => event.epoch && !event.endEpoch);
                const liveContainer = document.getElementById('live-discussions');
                const releasesContainer = document.getElementById('releases');
                if (liveDiscussions.length > 0) {
                    const liveEvent = liveDiscussions[0];
                    const liveEventDiv = createEventDiv(liveEvent);
                    liveContainer.appendChild(liveEventDiv);
                } else {
                    liveContainer.innerHTML += "<p>No live discussions available.</p>";
                }
                releases.slice(0, 3).forEach(release => {
                    const releaseDiv = createEventDiv(release);
                    releasesContainer.appendChild(releaseDiv);
                });
                // Check each event every second for its status
                setInterval(() => {
                    events.forEach(event => {
                        const eventDiv = document.getElementById(`event-${event.id}`);
                        const indicator = eventDiv.querySelector('.live-indicator');
                        updateLiveIndicator(event, indicator);
                    });
                }, 1000);
            })
            .catch(error => console.error('Error fetching events:', error));
        function createEventDiv(event) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.id = `event-${event.id}`;
            const coverStyle = event.cover
                ? `background-image: url('${event.cover}');`
                : `background-color: white;`;
            eventDiv.innerHTML = `
                <h2>${event.name}</h2>
                <div class="iframe-wrapper">
                    <div class="blurred-background" style="${coverStyle}"></div>
                    <iframe src="https://api.scyted.tv/parties/timer?id=${event.id}" frameborder="0"></iframe>
                </div>
                <div class="live-indicator"></div>
            `;
            return eventDiv;
        }
        function updateLiveIndicator(event, indicator) {
            const now = Math.floor(Date.now() / 1000); // Current epoch time
            const { epoch, endEpoch } = event;
            // Default state: gray
            let indicatorClass = '';
            let indicatorColor = 'gray';
            if (now < epoch) {
                // Before event starts
                indicatorClass = '';
                indicatorColor = 'gray';
            } else if (now >= epoch && now <= epoch + 10) {
                // 10 seconds before start
                indicatorClass = 'flashing';
                indicatorColor = 'yellow';
            } else if (now >= epoch && now <= endEpoch) {
                // Live discussions - event in progress
                indicatorClass = 'flashing';
                indicatorColor = 'red';
            } else if (now > endEpoch) {
                // Live discussions - event ended
                indicatorClass = '';
                indicatorColor = 'green';
            } else if (now > epoch) {
                // Releases - event has started
                indicatorClass = '';
                indicatorColor = 'green';
            }
            indicator.className = 'live-indicator ' + indicatorClass;
            indicator.style.backgroundColor = indicatorColor;
        }