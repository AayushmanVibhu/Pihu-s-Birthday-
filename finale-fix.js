/* Stable finale override: fixed coordinates + staged Web Animations API */
(function () {
  const oldFinal = window.final;

  window.final = function final() {
    clearTimer();
    root.innerHTML = `
      <main style="min-height:100vh;background:linear-gradient(#243f80 0 62%,#101626 62%);overflow:hidden;position:relative;color:white;font-family:Inter,system-ui,sans-serif">
        <div id="final-stars" style="position:absolute;inset:0;background-image:radial-gradient(circle,#fff 1px,transparent 1px);background-size:55px 55px;opacity:.55"></div>
        <div style="position:absolute;width:150px;height:150px;border-radius:50%;background:#fff0b3;right:8%;top:8%;box-shadow:0 0 70px #fff0b377"></div>
        <div style="position:absolute;left:0;right:0;bottom:0;height:32%;background:#0b142d;clip-path:polygon(0 100%,0 45%,10% 45%,10% 15%,20% 15%,20% 60%,30% 60%,30% 8%,42% 8%,42% 50%,55% 50%,55% 22%,68% 22%,68% 62%,80% 62%,80% 8%,91% 8%,91% 48%,100% 48%,100% 100%)"></div>

        <div style="position:absolute;z-index:20;left:50%;top:5%;transform:translateX(-50%);padding:10px 18px;border-radius:999px;background:#ff78b7;font-weight:900;text-align:center">MISSION COMPLETE · SCORE ${state.score}</div>
        <div id="final-caption" style="position:absolute;z-index:20;left:50%;top:15%;transform:translateX(-50%);font-size:clamp(1.2rem,4vw,2.2rem);font-weight:900;text-align:center;text-shadow:0 4px 20px #000">Spider-Man is safe… 💗</div>

        <div id="webline-final" style="position:absolute;z-index:9;height:4px;width:0;background:white;box-shadow:0 0 10px white;left:72%;top:49%;transform-origin:right center"></div>

        <div id="kitty-final" style="position:absolute;z-index:12;left:7%;bottom:11%;width:min(190px,30vw);height:auto;transform-origin:center bottom">${kittySVG('blush')}</div>
        <div id="spidey-final" style="position:absolute;z-index:12;right:7%;bottom:11%;width:min(190px,30vw);height:auto;transform-origin:center bottom">${spideySVG('blush')}</div>

        <div id="kiss-final" style="position:absolute;z-index:30;left:50%;bottom:39%;transform:translateX(-50%) scale(0);opacity:0;font-size:clamp(3rem,10vw,6rem)">💗</div>
        <div id="hug-label" style="position:absolute;z-index:25;left:50%;bottom:8%;transform:translateX(-50%);font-weight:900;font-size:clamp(1rem,3vw,1.5rem);opacity:0">Finally together 🥹❤️</div>

        <button id="letterBtn" style="position:absolute;z-index:40;left:50%;bottom:2%;transform:translateX(-50%) scale(.8);opacity:0;border:0;border-radius:999px;padding:14px 22px;background:linear-gradient(135deg,#ff78b7,#ff3f7f);color:white;font-weight:900;cursor:pointer">Open birthday letter 💌</button>

        <div id="letterOverlay" style="display:none;position:fixed;z-index:100;inset:0;background:#040712e8;place-items:center;padding:22px">
          <article style="width:min(720px,94vw);padding:30px;border-radius:24px;background:#fffaf1;color:#35263d;box-shadow:0 30px 90px #0009">
            <p style="text-transform:uppercase;letter-spacing:.18em;color:#d73d75;font-weight:900">Mission complete</p>
            <h2>Spider-Man saved. Birthday girl victorious. 💗</h2>
            <p style="line-height:1.8;color:#66556c">Ab yahan tumhara final birthday letter aayega. Tum har memory cross karke mere paas pahuchi… aur ab bas tum aur main.</p>
            <button id="again" style="border:0;border-radius:999px;padding:14px 22px;background:#ff4f8b;color:white;font-weight:900;cursor:pointer">Play again</button>
          </article>
        </div>
      </main>`;

    const kitty = document.getElementById('kitty-final');
    const spidey = document.getElementById('spidey-final');
    const web = document.getElementById('webline-final');
    const kiss = document.getElementById('kiss-final');
    const caption = document.getElementById('final-caption');
    const hugLabel = document.getElementById('hug-label');
    const letterBtn = document.getElementById('letterBtn');

    // Keep SVG wrappers constrained to their parent boxes.
    [kitty, spidey].forEach(host => {
      const character = host.querySelector('.character');
      if (character) {
        character.style.width = '100%';
        character.style.height = 'auto';
        character.style.animation = 'none';
      }
      const webline = host.querySelector('.webline');
      if (webline) webline.style.display = 'none';
    });

    caption.textContent = 'Web incoming… 🕸️';
    web.animate([
      { width: '0', left: '72%' },
      { width: '45%', left: '27%' }
    ], { duration: 900, fill: 'forwards', easing: 'ease-out' });

    setTimeout(() => {
      caption.textContent = 'He found her! 💗';
      kitty.animate([
        { left: '7%', transform: 'rotate(0deg)' },
        { left: '39%', transform: 'rotate(7deg)' },
        { left: '43%', transform: 'rotate(-2deg)' }
      ], { duration: 1500, fill: 'forwards', easing: 'cubic-bezier(.2,.8,.2,1)' });
    }, 900);

    setTimeout(() => {
      caption.textContent = 'They turn toward each other… 🥹';
      kitty.animate([{ transform: 'rotate(-2deg)' }, { transform: 'rotate(5deg) scale(1.05)' }], { duration: 600, fill: 'forwards' });
      spidey.animate([{ right: '7%', transform: 'rotate(0deg)' }, { right: '39%', transform: 'rotate(-5deg) scale(1.05)' }], { duration: 800, fill: 'forwards', easing: 'ease-in-out' });
    }, 2500);

    setTimeout(() => {
      caption.textContent = 'Mwah 💗';
      kiss.animate([
        { transform: 'translateX(-50%) scale(0)', opacity: 0 },
        { transform: 'translateX(-50%) scale(1.5)', opacity: 1, offset: .35 },
        { transform: 'translateX(-50%) translateY(-65px) scale(.8)', opacity: 0 }
      ], { duration: 1300, fill: 'forwards', easing: 'ease-out' });
      kissSound();
    }, 3500);

    setTimeout(() => {
      caption.textContent = 'Best rescue ever ❤️';
      kitty.animate([{ left: '43%' }, { left: '46%', transform: 'rotate(8deg) scale(1.08)' }], { duration: 600, fill: 'forwards' });
      spidey.animate([{ right: '39%' }, { right: '42%', transform: 'rotate(-8deg) scale(1.08)' }], { duration: 600, fill: 'forwards' });
      hugLabel.animate([{ opacity: 0, transform: 'translateX(-50%) translateY(15px)' }, { opacity: 1, transform: 'translateX(-50%) translateY(0)' }], { duration: 700, fill: 'forwards' });
      confetti();
    }, 4700);

    setTimeout(() => {
      letterBtn.animate([{ opacity: 0, transform: 'translateX(-50%) scale(.8)' }, { opacity: 1, transform: 'translateX(-50%) scale(1)' }], { duration: 600, fill: 'forwards' });
    }, 5700);

    letterBtn.onclick = () => {
      document.getElementById('letterOverlay').style.display = 'grid';
    };

    document.getElementById('again').onclick = () => {
      Object.assign(state, { screen: 'intro', q: 0, lives: 3, answered: false, streak: 0, score: 0 });
      render();
    };
  };
})();