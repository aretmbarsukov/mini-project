const form = document.querySelector("#search-form");
const list = document.querySelector(".gallery");
const btnLoad = document.querySelector(".load");
const API_KEY = "54040957-efed6322ea17d5f22db4ab8b0";
const PER_PAG = 12;
let page = 1;
let searchText = "";
// fetch(url).then((res) => res.json()).then((res) => console.log(res.hits))
async function getImages() {
    try {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchText}&page=${page}&per_page=${PER_PAG}&key=${API_KEY}`;
        const respons = await fetch(url);
        const data = await respons.json();
        return {
            hits: data.hits,
            total: data.totalHits
        };
    } catch (error) {
        console.log("\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430");
        return {
            hits: [],
            total: 0
        };
    }
}
// getImages().then((res) => renderImg(res));
//Функція відповідає за відмальовку зоображень
async function renderImg(arr) {
    const item = arr.map(({ webformatURL, largeImageURL, likes, views, comments, downloads, tags })=>{
        return `<li>
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" />

        <div class="stats">
        <p class="stats-item">
          <i class="material-icons">thumb_up</i>
          ${likes}
        </p>
        <p class="stats-item">
          <i class="material-icons">visibility</i>
          ${views}
        </p>
        <p class="stats-item">
          <i class="material-icons">comment</i>
          ${comments}
        </p>
        <p class="stats-item">
          <i class="material-icons">cloud_download</i>
          ${downloads}
        </p>
      </div>
    </div></li>`;
    }).join("");
    list.insertAdjacentHTML("beforeend", item);
}
form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const text = event.currentTarget.elements.query.value;
    searchText = text;
    await downloadImg(true);
// btnLoad.style.display = "block"
});
btnLoad.addEventListener("click", async ()=>{
    // page += 1
    await downloadImg(false);
});
async function downloadImg(isNewSerch) {
    if (isNewSerch) {
        page = 1;
        list.innerHTML = "";
    }
    const { hits, total } = await getImages();
    PNotify.success({
        text: `\u{417}\u{43D}\u{430}\u{439}\u{434}\u{435}\u{43D}\u{43E}: ${total} \u{440}\u{435}\u{437}\u{443}\u{43B}\u{44C}\u{442}\u{430}\u{442}\u{456}\u{432}`,
        delay: 1500
    });
    if (isNewSerch && hits.length === 0) {
        list.innerHTML = "<p class='empty'>\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>";
        btnLoad.style.display = "none";
        return;
    }
    await renderImg(hits);
    if (hits.length > 0 && hits.length <= PER_PAG) {
        btnLoad.style.display = "block";
        page += 1;
    } else btnLoad.style.display = "none";
}
list.addEventListener("click", (e)=>{
    if (e.target.tagName !== "IMG") return;
    document.querySelector("#modal-img").src = e.target.src;
    document.querySelector("#modal").style.display = "flex";
});
document.querySelector("#modal").addEventListener("click", ()=>{
    document.querySelector("#modal").style.display = "none";
});

//# sourceMappingURL=mini-project.816e7b21.js.map
