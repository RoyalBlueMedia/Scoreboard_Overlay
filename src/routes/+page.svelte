<script>
    import { onMount } from 'svelte';
    import { TextInput } from '@svelteuidev/core';
    import { Button } from '@svelteuidev/core';
    import { ExternalLink, Opacity, Commit } from 'radix-icons-svelte';


    let scoreboardURL = 'https://scoreboard-overlay.xyz/scoreboard/';
    let scoreboardInputContent = '';
    let liveMatchURL = 'https://scoreboard-overlay.xyz/live/';
    let liveMatchInputContent = '';
    let backgroundcolor = '#252525';
    let textcolor = '#ffffff';
    let score;
  
    onMount(() => {
    // Get the text content of all input fields on mount
    scoreboardInputContent = document.getElementById('scoreboardInputField').value;
    liveMatchInputContent = document.getElementById('liveMatchInputField').value;
    backgroundcolor = document.getElementById('backgroundcolorInputField').value;
    textcolor = document.getElementById('textcolorInputField').value;
    score = document.getElementById('scoreInputField').value;
  });

  function openScoreboardLink() {
    // Construct the URL with the input content appended
    const newScoreboardURL = `${scoreboardURL}${scoreboardInputContent}`;

    // Open the link in a new tab
    window.open(newScoreboardURL, '_blank');
  }

  function openLiveMatchLink() {
  let fullURL = `${liveMatchURL}${liveMatchInputContent}?color=${parseHex(backgroundcolor)}&tcolor=${parseHex(textcolor)}`;

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
            icon={ExternalLink}
            label="Division Link"
            placeholder="https://www.primeleague.gg/leagues/prm/3142-spring-split-2024/group/509-gruppenphase/5809-gruppe-5-33"
            bind:value={scoreboardInputContent}
        />

        <Button
            on:click={openScoreboardLink}
        >
            Open Scoreboard
        </Button>

    </div>

    <div class="inputWrapper">
        <h1>Match</h1>

        <TextInput 
            icon={ExternalLink}
            label="Match Link"
            placeholder="https://www.primeleague.gg/leagues/matches/1108940-as-esports-vs-give-me-your-sock"
            bind:value={liveMatchInputContent}
        />
        <div class="smallInputs">
            <TextInput
                icon={Opacity}
                label="Background Color"
                placeholder="#252525"
                bind:value={backgroundcolor}
            />
    
            <TextInput
                icon={Opacity}
                label="Text Color"
                placeholder="#ffffff"
                bind:value={textcolor}
            />
    
            <TextInput
                icon={Commit}
                label="Score"
                placeholder="Leave empty for 'VS'"
                bind:value={score}
            />
        </div>

        <Button
	        on:click={openLiveMatchLink}
        >
	        Open Match
        </Button>
    </div>
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
        min-width: 680px;
        max-width: 900px;
    }
    .smallInputs {
        display: flex;
        flex-direction: row;
        gap: 16px;
    }
</style>
