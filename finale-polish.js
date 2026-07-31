(()=>{
  'use strict';

  const seen=new WeakSet();

  function animate(el,keyframes,options){
    if(!el)return null;
    try{return el.animate(keyframes,options)}catch(error){console.warn('Finale animation skipped:',error);return null}
  }

  function polish(final){
    if(!final||seen.has(final))return;
    seen.add(final);

    const caption=final.querySelector('.caption');
    const web=final.querySelector('#web');
    const kitty=final.querySelector('#fk');
    const kuku=final.querySelector('#fs');
    const heart=final.querySelector('#heart');

    if(caption)caption.textContent='Tune saari yaadein wapas laa di… ab Kuku tujhe apne paas kheench raha hai 💗';
    if(kuku){kuku.setAttribute('aria-label','Kuku');kuku.title='Kuku'}

    const hearts=document.createElement('div');
    hearts.className='reunion-hearts';
    hearts.textContent='💗 ✨ 💗';
    final.appendChild(hearts);

    const cancelOriginal=()=>{
      [web,kitty,kuku,heart].forEach(el=>{
        if(!el)return;
        el.getAnimations().forEach(animation=>animation.cancel());
      });
    };

    cancelOriginal();
    const guard=setInterval(cancelOriginal,30);
    setTimeout(()=>clearInterval(guard),4700);

    if(kitty){
      kitty.style.left='7%';
      kitty.style.transform='translateY(0) rotate(0deg) scale(1)';
    }
    if(kuku){
      kuku.style.left='72%';
      kuku.style.transform='translateY(0) rotate(0deg) scale(1)';
    }
    if(web){
      web.style.strokeDasharray='1000';
      web.style.strokeDashoffset='1000';
      web.style.opacity='0';
    }

    setTimeout(()=>{
      animate(web,[
        {strokeDashoffset:'1000',opacity:0},
        {strokeDashoffset:'700',opacity:.65,offset:.22},
        {strokeDashoffset:'0',opacity:1}
      ],{duration:1250,fill:'forwards',easing:'cubic-bezier(.18,.72,.22,1)'});
    },250);

    setTimeout(()=>{
      animate(kitty,[
        {left:'7%',transform:'translateY(0) rotate(0deg) scale(1)'},
        {left:'20%',transform:'translateY(-10px) rotate(2deg) scale(1.01)',offset:.3},
        {left:'36%',transform:'translateY(-4px) rotate(4deg) scale(1.02)',offset:.68},
        {left:'45%',transform:'translateY(0) rotate(7deg) scale(1.04)'}
      ],{duration:1750,fill:'forwards',easing:'cubic-bezier(.16,.82,.18,1)'});

      animate(kuku,[
        {left:'72%',transform:'translateY(0) rotate(0deg) scale(1)'},
        {left:'63%',transform:'translateY(-3px) rotate(-2deg) scale(1.01)',offset:.55},
        {left:'49%',transform:'translateY(0) rotate(-7deg) scale(1.04)'}
      ],{duration:1550,fill:'forwards',easing:'cubic-bezier(.18,.78,.2,1)'});
    },950);

    setTimeout(()=>{
      animate(web,[{opacity:1},{opacity:0}],{duration:450,fill:'forwards',easing:'ease-out'});
      if(caption)caption.textContent='Aur phir… bilkul paas. 🥹💗';
    },2750);

    setTimeout(()=>{
      animate(kitty,[
        {left:'45%',transform:'translateY(0) rotate(7deg) scale(1.04)'},
        {left:'46.5%',transform:'translateX(16px) translateY(-2px) rotate(10deg) scale(1.08)'}
      ],{duration:520,fill:'forwards',easing:'cubic-bezier(.2,.9,.3,1)'});

      animate(kuku,[
        {left:'49%',transform:'translateY(0) rotate(-7deg) scale(1.04)'},
        {left:'47.5%',transform:'translateX(-16px) translateY(-2px) rotate(-10deg) scale(1.08)'}
      ],{duration:520,fill:'forwards',easing:'cubic-bezier(.2,.9,.3,1)'});

      animate(heart,[
        {opacity:0,transform:'translateX(-50%) translateY(20px) scale(.2)'},
        {opacity:1,transform:'translateX(-50%) translateY(-5px) scale(1.8)',offset:.48},
        {opacity:0,transform:'translateX(-50%) translateY(-105px) scale(.65)'}
      ],{duration:1450,fill:'forwards',easing:'cubic-bezier(.2,.8,.2,1)'});

      animate(hearts,[
        {opacity:0,transform:'translateX(-50%) translateY(15px) scale(.6)'},
        {opacity:1,transform:'translateX(-50%) translateY(-8px) scale(1.15)',offset:.4},
        {opacity:1,transform:'translateX(-50%) translateY(-22px) scale(1)'}
      ],{duration:900,fill:'forwards',easing:'ease-out'});
    },3150);

    setTimeout(()=>{
      final.classList.add('reunion-complete');
      if(caption)caption.textContent='Mission complete — Pihu aur Kuku finally together 💗';
    },3800);

    const renameLetter=()=>{
      const card=final.querySelector('.ui .card');
      if(!card)return;
      const heading=card.querySelector('h2');
      if(heading)heading.textContent='Kuku bach gaya. Aur meri hero tu nikli. 💗';
      const paragraphs=card.querySelectorAll('p');
      if(paragraphs[1])paragraphs[1].textContent='Tune har yaad wapas laayi, har gate cross kiya, aur aakhir mein apne Kuku ke bilkul paas pahunch gayi.';
    };

    const letterObserver=new MutationObserver(renameLetter);
    letterObserver.observe(final,{childList:true,subtree:true});
    renameLetter();
  }

  const observer=new MutationObserver(()=>{
    const final=document.getElementById('final');
    if(final)polish(final);
  });

  observer.observe(document.documentElement,{childList:true,subtree:true});
  polish(document.getElementById('final'));
})();
