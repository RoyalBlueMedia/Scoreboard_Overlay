import * as cheerio from 'cheerio';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  return await fetchData(params.table);
}

async function fetchData(tableURL) {
  if (!tableURL) return {error: "Missing URL"}

  try {
    const response = await fetch(tableURL);
    const html = await response.text();

    const $ = cheerio.load(html);
    const tableBody = $("section.league-group-scores > .block-content > .section-block > table > tbody");
  
    const teams = tableBody.find("tr > td:nth-child(2) > a > span.table-cell-item.name > span").toArray().map(el => $(el).text());
    const countries = tableBody.find("tr > td:nth-child(2) > a > span.table-cell-item.name > div.snippet-flag > div.img-container img").toArray().map(el => $(el).attr("src"));
    const logos = tableBody.find("tr > td:nth-child(2) > a > span.table-cell-item.img-container img").toArray().map(el => $(el).attr("data-src"));
    const wins = tableBody.find("tr > td:nth-child(3) > a").toArray().map(el => parseInt($(el).text().split("-")[0], 10));
    const losses = tableBody.find("tr > td:nth-child(3) > a").toArray().map(el => parseInt($(el).text().split("-")[1], 10));

    if (!teams.length) return {error: "Not a valid URL"}
  
    return {teams: teams.map((team, i) => ({name: team, wins: wins[i], losses: losses[i], logo: logos[i], country: countries[i]}))};
  } catch(err) {
    return {error: "Failed to parse URL"}
  }
}