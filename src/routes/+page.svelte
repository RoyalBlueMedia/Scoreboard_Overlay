<script>
    import { onMount } from 'svelte';
    let scoreboardURL = 'https://scoreboard-overlay.xyz/scoreboard/';
    let scoreboardInputContent = '';
    let liveMatchURL = 'https://scoreboard-overlay.xyz/live/';
    let liveMatchInputContent = '';
    let backgroundcolor = '252525';
    let textcolor = 'ffffff';
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
        <input type="text" id="scoreboardInputField" placeholder="https://www.primeleague.gg/leagues/prm/3142-spring-split-2024/group/509-gruppenphase/5809-gruppe-5-33" bind:value={scoreboardInputContent} />
        <button on:click={openScoreboardLink}>Open Scoreboard</button>
    </div>

    <div class="inputWrapper">
        <h1>Live Match</h1>
        <input type="text" id="liveMatchInputField" placeholder="https://www.primeleague.gg/leagues/matches/1108934-norrd-vs-andromeda-celestials" bind:value={liveMatchInputContent} />
        
        <div class="smallInputs">
            <div>
                <label for="backgroundcolorInputField">Background Color:</label>
                <input type="text" id="backgroundcolorInputField" bind:value={backgroundcolor} />
            </div>
            <div>
                <label for="textcolorInputField">Text Color:</label>
                <input type="text" id="textcolorInputField" bind:value={textcolor} />
            </div>
            <div>
                <label for="scoreInputField">Score:</label>
                <input type="text" id="scoreInputField" placeholder="Leave empty for 'VS'" bind:value={score} />
            </div>
        </div>

        <button on:click={openLiveMatchLink}>Open Live Match</button>
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
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #252525;
    }
    h1{
        color: white;
        font-size: 1.3rem;
        margin-top: 0.67rem;
        margin-bottom: 0.67rem;
    }
    label {
        color: white;
        display: inline-block;
        margin-bottom: 5px;
    }
    .container {
        display: grid;
        grid-template-columns: repeat(2, minmax(250px, 900px));
        justify-content: center;
        gap: 32px;
        padding: 32px 64px;
        width: 100vw;
    }
    .inputWrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .smallInputs {
        display: flex;
        flex-direction: row;
        gap: 16px;
    }
    input[type="text"] {
        width: 100%;
        padding: 12px 16px;
        background-color: #585858 ;
        outline: 1px #ffffff solid;
        border: none;
        border-radius: 4px;
        transition: all .2s ease-in-out;
        color: white;
    }
    input[type="text"]:focus {
        outline: 2px #007bff solid;
    }
    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }
    button:hover {
        background-color: #00629b;
    }
</style>
