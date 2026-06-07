function renderVisionInteraction(zone) {
  zone.innerHTML = `
    <div class="interaction-shell">
      <div class="interaction-stage">
        <div class="vision-stage" id="vision-stage">
          <div class="vision-board">BIO SENSOR LAB</div>
          <div class="vision-samples"><span></span><span></span><span></span><span></span></div>
        </div>
      </div>
      <div class="interaction-controls">
        <div class="mission-card">
          <strong>Student Mission</strong>
          <span>Find what changes before the signal reaches the brain.</span>
        </div>
        <h3>Visual condition</h3>
        <div class="signal-readout">
          <span>Retinal signal clarity</span>
          <strong id="vision-score">96%</strong>
          <div><i id="vision-meter"></i></div>
        </div>
        <div class="control-grid">
          <button type="button" class="is-active" data-vision-mode="normal">Normal</button>
          <button type="button" data-vision-mode="myopia">Myopia</button>
          <button type="button" data-vision-mode="color">Color shift</button>
          <button type="button" data-vision-mode="aging">Aging lens</button>
        </div>
        <p class="note-box" id="interaction-note">Normal vision gives sharp edges and easy color comparison.</p>
      </div>
    </div>
  `;

  const notes = {
    normal: "Normal vision gives sharp edges and easy color comparison.",
    myopia: "Myopia blurs distant details because light focuses before the retina.",
    color: "Cone differences can make red-green information harder to separate.",
    aging: "Lens aging can reduce contrast and add yellowish haze."
  };
  const scores = { normal: 96, myopia: 48, color: 64, aging: 58 };

  zone.querySelectorAll("[data-vision-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      zone.querySelectorAll("[data-vision-mode]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      zone.querySelector("#vision-stage").dataset.mode = button.dataset.visionMode;
      zone.querySelector("#interaction-note").textContent = notes[button.dataset.visionMode];
      zone.querySelector("#vision-score").textContent = `${scores[button.dataset.visionMode]}%`;
      zone.querySelector("#vision-meter").style.width = `${scores[button.dataset.visionMode]}%`;
    });
  });
}

let audioContext;

function renderHearingInteraction(zone) {
  zone.innerHTML = `
    <div class="interaction-shell">
      <div class="interaction-stage">
        <canvas class="audio-canvas" id="audio-canvas" width="720" height="280"></canvas>
      </div>
      <div class="interaction-controls">
        <div class="mission-card">
          <strong>Student Mission</strong>
          <span>Compare which frequencies survive each hearing condition.</span>
        </div>
        <h3>Hearing mode</h3>
        <div class="signal-readout">
          <span>Speech detail clarity</span>
          <strong id="audio-score">--</strong>
          <div><i id="audio-meter"></i></div>
        </div>
        <div class="control-grid">
          <button type="button" data-audio-mode="normal">Normal</button>
          <button type="button" data-audio-mode="highloss">High loss</button>
          <button type="button" data-audio-mode="muffled">Muffled</button>
          <button type="button" data-audio-mode="tinnitus">Tinnitus</button>
        </div>
        <p class="note-box" id="interaction-note">Choose a mode. Keep volume low.</p>
      </div>
    </div>
  `;

  const canvas = zone.querySelector("#audio-canvas");
  const context = canvas.getContext("2d");
  drawAudioBars(context, canvas, "idle");

  const notes = {
    normal: "Normal hearing keeps low and high frequency details balanced.",
    highloss: "High-frequency loss removes speech detail, especially consonants.",
    muffled: "Muffled hearing reduces clarity, as if the signal is covered.",
    tinnitus: "Tinnitus mode adds a thin high tone. Stop if uncomfortable."
  };
  const scores = { normal: 94, highloss: 46, muffled: 35, tinnitus: 62 };

  zone.querySelectorAll("[data-audio-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      zone.querySelectorAll("[data-audio-mode]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      drawAudioBars(context, canvas, button.dataset.audioMode);
      playAudio(button.dataset.audioMode);
      zone.querySelector("#interaction-note").textContent = notes[button.dataset.audioMode];
      zone.querySelector("#audio-score").textContent = `${scores[button.dataset.audioMode]}%`;
      zone.querySelector("#audio-meter").style.width = `${scores[button.dataset.audioMode]}%`;
    });
  });
}

function drawAudioBars(context, canvas, mode) {
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#101827";
  context.fillRect(0, 0, width, height);
  const colors = ["#0e9b9d", "#2457a7", "#f1b93d", "#ee6a5a"];

  for (let i = 0; i < 36; i += 1) {
    let value = 0.18 + Math.sin(i * 0.55) * 0.12 + (i % 5) * 0.025;
    if (mode === "normal") value += i / 36 * 0.24;
    if (mode === "highloss") value += Math.max(0, 0.44 - i / 36 * 0.58);
    if (mode === "muffled") value += i < 13 ? 0.42 : 0.02;
    if (mode === "tinnitus") value += i === 29 || i === 30 ? 0.82 : 0.18;
    if (mode === "idle") value = 0.16 + (i % 7) * 0.015;
    const gap = 5;
    const barWidth = (width - gap * 37) / 36;
    const barHeight = Math.min(height - 44, value * (height - 34));
    context.fillStyle = colors[i % colors.length];
    context.globalAlpha = mode === "idle" ? 0.55 : 0.9;
    context.fillRect(gap + i * (barWidth + gap), height - barHeight - 24, barWidth, barHeight);
  }

  context.globalAlpha = 1;
  context.fillStyle = "#cbd7e7";
  context.font = "700 15px system-ui, sans-serif";
  context.fillText("Low frequencies", 16, height - 8);
  context.textAlign = "right";
  context.fillText("High frequencies", width - 16, height - 8);
  context.textAlign = "left";
}

