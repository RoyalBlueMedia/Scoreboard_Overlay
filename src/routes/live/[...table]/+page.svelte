<style>
  :global(body) {
    background-color: transparent;
    width: 1920px;
    height: 1080px;
    padding: 0;
    margin: 0;
  }

  #content {
    width: 1920px;
    height: 1080px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div id="content"></div>

<script>
  // @ts-nocheck
  import { onMount } from 'svelte';

  const fonts = [{
      "font-family": "Inter",
      "font-style": "normal",
      "font-weight": 900,
      "src": "/fonts/Inter-Black.ttf"
  }];

  export let data;
  const state = data.options.score || "VS";
  const textColor = "#" + (data.options.tcolor || "FFF"); // Default text color: White
  const backgroundColor = "#" + (data.options.color || "343434"); // Default background color: Dark Gray

  onMount(async () => {
    if (data.error) {
      return;
    }

    // Load team images in parallel
    const teamImages = await Promise.all(data.teams?.map(team => 
      new Promise(resolve => {
        const image = new Image();
        image.src = team.image;
        image.onload = () => {
          resolve(image);
        };
        image.onerror = () => {
          console.error("Error loading image");
          resolve(null);
        };
      })
    ));

    // Wait for fonts to load
    await loadFonts(fonts);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800; 
    canvas.height = 800;

    // Border
    ctx.lineWidth = 1;
    ctx.strokeStyle = backgroundColor;
    ctx.strokeRect(45.5, 270.5, 711, 201);
    ctx.beginPath();
    ctx.moveTo(400.5, 270.5);
    ctx.lineTo(400.5, 310.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(400.5, 429.5);
    ctx.lineTo(400.5, 470.5);
    ctx.stroke();

    // Inner Text
    ctx.font = "900 120px Inter";
	  ctx.fillStyle = backgroundColor + "FA"; // FA = 98% Opacity

    if (state.includes(":")) { // - 0:2 | 1:1 | 2:0 -
      const leftDigitWidth = ctx.measureText(state[0]).width;
      const colonWidth = ctx.measureText(":").width;
      ctx.fillText(state[0], 400 - leftDigitWidth - colonWidth/2 - 1.5, 410);
      ctx.fillText(":", 381, 400);
      ctx.fillText(state[2], 400 + colonWidth/2 + 1.5, 410);
    } else { // - VS -
      // Letter spacing is not possible, so we have to fake it by placing the letters individually
      ctx.fillText("V", 400 - ctx.measureText("V").width + 15, 411);
      ctx.fillText("S", 405, 411);
    }

    // Team names
    ctx.font = "900 29px Inter";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(45, 471, 120, 51);
    ctx.fillRect(637, 471, 120, 51);
	  ctx.fillStyle = textColor;
    //ctx.fillStyle = "white";
    ctx.fillText(data.teams[0].name, 105 - ctx.measureText(data.teams[0].name).width/2, 507);
    ctx.fillText(data.teams[1].name, 696 - ctx.measureText(data.teams[1].name).width/2, 507);

    // Team images
    ctx.drawImage(teamImages[0], 46, 271, 200, 200);
    ctx.drawImage(teamImages[1], 556, 271, 200, 200);
    
    document.getElementById("content").appendChild(canvas);


    // We need this, so we can wait for the font to load before drawing on the canvas
    async function loadFonts(fontsToLoad) {
      for (const fontProps of fontsToLoad) {
        const fontFamily = fontProps["font-family"];
        const fontWeight = fontProps["font-weight"];
        const fontStyle = fontProps["font-style"];
        const fontUrl = "url(" + fontProps["src"] + ")";
        const font = new FontFace(fontFamily, fontUrl);
        font.weight = fontWeight;
        font.style = fontStyle;
        await font.load();
        document.fonts.add(font);
      }
    }
  });
</script>
