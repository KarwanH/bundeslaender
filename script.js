let bundesland = [];
let letters = [];

const init = async () => {
  await loadState();
  await render();
};

const loadState = async () => {
  let resons = await fetch("./bundesland.json");
  let respAsJson = await resons.json();
  bundesland = respAsJson;
};

const render = async () => {
  let content = document.getElementById("content");
  content.innerHTML = "";

  bundesland.forEach((land, index) => {
    let landName = land.name;
    let landPopulaition = (land.population + "").replace(".", ",");
    let landUrl = land.url;
    if (!letters.includes(landName.charAt(0))) {
      letters.push(landName.charAt(0));
    }
    content.innerHTML += renderTemplate(
      landName,
      landPopulaition,
      landUrl,
      index
    );
  });

  getLetters();
};

const getLetters = () => {
  let lettersBox = document.getElementById("letter-box");
  lettersBox.innerHTML = "";

  letters.forEach((letter, index) => {
    lettersBox.innerHTML += `
        <button class="letter" onclick="filterLand('${letter}', ${index})">${letter}</button>
        `;
  });
};

const renderTemplate = (landName, landPopulaition, landUrl, index) => {
  return `
    <a href="${landUrl}" class="landBox" id="landBox${index}">
    <h5 class="name">${landName}</h5>
    <h5 class="population">${landPopulaition} Millionen</h5>
</a>`;
};

const filterLand = (letter) => {
  let content = document.getElementById("content");
  content.innerHTML = "";

  let filterLands = bundesland.filter((land) => {
    return land.name.charAt(0) === letter;
  });

  filterLands.forEach((land) => {
    let landName = land.name;
    let landPopulaition = (land.population + "").replace(".", ",");
    let landUrl = land.url;
    content.innerHTML += renderTemplate(landName, landPopulaition, landUrl);
  });
};

const shwoAll = () => {
  render();
};
