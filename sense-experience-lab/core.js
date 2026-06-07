function publicBaseUrl() {
  if (window.SENSE_LAB_PUBLIC_ORIGIN) {
    return window.SENSE_LAB_PUBLIC_ORIGIN.replace(/\/$/, "");
  }
  if (["localhost", "127.0.0.1", "::1", ""].includes(window.location.hostname)) {
    return FALLBACK_PUBLIC_ORIGIN;
  }
  const basePath = window.location.pathname.endsWith("/")
    ? window.location.pathname
    : window.location.pathname.replace(/\/[^/]*$/, "/");
  return `${window.location.origin}${basePath}`.replace(/\/$/, "");
}

function senseKey() {
  const key = new URLSearchParams(window.location.search).get("sense");
  return senses[key] ? key : "vision";
}

function pageUrl(path, key) {
  return `${publicBaseUrl()}/${path}?sense=${encodeURIComponent(key)}`;
}

function qrSrc(url, size = 160) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(url)}`;
}

function renderTerms(container, terms) {
  if (!container) return;
  container.innerHTML = terms
    .map(([term, definition]) => `<div class="term-card"><strong>${term}</strong><span>${definition}</span></div>`)
    .join("");
}

function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initHome() {
  const grid = document.querySelector("#home-organ-grid");
  if (!grid) return;

  grid.innerHTML = Object.entries(senses)
    .map(([key, item]) => {
      const arUrl = pageUrl("ar.html", key);
      const quizUrl = pageUrl("quiz.html", key);
      return `
        <article class="real-organ-card">
          <div class="organ-card-head">
            <div>
              <h3>${item.gateway}</h3>
              <span>${item.sense}</span>
            </div>
            <p>${item.layers[0][1]}. Start from the recognizable whole organ, then move inward.</p>
          </div>
          <div class="real-model-mini">
            <span class="model-chip">Real 3D model: ${item.gateway}</span>
            <iframe
              src="${item.model}"
              title="${item.organ} 3D anatomy model"
              loading="lazy"
              allowfullscreen
              allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
          </div>
          <div class="layer-ladder" aria-label="${item.organ} learning layers">
            ${item.layers
              .map(([label, text]) => `<div><strong>${label}</strong><span>${text}</span></div>`)
              .join("")}
          </div>
          <div class="organ-card-actions">
            <a class="card-button primary" href="sense.html?sense=${key}">Explore</a>
            <a class="qr-button" href="${arUrl}" aria-label="Open ${item.organ} AR page">
              <img src="${qrSrc(arUrl, 180)}" alt="QR code for ${item.organ} AR">
              <span>AR Anatomy</span>
            </a>
            <a class="qr-button" href="${quizUrl}" aria-label="Open ${item.sense} quiz">
              <img src="${qrSrc(quizUrl, 180)}" alt="QR code for ${item.sense} quiz">
              <span>Quiz</span>
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

function initSensePage() {
  const key = senseKey();
  const item = senses[key];

  document.title = `${item.stationTitle} - Sense Experience Lab`;
  document.querySelector("#station-eyebrow").textContent = `${item.organ} / ${item.sense}`;
  document.querySelector("#station-title").textContent = item.stationTitle;
  document.querySelector("#station-summary").textContent = item.summary;
  document.querySelector("#station-model-frame").src = item.model;
  document.querySelector("#station-model-frame").title = `${item.organ} 3D anatomy model`;
  renderTerms(document.querySelector("#station-terms"), item.terms);

  const arUrl = `ar.html?sense=${key}`;
  const quizUrl = `quiz.html?sense=${key}`;
  document.querySelector("#station-ar-link").href = arUrl;
  document.querySelector("#station-quiz-link").href = quizUrl;
  document.querySelector("#station-ar-button").href = arUrl;
  document.querySelector("#station-quiz-button").href = quizUrl;
  document.querySelector("#station-quiz-qr-link").href = pageUrl("quiz.html", key);
  document.querySelector("#station-quiz-qr").src = qrSrc(pageUrl("quiz.html", key), 180);

  document.querySelector("#interaction-title").textContent = item.interactionTitle;
  document.querySelector("#interaction-intro").textContent = item.interactionIntro;
  document.querySelector("#engineer-note").textContent = item.engineer;
  document.querySelector("#sensor-flow").innerHTML = [
    `Input: ${item.input}`,
    `Receptor: ${item.receptor}`,
    `Signal pathway: ${item.nerve}`,
    `Brain processing: ${item.processor}`
  ]
    .map((text) => `<span>${text}</span>`)
    .join("");

  renderInteraction(key);
}

