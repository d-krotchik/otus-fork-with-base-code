import { paragraphsCheck } from "./app.js";

describe("Тесты для д.з. по скрытой кнопке и добавляемым параграфам", () => {
  let el;
  let input;
  let button;
  let paragraph;
  let paragraphs;

  beforeEach(() => {
    el = document.createElement("div");
    paragraphsCheck(el);
    input = el.querySelector("input");
    button = el.querySelector("button");
    paragraph = el.querySelector("p");
    paragraphs = el.querySelectorAll("p");
  });

  test("1. Есть ли заголовок (h2) с описанием", () => {
    let title = document.querySelector("h2");
    expect(title).toBeDefined();
  });

  test("2. Проверка существования поля ввода", () => {
    expect(input).toBeDefined();
  });

  test("3. Проверка существования кнопки", () => {
    expect(button).toBeDefined();
  });

  test("4. Проверка существования параграфа", () => {
    expect(paragraph).toBeDefined();
  });

  test("5. Параграфов по умолчанию должно быть 3", () => {
    expect(paragraphs.length).toBe(3);
  });

  test("6. Кнопки не должно быть видно", () => {
    expect(button.hasAttribute("hidden")).toBe(true);
  });

  test("7. Кнопки должна быть видна, когда заполнено поле ввода", () => {
    input.value = "Some text";

    expect(button.hasAttribute('[hidden="hidden"]')).toBe(false);
  });

  test("8. Пустое ли поле ввода по умолчанию", () => {
    expect(input.value = "").toBe("");
  });

  test("9. При очистке поля ввода, кнопка должна скрываться", () => {
    input.value = "Some text";
    input.value = "";

    expect(button.hasAttribute("hidden")).toBe(true);
  });

  test("10. Существует ли div, для вставки новых параграфов", () => {
    expect(el).toBeDefined();
  });

  test("11. После клика должен быть добавлен параграф", () => {
    let startParagraphsCount = el.querySelectorAll("p").length;

    input.value = "Some text";
    button.click();

    let afterClickParagraphsCount = el.querySelectorAll("p").length;

    expect(startParagraphsCount).toBe(afterClickParagraphsCount - 1);
  });

  test("12. Поле очищается после нажатия кнопки", () => {
    input.value = "Some text";
    button.click();

    expect(input.value).toBe("");
  });

  test("13. Одновременно может быть не более 5 параграфов", () => {
    for (let i = 0; i < 5; i++) {
      button.click();
    }

    let paragraphsCount = el.querySelectorAll("p").length;
    expect(paragraphsCount).toBe(5);
  });

  test("14. Текст в параграфе такой же как был в инпуте", () => {
    let text = `${Math.random()}`;
    input.value = text;
    button.click();

    paragraphs = el.querySelectorAll("p");

    expect(paragraphs[paragraphs.length-1].innerHTML).toEqual(text);
  });

  test("15. Проверяем что текст добавился именно в параграф", () => {
    input.value = "Some text";
    button.click();

    expect((paragraphs[0].tagName).toLowerCase()).toBe("p");
  });

});