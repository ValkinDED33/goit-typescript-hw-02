import "./style.css";

const app = document.getElementById("app");

if (app) {
  app.innerHTML = `
    <h1>Welcome to TypeScript + Vite</h1>
    <div class="card">
      <button id="counter">Count is 0</button>
    </div>
    <p class="read-the-docs">Click the button to increase the counter.</p>
  `;

  const button = document.getElementById("counter") as HTMLButtonElement;
  let count = 0;

  button.addEventListener("click", () => {
    count++;
    button.textContent = `Count is ${count}`;
  });
}
