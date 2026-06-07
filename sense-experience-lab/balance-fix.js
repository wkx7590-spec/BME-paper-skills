function renderBalanceInteraction(zone) {
  zone.innerHTML = `
    <div class="interaction-shell">
      <div class="interaction-stage">
        <div class="balance-stage" id="balance-stage">
          <div class="hallway"></div>
          <div class="focus-dot">Focus here</div>
        </div>
      </div>
      <div class="interaction-controls">
        <div class="mission-card">
          <strong>Student Mission</strong>
          <span>Watch what happens when visual and vestibular sensors disagree.</span>
        </div>
        <h3>Motion conflict</h3>
        <div class="sensor-fusion">
          <span><b>Eyes</b><i id="eye-gauge"></i></span>
          <span><b>Vestibular organ</b><i id="vestibular-gauge"></i></span>
          <span><b>Body position</b><i id="body-gauge"></i></span>
        </div>
        <div class="control-grid">
          <button type="button" id="start-motion">Start gentle demo</button>
          <button type="button" id="stop-motion">Stop</button>
        </div>
        <p class="note-box" id="interaction-note">Motion sickness can happen when visual and vestibular signals disagree.</p>
      </div>
    </div>
  `;

  let timer;
  const stage = zone.querySelector("#balance-stage");
  zone.querySelector("#start-motion").addEventListener("click", () => {
    stage.classList.add("is-moving");
    zone.querySelector("#eye-gauge").style.width = "92%";
    zone.querySelector("#vestibular-gauge").style.width = "22%";
    zone.querySelector("#body-gauge").style.width = "30%";
    zone.querySelector("#interaction-note").textContent =
      "The scene moves while your body is still. That mismatch is visual-vestibular conflict.";
    clearTimeout(timer);
    timer = setTimeout(() => stage.classList.remove("is-moving"), 8000);
  });
  zone.querySelector("#stop-motion").addEventListener("click", () => {
    stage.classList.remove("is-moving");
    zone.querySelector("#eye-gauge").style.width = "45%";
    zone.querySelector("#vestibular-gauge").style.width = "45%";
    zone.querySelector("#body-gauge").style.width = "45%";
    zone.querySelector("#interaction-note").textContent =
      "Stopped. A stable visual reference can help the brain compare motion signals.";
    clearTimeout(timer);
  });
}
