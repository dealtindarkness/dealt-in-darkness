
const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));


// Adds https:// to a link typed without it, so it opens the other site instead of a page on this one.
const fullUrl = (url) => (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(url) ? url : "https://" + url);

const toLines = (value) =>
  (Array.isArray(value) ? value : String(value ?? "").split("\n")).filter(Boolean);

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");


const teamRoot = document.getElementById("team");
const dialog = document.getElementById("dlg");
const stage = document.getElementById("stage");
const caption = document.getElementById("cap");
const thumbs = document.getElementById("thumbs");



const peopleById = {};
let currentPerson = null;
let currentIndex = 0;
let openerButton = null; 



TEAM.forEach((section) => {
  const sectionEl = document.createElement("section");
  sectionEl.innerHTML = `
    <h2>${esc(section.title)}</h2>
    ${section.blurb ? `<p class="note">${esc(section.blurb)}</p>` : ""}
    <div class="grid people"></div>`;

  section.people.forEach((person) => {
    person.id = uniqueId(slugify(person.name));
    peopleById[person.id] = person;

    const workCount = (person.gallery || []).length;
    const initials = person.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2);

    const card = document.createElement("article");
    card.className = "panel person";
    card.innerHTML = `
      <div class="person-head">
        <div class="avatar">
          ${person.photo ? `<img src="${esc(person.photo)}" alt="">` : esc(initials)}
        </div>
        <div>
          <h3><button class="namebtn" data-id="${esc(person.id)}">${esc(person.name)}</button></h3>
          <p class="role">${esc(person.role)}</p>
        </div>
      </div>
      <button class="btn" data-id="${esc(person.id)}">
        ${workCount ? `View work (${workCount})` : "View profile"}
      </button>`;

    sectionEl.querySelector(".people").append(card);
  });

  teamRoot.append(sectionEl);
});


function uniqueId(base) {
  let id = base || "member";
  let count = 2;
  while (peopleById[id]) id = `${base}-${count++}`;
  return id;
}

function showItem(index) {
  const items = currentPerson.gallery || [];
  if (!items.length) return;

  currentIndex = (index + items.length) % items.length;
  const item = items[currentIndex];
  stage.innerHTML = "";

  let media;
  if (item.type === "video") {
    media = document.createElement("video");
    media.src = item.src;
    media.controls = true;
    media.preload = "metadata";
  } else if (item.type === "youtube") {
    media = document.createElement("iframe");
    media.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(item.id);
    media.title = item.caption || "Video";
    media.allow = "picture-in-picture; fullscreen";
    media.allowFullscreen = true;
  } else {
    media = document.createElement("img");
    media.src = item.src;
    media.alt = item.alt || item.caption || "";
  }

  stage.append(media);
  caption.textContent = item.caption || "";

  thumbs.querySelectorAll("button").forEach((button, i) => {
    button.setAttribute("aria-current", i === currentIndex ? "true" : "false");
  });
}


function openPerson(id, fromButton) {
  currentPerson = peopleById[id];
  if (!currentPerson) return;
  openerButton = fromButton || null;

  const items = currentPerson.gallery || [];

  document.getElementById("d-name").textContent = currentPerson.name;
  document.getElementById("d-role").textContent = currentPerson.role;
  const contributions = toLines(currentPerson.short);
  document.getElementById("d-bio").textContent = currentPerson.bio || "";
  document.getElementById("d-bio-section").hidden = !currentPerson.bio;
  document.getElementById("d-contributions").innerHTML = contributions
    .map((line) => `<li>${esc(line)}</li>`)
    .join("");
  document.getElementById("d-contributions-section").hidden = !contributions.length;
  document.getElementById("d-links").innerHTML = (currentPerson.links || [])
    .map((link) => `<a href="${esc(fullUrl(link.url))}" target="_blank" rel="noopener">${esc(link.label)}</a>`)
    .join("");

  document.getElementById("gal").hidden = !items.length;
  document.getElementById("empty").hidden = items.length > 0;

  thumbs.innerHTML = items
    .map((item, i) => {
      const label = `Item ${i + 1}: ${esc(item.caption || item.type || "image")}`;
      const content = item.type === "image" ? `<img src="${esc(item.src)}" alt="">` : "&#9654;";
      return `<button aria-label="${label}">${content}</button>`;
    })
    .join("");
  thumbs.querySelectorAll("button").forEach((button, i) => {
    button.onclick = () => showItem(i);
  });

  dialog.showModal();
  showItem(0);
  history.replaceState(null, "", "#" + id);
}


teamRoot.addEventListener("click", (event) => {
  const button = event.target.closest("[data-id]");
  if (button) openPerson(button.dataset.id, button);
});

document.getElementById("prev").onclick = () => showItem(currentIndex - 1);
document.getElementById("next").onclick = () => showItem(currentIndex + 1);
document.getElementById("close").onclick = () => dialog.close();


dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});


dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showItem(currentIndex - 1);
  if (event.key === "ArrowRight") showItem(currentIndex + 1);
});


dialog.addEventListener("close", () => {
  stage.innerHTML = "";
  history.replaceState(null, "", location.pathname);
  if (openerButton) openerButton.focus();
});

if (peopleById[location.hash.slice(1)]) openPerson(location.hash.slice(1));
