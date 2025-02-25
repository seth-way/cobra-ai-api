const axios = require('axios');
const cheerio = require('cheerio');

async function getFighterID(firstName, lastName) {
  const url = `http://ufcstats.com/statistics/fighters/search?query=${lastName.toLowerCase()}`;

  try {
    // Fetch the webpage
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Select all table rows
    const tableRows = $('.b-statistics__table tbody tr');

    let fighterId = null;

    tableRows.each((_, row) => {
      const columns = $(row).find('td');

      if (columns.length > 1) {
        const firstNameText = $(columns[0]).text().trim();
        const lastNameText = $(columns[1]).text().trim();

        // Check if first and last names match
        if (
          firstNameText.toLowerCase() === firstName.toLowerCase() &&
          lastNameText.toLowerCase() === lastName.toLowerCase()
        ) {
          // Extract href from anchor tag
          const fighterLink = $(columns[0]).find('a').attr('href');

          if (fighterLink) {
            // Extract fighter ID from the URL
            fighterId = fighterLink.split('/').pop();
            return false; // Stop looping once we find the match
          }
        }
      }
    });

    if (fighterId) {
      console.log(`Fighter ID for ${firstName} ${lastName}: ${fighterId}`);
      return fighterId;
    } else {
      console.log(`No fighter found for ${firstName} ${lastName}.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function searchFighter(firstName, lastName) {
  const id = await getFighterID(firstName, lastName);
}

// Example usage
searchFighter('Anderson', 'Silva');

module.exports = { searchFighter };
