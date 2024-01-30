<script>
    import { onMount } from 'svelte';
    import { TextInput, Button } from '@svelteuidev/core';
    import { ExternalLink, Opacity, BlendingMode, Commit, Heart, Link2 } from 'radix-icons-svelte';

    let patreonURL = 'https://www.patreon.com/MajorPataponn';
    let scoreboardURL = 'https://scoreboard-overlay.xyz/scoreboard/';
    let scoreboardInputContent = '';
    let scoreboardBackgroundcolor = '#252525';
    let scoreboardTextcolor = '#ffffff';
    let MatchURL = 'https://scoreboard-overlay.xyz/live/';
    let MatchInputContent = '';
    let MatchBackgroundcolor = '#252525';
    let MatchTextcolor = '#ffffff';
    let score;
  
    onMount(() => {
    // Get the text content of all input fields on mount
    scoreboardInputContent = document.getElementById('scoreboardInputField').value;
    scoreboardBackgroundcolor = document.getElementById('scoreboardBackgroundcolorInputField').value;
    scoreboardTextcolor = document.getElementById('scoreboardTextcolorInputField').value;
    MatchInputContent = document.getElementById('MatchInputField').value;
    MatchBackgroundcolor = document.getElementById('MatchBackgroundcolorInputField').value;
    MatchTextcolor = document.getElementById('MatchTextcolorInputField').value;
    score = document.getElementById('scoreInputField').value;
  });

  function openScoreboardLink() {
    // Construct the URL with the input content appended
    const newScoreboardURL = `${scoreboardURL}${scoreboardInputContent}`;

    if (!scoreboardInputContent) {
        // Show a notification if the input is empty
        alert('Please enter a scoreboard link');
        return;
    }

    // Open the link in a new tab
    window.open(newScoreboardURL, '_blank');
  }

  function openPatreonLink() {
    window.open(patreonURL, '_blank');
  }

  function openMatchLink() {
    let fullURL = `${MatchURL}${MatchInputContent}?color=${parseHex(MatchBackgroundcolor)}&tcolor=${parseHex(MatchTextcolor)}`;

    if (!MatchInputContent) {
    // Show a notification if the input is empty
    alert('Please enter a match link');
    return;
    }

    let updatedURL = '';

    if (score) {
    updatedURL = fullURL + `&score=${score}`;
    } else {
    updatedURL = fullURL;
    }

    // Open the link in a new tab
    window.open(updatedURL, '_blank');
}



  function parseHex(color) {
    if (color.startsWith('#')) {
      // Remove the leading #
      color = color.substring(1);
    }

    if (color.length === 3) {
      // Shorthand hex format (e.g., #fff)
      return color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
    }

    // Regular hex format (e.g., #ffffff)
    return color;
  }
</script>


<svelte:head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');
    </style>
</svelte:head>


<div class="container">
    <div class="inputWrapper">
        <h1>Scoreboard</h1>
        <TextInput 
            icon={Link2}
            label="Division Link"
            placeholder="https://www.primeleague.gg/leagues/prm/3142-spring-split-2024/group/509-gruppenphase/5809-gruppe-5-33"
            bind:value={scoreboardInputContent}
        />
        <div class="smallInputs">
            <TextInput
                icon={Opacity}
                label="Background Color"
                placeholder="#252525"
                disabled
                bind:value={scoreboardBackgroundcolor}
            />
            <TextInput
                icon={BlendingMode}
                label="Text Color"
                placeholder="#ffffff"
                disabled
                bind:value={scoreboardTextcolor}
            />
        </div>
        <Button
            ripple
            on:click={openScoreboardLink}
        >
            <ExternalLink slot="rightIcon" />
            Open Scoreboard
        </Button>
    </div>

    <div class="inputWrapper">
        <h1>Match</h1>
        <TextInput 
            icon={Link2}
            label="Match Link"
            placeholder="https://www.primeleague.gg/leagues/matches/1108940-as-esports-vs-give-me-your-sock"
            bind:value={MatchInputContent}
        />
        <div class="smallInputs">
            <TextInput
                icon={Opacity}
                label="Background Color"
                placeholder="#252525"
                bind:value={MatchBackgroundcolor}
            />
            <TextInput
                icon={BlendingMode}
                label="Text Color"
                placeholder="#ffffff"
                bind:value={MatchTextcolor}
            />
            <TextInput
                icon={Commit}
                label="Score"
                placeholder="Leave empty for 'VS'"
                bind:value={score}
            />
        </div>
        <Button
            ripple
	        on:click={openMatchLink}
        >
        <ExternalLink slot="rightIcon" />
	        Open Match
        </Button>
    </div>
</div>

<div class="patreonButton">
    <Button
        color="red"
        ripple
        on:click={openPatreonLink}
    >
        <Heart slot="leftIcon" />
        Support on Patreon
    </Button>
</div>

   


<style>
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
    }
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 32px;
        padding: 32px 64px;
    }
    .inputWrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 32px;
        background-color: #f8f8f8;
        border-radius: 16px;
        border: 1px solid #f1f1f1;
        width: 100%;
        min-width: 380px;
        max-width: 900px;
        flex: 1;
    }
    .smallInputs {
        display: flex;
        flex-direction: row;
        gap: 16px;
    }
    .patreonButton {
        position: absolute;
        left: calc(50% - (192px / 2));
        bottom: 37px;
        z-index: -1;
    }
</style>
