const AURL = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

async function fetchData() {
  try {
    const response = await fetch(AURL);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    // Log the data structure to confirm the key
    console.log(data);

    // Use the correct key 'results'
    const results = data.results;
    if (!results || !Array.isArray(results)) {
      console.error("No results found in the API response.");
      return;
    }
    const tableBody = document.getElementById("data-table");

    // Populate table with results
    results.forEach(result => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${result.year || "N/A"}</td>
        <td>${result.semester || "N/A"}</td>
        <td>${result.the_programs || "N/A"}</td>
        <td>${result.nationality || "N/A"}</td>
        <td>${result.colleges || "N/A"}</td>
        <td>${result.number_of_students }</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("error-message").innerText = `Error: ${error.message}`;
  }
}

// Load data on page load
fetchData();
