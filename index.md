---
title: Watch Parties
layout: page
type: watch
---
<style>
    hr.has-background-black {
        display: none;
    }

    h1.title {
        display: none;
    }
</style>
<link rel="stylesheet" href="index-styles.css">
<!-- <link rel="stylesheet" href="https://api.scyted.tv/wave-development/dashboard/mobile-lock.css"> -->
<body>

<style>

  .banner h1 {
    margin-top: 20px;
  }

</style>

<div class="banner">
    <h1>Watch Parties</h1>
    <input type="text" class="search-bar" placeholder="Search shows...">
  </div>

<div class="grid" id="resource-grid">
  <!-- Resources will be dynamically added here -->
</div>

<!-- <iframe src="https://discord.com/widget?id=1237187833324638209&theme=dark" width="100%" height="1000" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe> -->

<script src="script.js"></script>

<div class="section">
  <h1 class="title is-1 is-uppercase has-text-weight-bold">
  </h1>
  <hr class="has-background-black">
</div>

<style>
        .styled-calendar-container {
            width: 100%;
            border: none;
            margin-top: 0;
        }

        @media (max-width: 768px) {
            .styled-calendar-container {
                margin-top: auto;
                flex-grow: 1;
            }
        }
    
    </style>

<iframe id="calendar-iframe" src="https://embed.styledcalendar.com/#zHDX41pb2rz5hdj5J6hB" title="ScytedTV Calendar"
        class="styled-calendar-container" data-cy="calendar-embed-iframe"></iframe>
<script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script>

</body>