function renderInteraction(key) {
  const zone = document.querySelector("#interaction-zone");
  if (!zone) return;

  const renderers = {
    vision: renderVisionInteraction,
    hearing: renderHearingInteraction,
    balance: renderBalanceInteraction,
    smell: renderSmellInteraction,
    taste: renderTasteInteraction
  };

  renderers[key](zone);
}

function initArPage() {
  const key = senseKey();
  const item = senses[key];
  const page = pageUrl("ar.html", key);

  document.title = `${item.organ} AR Anatomy - Sense Experience Lab`;
  document.querySelector("#ar-sense-label").textContent = `${item.organ} / ${item.sense}`;
  document.querySelector("#ar-title").textContent = `${item.organ} AR Anatomy`;
  document.querySelector("#ar-summary").textContent =
    `${item.summary} Rotate the embedded 3D model and use the anatomical terms below as your learning checklist.`;
  document.querySelector("#ar-model-frame").src = item.model;
  document.querySelector("#ar-model-frame").title = `${item.organ} real 3D anatomy model`;
  document.querySelector("#external-model-link").href = item.source;
  document.querySelector("#ar-learn-link").href = `sense.html?sense=${key}`;
  document.querySelector("#ar-quiz-link").href = `quiz.html?sense=${key}`;
  document.querySelector("#self-ar-qr").src = qrSrc(page, 180);
  renderTerms(document.querySelector("#ar-terms"), item.terms);
}

function initQuizPage() {
  const key = senseKey();
  const item = senses[key];
  const form = document.querySelector("#sense-quiz");

  document.title = `${item.sense} Quiz - Sense Experience Lab`;
  document.querySelector("#quiz-title").textContent = `${item.sense} Five Question Challenge`;
  document.querySelector("#quiz-summary").textContent =
    `Kahoot-style active recall for ${item.organ}. Answer fast, then check your score.`;
  document.querySelector("#quiz-learn-link").href = `sense.html?sense=${key}`;

  form.innerHTML = item.quiz
    .map(
      (question, index) => `
        <fieldset class="quiz-question">
          <h2>${index + 1}. ${question.q}</h2>
          <div class="answer-grid">
            ${question.a
              .map(
                (answer, answerIndex) => `
                  <label>
                    <input type="radio" name="q${index}" value="${answerIndex}">
                    <span>${answer}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </fieldset>
      `
    )
    .join("");

  form.insertAdjacentHTML(
    "beforeend",
    `
      <div class="quiz-submit-row">
        <button class="button primary" type="submit">Check Score</button>
        <output class="quiz-result" id="quiz-result" aria-live="polite"></output>
      </div>
    `
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    item.quiz.forEach((question, index) => {
      const selected = form.querySelector(`input[name="q${index}"]:checked`);
      if (Number(selected?.value) === question.correct) score += 1;
    });
    document.querySelector("#quiz-result").textContent =
      score === item.quiz.length
        ? `Perfect: ${score}/${item.quiz.length}. You know this sensory organ.`
        : `Score: ${score}/${item.quiz.length}. Review the anatomy terms, then try again.`;
  });
}

initNavigation();

const page = document.body.dataset.page;
if (page === "home") initHome();
if (page === "sense") initSensePage();
if (page === "ar") initArPage();
if (page === "quiz") initQuizPage();
