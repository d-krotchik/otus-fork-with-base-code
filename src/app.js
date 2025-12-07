export function paragraphsCheck(el) {
  el.innerHTML = `
    <h1 class="title">Задание про параграфы</h1>
    <input />
    <button hidden>Добавить параграф</button>
    <p class="paragraph">1</p>
    <p class="paragraph">2</p>
    <p class="paragraph">3</p>
  `;

  const input = el.querySelector("input");
  const button = el.querySelector("button");

  input.addEventListener("input", () => {
    button.hidden = input.value.length === 0;
  });

  button.addEventListener("click", () => {
    const newP = document.createElement("p");
    newP.innerHTML = input.value;
    el.appendChild(newP);
    input.value = "";

    const pList = el.querySelectorAll("p");
    if (pList.length > 5) {
      pList[0].remove();
    }
  });
}