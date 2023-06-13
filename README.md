# Scoreboard_Overlay
A tool which creates a good looking live graphics for stream productions taking Prime League or 99Dmg scraped data as input. Currently supporting a scoreboard table for a division and a match display.

# Features

## Scoreboard
Show a scoreboard table of a divison with team logo, name, wins and looses.

## Match
Show a match graphic of a matchday with team logos, abbreviations and a score. Default score showing up between the teams is "VS" but this can be changed with a parameter at the end of the url:
```
?score=2:0
```

# Development

## Install
```
npm install
```

## Starting
```
npm run dev
```

## Using
Open http://localhost:5173/ and append one of these options:
- scoreboard/LINK_TO_A_DIVISON
- live/LINK_TO_A_MATCH

# Hosting

You can use Netlify to host a free version for yourself!