function playAudio(mode) {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  const master = audioContext.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.045, now + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
  master.connect(audioContext.destination);

  const filter = audioContext.createBiquadFilter();
  filter.connect(master);
  filter.type = mode === "normal" || mode === "tinnitus" ? "highpass" : "lowpass";
  filter.frequency.value = mode === "muffled" ? 620 : mode === "highloss" ? 1050 : 80;

  const frequencies = mode === "tinnitus" ? [440, 880, 5800] : [260, 420, 720, 1280, 2400];
  frequencies.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = index % 2 === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.value = mode === "tinnitus" && frequency > 3000 ? 0.018 : 0.011;
    oscillator.connect(gain);
    gain.connect(filter);
    oscillator.start(now + index * 0.035);
    oscillator.stop(now + 1.28);
  });
}

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
          <button type="top" id="stop-motion">Stop</button>
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
    stage.classList.add("is-moving");
    zone.querySelector("#eye-gauge").style.width = "45%";
    zone.querySelector("#vestibular-gauge").style.width = "45%";
    zone.querySelector("#body-gauge").style.width = "45%";
    zone.querySelector("#interaction-note").textContent =
      "Stopped. A stable visual reference can help the brain compare motion signals.";
    clearTimeout(timer);
  });
}

function renderSmellInteraction(zone) {
  zone.innerHTML = `
    <div class="interaction-shell">
      <div class="interaction-stage">
        <div class="smell-stage">
          <div class="receptor-array" id="receptor-array">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
      <div class="interaction-controls">
        <div class="mission-card">
          <strong>Student Mission</strong>
          <span>Discover how smell is a receptor pattern, not one single switch.</span>
        </div>
        <h3>Odor molecule</h3>
        <div class="code-display" id="odor-code">Code: -- -- -- -- --</div>
        <div class="control-grid">
          <button type="button" data-odor="mint">Mint</button>
          <button type="button" data-odor="coffee">Coffee</button>
          <button type="button" data-odor="smoke">Smoke</button>
          <button type="button" data-odor="citrus">Citrus</button>
        </div>
        <p class="note-box" id="interaction-note">Pick an odor. The pattern is what the brain learns to recognize.</p>
      </div>
    </div>
  `;

  const patterns = {
    mint: [[0, 3], "Mint creates a cool, sharp receptor pattern."],
    coffee: [[1, 2, 4], "Coffee activates several receptors together, so it feels complex."],
    smoke: [[0, 2, 4], "Smoke-like molecules trigger a warning-style pattern."],
    citrus: [[2, 3], "Citrus creates a bright pattern from a receptor combination."]
  };

  zone.querySelectorAll("[data-odor]").forEach((button) => {
    button.addEventListener("click", () => {
      zone.querySelectorAll("[data-odor]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      const [active, note] = patterns[button.dataset.odor];
      zone.querySelectorAll(".receptor-array span").forEach((receptor, index) => {
        receptor.classList.toggle("is-active", active.includes(index));
      });
      zone.querySelector("#odor-code").textContent =
        `Code: ${[0, 1, 2, 3, 4].map((index) => (active.includes(index) ? "ON" : "off")).join(" / ")}`;
      zone.querySelector("#interaction-note").textContent = note;
    });
  });
}

function renderTasteInteraction(zone) {
  zone.innerHTML = `
    <div class="interaction-shell">
      <div class="interaction-stage">
        <div class="taste-stage">
          <div class="taste-array" id="taste-array">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
      <div class="interaction-controls">
        <div class="mission-card">
          <strong>Student Mission</strong>
          <span>Change taste quality and concentration to see receptor signal strength.</span>
        </div>
        <h3>Taste quality</h3>
        <div class="signal-readout">
          <span>Gustatory signal</span>
          <strong id="taste-score">70%</strong>
          <div><i id="taste-meter"></i></div>
        </div>
        <div class="control-grid">
          <button type="button" class="is-active" data-taste="sweet">Sweet</button>
          <button type="button" data-taste="sour">Sour</button>
          <button type="button" data-taste="salty">Salty</button>
          <button type="button" data-taste="bitter">Bitter</button>
          <button type="button" data-taste="umami">Umami</button>
        </div>
        <label class="range-label">Concentration <input id="taste-strength" type="range" min="10" max="100" value="70"></label>
        <p class="note-box" id="interaction-note">Sweet often signals energy-rich food.</p>
      </div>
    </div>
  `;

  const patterns = {
    sweet: [[0, 2], "Sweet often signals energy-rich food."],
    sour: [[1, 3], "Sour can signal acids. Higher concentration strengthens the signal."],
    salty: [[2, 4], "Salty helps monitor mineral content."],
    bitter: [[0, 4], "Bitter can warn the body about possible toxins."],
    umami: [[1, 2, 3], "Umami is a savory signal linked to amino acids."]
  };

  function setTaste(taste) {
    const [active, note] = patterns[taste];
    const strength = Number(zone.querySelector("#taste-strength").value);
    zone.querySelectorAll(".taste-array span").forEach((cell, index) => {
      cell.classList.toggle("is-active", active.includes(index));
      cell.style.opacity = strength / 100;
    });
    zone.querySelector("#taste-score").textContent = `${strength}%`;
    zone.querySelector("#taste-meter").style.width = `${strength}%`;
    zone.querySelector("#interaction-note").textContent = note;
  }

  zone.querySelectorAll("[data-taste]").forEach((button) => {
    button.addEventListener("click", () => {
      zone.querySelectorAll("[data-taste]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      setTaste(button.dataset.taste);
    });
  });

  zone.querySelector("#taste-strength").addEventListener("input", () => {
    const activeButton = zone.querySelector("[data-taste].is-active");
    setTaste(activeButton.dataset.taste);
  });

  setTaste("sweet");
}
