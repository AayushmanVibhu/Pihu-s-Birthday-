(()=>{
  'use strict';

  let finished=false;
  const finder=setInterval(()=>{
    if(finished)return;
    const final=document.getElementById('final');
    if(!final)return;

    const kitty=document.getElementById('fk');
    const kuku=document.getElementById('fs');
    const caption=final.querySelector('.caption');
    const letter=document.getElementById('letter');
    if(!kitty||!kuku||!letter)return;

    finished=true;
    clearInterval(finder);

    /* Keep game.js in charge of the web, heart, letter button and popup.
       This file only corrects the final distance once the original animation ends. */
    setTimeout(()=>{
      kitty.style.setProperty('left','44%');
      kitty.style.setProperty('right','auto');
      kitty.style.setProperty('transform','translateX(18px) rotate(10deg) scale(1.08)');

      kuku.style.setProperty('left','47%');
      kuku.style.setProperty('right','auto');
      kuku.style.setProperty('transform','translateX(-18px) rotate(-10deg) scale(1.08)');

      final.classList.add('reunion-complete');
      if(caption)caption.textContent='Mission complete — Pihu aur Kuku together 💗';

      /* Do not replace or wrap game.js's onclick handler. */
      letter.classList.add('show');
      letter.style.removeProperty('opacity');
      letter.style.removeProperty('pointer-events');
      letter.style.removeProperty('z-index');
      letter.disabled=false;
    },4300);
  },250);

  /* Stop checking after ten minutes even if the player never reaches the finale. */
  setTimeout(()=>clearInterval(finder),600000);
})();
