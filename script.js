const key = "civicfix_issues";

const seed = [
  {
    id: "CF-1042",
    type: "Pothole",
    location: "Main Road, Sector 5",
    description: "Large pothole near the bus stop.",
    status: "In Progress"
  },
  {
    id: "CF-1039",
    type: "Broken Streetlight",
    location: "Park Lane",
    description: "Streetlight has not been working for several days.",
    status: "Resolved"
  },
  {
    id: "CF-1037",
    type: "Garbage",
    location: "Market Road",
    description: "Waste collection is irregular in this area.",
    status: "Reported"
  }
];

let issues = JSON.parse(localStorage.getItem(key) || "null") || seed;

function save() {
  localStorage.setItem(key, JSON.stringify(issues));
}

function render() {
  const filter = document.getElementById("filter").value;
  const list = document.getElementById("issueList");

  const shown =
    filter === "All"
      ? issues
      : issues.filter((x) => x.status === filter);

  list.innerHTML =
    shown
      .map(
        (x) => `
        <article class="issue">
          <div>
            <h3>${x.type} <small>#${x.id}</small></h3>
            <p><b>Location:</b> ${x.location}</p>
            <p>${x.description}</p>
          </div>
          <span class="badge ${x.status.replace(" ", "")}">
            ${x.status}
          </span>
        </article>
      `
      )
      .join("") || "<div class='form-card'>No reports found.</div>";

  const reported = issues.filter(
    (x) => x.status === "Reported"
  ).length;

  const progress = issues.filter(
    (x) => x.status === "In Progress"
  ).length;

  const resolved = issues.filter(
    (x) => x.status === "Resolved"
  ).length;

  document.getElementById("reportedCount").textContent = reported;
  document.getElementById("progressCount").textContent = progress;
  document.getElementById("resolvedCount").textContent = resolved;
  document.getElementById("totalCount").textContent = issues.length;

  document.getElementById(
    "resolvedText"
  ).textContent = `${resolved} resolved`;

  document.getElementById("progressBar").style.width =
    issues.length
      ? `${(resolved / issues.length) * 100}%`
      : "0%";
}

document.getElementById("issueForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const item = {
    id: "CF-" + (1000 + Math.floor(Math.random() * 8999)),
    type: document.getElementById("type").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    status: "Reported"
  };

  issues.unshift(item);
  save();
  render();

  e.target.reset();

  document.getElementById(
    "success"
  ).textContent = `Report submitted successfully. Your ID is ${item.id}.`;

  setTimeout(() => {
    document.getElementById("success").textContent = "";
  }, 4000);
});

document.getElementById("filter").addEventListener("change", render);

render();
