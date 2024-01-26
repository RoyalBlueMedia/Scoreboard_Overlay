<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');
    </style>
</svelte:head>

{#if data.teams}
    <ul class="teams">
    {#each data.teams as team}
        <li class="team">
            <img class="logo" src={team.logo} alt="Team Logo" width="80" height="80">
            <div class="team-data">
                <span class="name">{team.name}</span>
                <span class="wins">{team.wins}</span>
                <span class="losses">{team.losses}</span>
            </div>
        </li>
    {/each}
    </ul>
{:else}
    <h1>{data.error}</h1>
{/if}

<style>
    :global(body) {
        height: 1080px;
        width: 1920px;
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .teams {
        list-style-type: none;
    }
    .team {
        display: flex;
        margin: 20px;
        background-color: #111;
        color: white;
    }
    .team-data {
        width: 790px;
        height: 80px;

        margin: 0 30px;
        display: flex;
        align-items: center;
        gap: 40px;

        font-weight: bolder;
        font-size: 29px;
        line-height: 50px;
        text-transform: uppercase;
    }
    .team-data > .name {
        width: 630px;
    }
    .team-data > .wins {
        width: 40px;
        text-align: center;
    }
    .team-data > .losses {
        width: 40px;
        text-align: center;
    } 
</style>
