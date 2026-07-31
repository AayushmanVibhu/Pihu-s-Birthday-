(()=>{
  'use strict';

  const root=document.getElementById('root');
  const safeMode=new URLSearchParams(location.search).get('safe')==='1';
  let coreReady=false;
  let recoveryShown=false;

  function shell(){
    if(!root)return;
    root.innerHTML=`<main class="boot-shell" id="bootShell"><section class="boot-card"><div class="boot-heart">💗</div><p class="boot-kicker">Pihu's birthday mission</p><h1>Loading your little world…</h1><p id="bootStatus">Getting Hello Kitty ready 🎀</p><div class="boot-dots"><i></i><i></i><i></i></div></section></main>`;
  }

  function recovery(error){
    if(recoveryShown||coreReady)return;
    recoveryShown=true;
    console.error('Game startup failed:',error);
    if(!root)return;
    root.innerHTML=`<main class="boot-shell"><section class="boot-card boot-error"><div class="boot-heart">🎀</div><p class="boot-kicker">Tiny technical hiccup</p><h1>The page is safe — the game just did not start.</h1><p>Open the stable version without optional animations, or refresh and try again.</p><div class="boot-actions"><a class="boot-button" href="./?safe=1">Open stable mode</a><button class="boot-button boot-secondary" id="bootReload">Refresh</button></div><details><summary>Technical detail</summary><pre>${String(error&&error.message||error||'Unknown startup error').replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</pre></details></section></main>`;
    const reload=document.getElementById('bootReload');
    if(reload)reload.onclick=()=>location.reload();
  }

  function loadScript(src,required=false){
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=src;
      script.defer=true;
      script.onload=()=>resolve(src);
      script.onerror=()=>{
        const err=new Error(`Could not load ${src}`);
        if(required)reject(err);else{console.warn(err);resolve(null);}
      };
      document.body.appendChild(script);
    });
  }

  window.addEventListener('error',event=>{
    if(!coreReady)recovery(event.error||event.message);
    else console.error('Optional game feature failed:',event.error||event.message);
  });
  window.addEventListener('unhandledrejection',event=>{
    if(!coreReady)recovery(event.reason);
    else console.error('Optional game feature rejected:',event.reason);
  });

  shell();

  const timeout=setTimeout(()=>{
    if(!coreReady)recovery(new Error('The game took too long to start.'));
  },8000);

  loadScript('./game.js?v=4',true)
    .then(()=>{
      setTimeout(()=>{
        if(root&&root.children.length){
          coreReady=true;
          clearTimeout(timeout);
        }else{
          recovery(new Error('Core game loaded but rendered no screen.'));
        }
      },100);

      if(!safeMode){
        loadScript('./gate-fix.js?v=4');
        loadScript('./finale-polish.js?v=2');
      }
    })
    .catch(recovery);
})();
