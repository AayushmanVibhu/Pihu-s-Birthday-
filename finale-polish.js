(()=>{
  'use strict';

  const seen=new WeakSet();
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

  function play(el,keyframes,options){
    if(!el)return null;
    try{return el.animate(keyframes,options)}catch(error){console.warn('Finale animation skipped:',error);return null}
  }

  async function polish(final){
    if(!final||seen.has(final))return;
    seen.add(final);

    const caption=final.querySelector('.caption');
    const web=final.querySelector('#web');
    const kitty=final.querySelector('#fk');
    const kuku=final.querySelector('#fs');
    const heart=final.querySelector('#heart');
    const letter=final.querySelector('#letter');
    if(!web||!kitty||!kuku)return;

    if(caption)caption.textContent='Kuku ki web aa rahi hai… 💗';
    kuku.setAttribute('aria-label','Kuku');
    kuku.title='Kuku';

    /* Keep decorative finale elements from blocking the letter button. */
    if(heart)heart.style.pointerEvents='none';

    /* Let game.js create its animations, then cancel them ONCE. */
    await wait(80);
    [web,kitty,kuku,heart].forEach(el=>el&&el.getAnimations().forEach(a=>a.cancel()));

    kitty.style.setProperty('left','7%');
    kitty.style.setProperty('right','auto');
    kitty.style.setProperty('transform','rotate(0deg) scale(1)');
    kuku.style.setProperty('left','76%');
    kuku.style.setProperty('right','auto');
    kuku.style.setProperty('transform','rotate(0deg) scale(1)');
    web.style.strokeDasharray='1000';
    web.style.strokeDashoffset='1000';
    web.style.opacity='1';

    play(web,[
      {strokeDashoffset:'1000',opacity:.15},
      {strokeDashoffset:'0',opacity:1}
    ],{duration:1000,fill:'forwards',easing:'cubic-bezier(.18,.75,.2,1)'});

    await wait(750);
    if(caption)caption.textContent='Pakad liya! Ab Kuku tujhe kheench raha hai 🎀';

    play(kitty,[
      {left:'7%',transform:'translateY(0) rotate(0deg) scale(1)'},
      {left:'19%',transform:'translateY(-10px) rotate(2deg) scale(1.01)',offset:.25},
      {left:'34%',transform:'translateY(-3px) rotate(5deg) scale(1.04)',offset:.65},
      {left:'43%',transform:'translateY(0) rotate(8deg) scale(1.07)'}
    ],{duration:1500,fill:'forwards',easing:'cubic-bezier(.12,.82,.18,1)'});

    play(kuku,[
      {left:'76%',transform:'translateY(0) rotate(0deg) scale(1)'},
      {left:'65%',transform:'translateY(-4px) rotate(-3deg) scale(1.02)',offset:.48},
      {left:'49%',transform:'translateY(0) rotate(-8deg) scale(1.07)'}
    ],{duration:1450,fill:'forwards',easing:'cubic-bezier(.16,.8,.2,1)'});

    await wait(1450);
    play(web,[{opacity:1},{opacity:0}],{duration:300,fill:'forwards'});
    if(caption)caption.textContent='Aur phir… bilkul paas 🥹';

    play(kitty,[
      {left:'43%',transform:'translateY(0) rotate(8deg) scale(1.07)'},
      {left:'44.5%',transform:'translateX(20px) translateY(-3px) rotate(12deg) scale(1.1)'}
    ],{duration:480,fill:'forwards',easing:'cubic-bezier(.2,.9,.28,1)'});

    play(kuku,[
      {left:'49%',transform:'translateY(0) rotate(-8deg) scale(1.07)'},
      {left:'47%',transform:'translateX(-20px) translateY(-3px) rotate(-12deg) scale(1.1)'}
    ],{duration:480,fill:'forwards',easing:'cubic-bezier(.2,.9,.28,1)'});

    if(heart)play(heart,[
      {opacity:0,transform:'translateX(-50%) translateY(15px) scale(.2)'},
      {opacity:1,transform:'translateX(-50%) translateY(-5px) scale(1.8)',offset:.4},
      {opacity:0,transform:'translateX(-50%) translateY(-105px) scale(.65)'}
    ],{duration:1400,fill:'forwards',easing:'ease-out'});

    const hearts=document.createElement('div');
    hearts.className='reunion-hearts';
    hearts.textContent='💗 ✨ 💗';
    hearts.style.pointerEvents='none';
    final.appendChild(hearts);
    play(hearts,[
      {opacity:0,transform:'translateX(-50%) translateY(15px) scale(.5)'},
      {opacity:1,transform:'translateX(-50%) translateY(-12px) scale(1.15)',offset:.45},
      {opacity:1,transform:'translateX(-50%) translateY(-24px) scale(1)'}
    ],{duration:900,fill:'forwards',easing:'ease-out'});

    await wait(550);
    final.classList.add('reunion-complete');
    if(caption)caption.textContent='Mission complete — Pihu aur Kuku together 💗';

    /* Preserve game.js's original onclick handler; only restore visibility/clickability. */
    if(letter){
      letter.classList.add('show');
      letter.style.setProperty('opacity','1','important');
      letter.style.setProperty('pointer-events','auto','important');
      letter.style.setProperty('z-index','1000','important');
      letter.disabled=false;
    }

    const renameLetter=()=>{
      const card=final.querySelector('.ui .card');
      if(!card)return;
      const heading=card.querySelector('h2');
      if(heading)heading.textContent='Kuku bach gaya. Aur meri hero tu nikli. 💗';
      const paragraphs=card.querySelectorAll('p');
      if(paragraphs[1])paragraphs[1].textContent='Tune har yaad wapas laayi, har gate cross kiya, aur aakhir mein apne Kuku ke bilkul paas pahunch gayi.';
    };
    new MutationObserver(renameLetter).observe(final,{childList:true,subtree:true});
  }

  new MutationObserver(()=>{
    const final=document.getElementById('final');
    if(final)polish(final);
  }).observe(document.documentElement,{childList:true,subtree:true});

  const existing=document.getElementById('final');
  if(existing)polish(existing);
})();
