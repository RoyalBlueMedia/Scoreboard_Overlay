import * as cheerio from 'cheerio';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
  const options = {
    score: url.searchParams.get("score")
  }

  return await fetchData(params.table, options);
}

// @ts-ignore
async function fetchData(table, options) {
  try {
    const response = await fetch(table);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $(".page-title > h1").text();
    if (!title) return {error: "Not a valid URL"}

    const content = $("section.league-match-head > .section-content > .content-league-match-head");
    const teams = [content.find(".content-match-head-team1"), content.find(".content-match-head-team2")]
    .map(teamContent => 
      ({
        image: teamContent.find("img").attr("src") || "",
        name: teamContent.find("h2").text()
      })
    );
  
    return {teams, title, options};
  } catch(err) {
    return {error: "Failed to parse URL"}
  }
}