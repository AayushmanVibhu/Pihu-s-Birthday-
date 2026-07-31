(()=>{'use strict';
const seen=new WeakSet();
function polish(final){
  if(seen.has(final))return;
  seen.add(final);
  final.classList.add('kuku-reunion');

  const caption=final.querySelector('.caption');
  if(caption)caption.textContent='Tune saari yaadein wapas laa di… aur Kuku tak pahunch gayi 💗';

  const web=final.querySelector('#web');
  const kitty=final.querySelector('#fk');
  const kuku=final.querySelector('#fs');
  const heart=final.querySelector('#heart');

  const cancelOriginal=()=>{
    [web,kitty,kuku,heart].forEach(el=>el&&el.getAnimations().forEach(a=>a.cancel()));
  };
  const guard=setInterval(cancelOriginal,40);
  setTimeout(()=>clearInterval(guard),5600);
  cancelOriginal();

  if(kuku){
    kuku.setAttribute('aria-label','Kuku');
    kuku.title='Kuku';
  }

  if(web){
    web.style.strokeDasharray='1000';
    web.style.strokeDashoffset='1000';
    web.style.opacity='1';
    web.animate([
      {strokeDashoffset:'1000',opacity:.25},
      {strokeDashoffset:'120',opacity:1,offset:.82},
      {strokeDashoffset:'0',opacity:1}
    ],{duration:1500,fill:'forwards',easing:'cubic-bezier(.2,.75,.25,1)'});
  }

  if(kitty){
    kitty.style.left='8%';
    kitty.style.transform='none';
    setTimeout(()=>kitty.animate([
      {left:'8%',transform:'translateY(0)'},
      {left:'31%',transform:'translateY(-5px)',offset:.45},
      {left:'42.5%',transform:'translateY(0)'}
    ],{duration:1850,fill:'forwards',easing:'cubic-bezier(.18,.82,.2,1)'}),500);
  }

  if(kuku){
    kuku.style.left='68%';
    kuku.style.transform='none';
    setTimeout(()=>kuku.animate([
      {left:'68%',transform:'translateY(0)'},
      {left:'58%',transform:'translateY(-4px)',offset:.55},
      {left:'50.5%',transform:'translateY(0)'}
    ],{duration:1500,fill:'forwards',easing:'cubic-bezier(.18,.82,.2,1)'}),850);
  }

  setTimeout(()=>{
    if(web)web.animate([{opacity:1},{opacity:0}],{duration:650,fill:'forwards',easing:'ease-out'});
    final.classList.add('kuku-reunion');
  },2450);

  setTimeout(()=>{
    if(heart)heart.animate([
      {opacity:0,transform:'translateX(-50%) translateY(15px) scale(.25)'},
      {opacity:1,transform:'translateX(-50%) translateY(-5px) scale(1.7)',offset:.45},
      {opacity:1,transform:'translateX(-50%) translateY(-45px) scale(1.05)',offset:.72},
      {opacity:0,transform:'translateX(-50%) translateY(-100px) scale(.65)'}
    ],{duration:1700,fill:'forwards',easing:'cubic-bezier(.2,.8,.2,1)'});
  },2700);

  const renameLetter=()=>{
    const card=final.querySelector('.ui .card');
    if(!card)return;
    const heading=card.querySelector('h2');
    if(heading)heading.textContent='Kuku bach gaya. Aur meri hero tu nikli. 💗';
    const paragraphs=card.querySelectorAll('p');
    if(paragraphs[1])paragraphs[1].textContent='Tune har yaad wapas laayi, har gate cross kiya, aur aakhir mein apne Kuku ke paas pahunch hi gayi.';
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
