let e=document.querySelector("#search-form"),t=document.querySelector(".gallery"),a=document.querySelector(".load"),s=1,i="";async function l(){try{let e=`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${i}&page=${s}&per_page=12&key=54040957-efed6322ea17d5f22db4ab8b0`,t=await fetch(e),a=await t.json();return{hits:a.hits,total:a.totalHits}}catch(e){return console.log("Сталася помилка"),{hits:[],total:0}}}async function n(e){let a=e.map(({webformatURL:e,largeImageURL:t,likes:a,views:s,comments:i,downloads:l,tags:n})=>`<li>
        <div class="photo-card">
        <img src="${e}" alt="${n}" />

        <div class="stats">
        <p class="stats-item">
          <i class="material-icons">thumb_up</i>
          ${a}
        </p>
        <p class="stats-item">
          <i class="material-icons">visibility</i>
          ${s}
        </p>
        <p class="stats-item">
          <i class="material-icons">comment</i>
          ${i}
        </p>
        <p class="stats-item">
          <i class="material-icons">cloud_download</i>
          ${l}
        </p>
      </div>
    </div></li>`).join("");t.insertAdjacentHTML("beforeend",a)}async function o(e){e&&(s=1,t.innerHTML="");let{hits:i,total:o}=await l();if(document.querySelector(".result-count").textContent=`\u{417}\u{43D}\u{430}\u{439}\u{434}\u{435}\u{43D}\u{43E} ${o} \u{437}\u{43E}\u{431}\u{440}\u{430}\u{436}\u{435}\u{43D}\u{44C}`,e&&0===i.length){t.innerHTML="<p class='empty'>Нічого не знайдено</p>",a.style.display="none";return}await n(i),i.length>0&&i.length<=12?(a.style.display="block",s+=1):a.style.display="none"}e.addEventListener("submit",async e=>{e.preventDefault(),i=e.currentTarget.elements.query.value,await o(!0)}),a.addEventListener("click",async()=>{await o(!1)}),t.addEventListener("click",e=>{"IMG"===e.target.tagName&&(document.querySelector("#modal-img").src=e.target.src,document.querySelector("#modal").style.display="flex")}),document.querySelector("#modal").addEventListener("click",()=>{document.querySelector("#modal").style.display="none"});
//# sourceMappingURL=mini-project.cc161eb1.js.map
