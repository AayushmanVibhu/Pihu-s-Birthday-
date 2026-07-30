import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music2, VolumeX, Sparkles } from 'lucide-react';

type Memory = { icon: string; date: string; title: string; text: string; photo: string; special?: 'shirt' | 'song' };

const memories: Memory[] = [
  { icon:'✨', date:'26 December 2022', title:'Jab hum pehli baar mile', text:'Uss din shayad hume bilkul idea nahi tha ki yeh ek normal meeting nahi rehne wali. Mujhe nahi pata tha ki ek din tum meri favourite person ban jaogi.', photo:'Add your first-meeting photo here' },
  { icon:'📱', date:'5 March 2023', title:'Finally number mil gaya', text:'Ussi din humne numbers exchange kiye… aur haan, finally tumhara poora naam bhi pata chala. Chhoti si baat thi, par story yahin se thodi aur real hone lagi.', photo:'Add a chat screenshot or early photo here' },
  { icon:'☎️', date:'8 September 2023', title:'Hamari pehli phone call', text:'Tum aur didi milkar mujhe bewakoof bana rahe the, kisi aisi ladki bankar jisko supposedly mujh mein romantic interest tha. Aur main genuinely confuse ho gaya tha 💀 Acting kaafi achhi thi, maan-na padega.', photo:'Add a funny call/chat screenshot here' },
  { icon:'❤️', date:'13 December 2024', title:'The day we became us', text:'Iss din maine tumhe propose kiya… aur hum officially dating start kar diye. Honestly, meri life ke best decisions mein se ek.', photo:'Add proposal-day photo or chat here' },
  { icon:'👕', date:'23 May 2025 · Deer Park', title:'Shirt?', text:'Shaam thi, park almost khaali tha, aur tumne dheere se “shirt” bola. Mujhe “should I?” sunayi diya… toh maine pooch liya, “Are you sure?” Phir embarrassment hide karne ke liye weather ki baat karne laga 💀 Uske baad tumne khud poocha… 3… 2… 1… GO ❤️ Aur tab se shirt ka matlab sirf shirt nahi raha.', photo:'Add your Deer Park/date photo here', special:'shirt' },
  { icon:'🎵', date:'The official teasing anthem', title:'Mujhe buddha mil gaya?', text:'Dating start hone ke baad tumne “Mai Kya Karu Haaye Mujhe Buddha Mil Gaya” bheja—sirf isliye kyunki main kabhi kabhi zyada mature act karta hoon aur meri taste supposedly old hai. Accha ji… itna bhi buddha nahi hoon.', photo:'Add a screenshot connected to the song', special:'song' },
];

const introLines = [
  ['Incoming call','Spider-Man? Emergency hai.'],
  ['Spider-Man','Kya hua?'],
  ['Mission Control','Pihu ka birthday aa gaya hai… aur tumhari story ke kuch pieces poore city mein bikhar gaye hain.'],
  ['Spider-Man','Toh har ek memory wapas laani padegi.'],
  ['Mission Control','Sab collect karo. Rooftop tak pahucho. Birthday girl ko wait mat karao.'],
];

export default function App(){
  const [screen,setScreen]=useState<'intro'|'story'|'game'|'roof'|'ending'>('intro');
  const [story,setStory]=useState(0);
  const [found,setFound]=useState<number[]>([]);
  const [active,setActive]=useState<number|null>(null);
  const [music,setMusic]=useState(false);
  const [pos,setPos]=useState({x:4,y:10});
  const complete=found.length===memories.length;
  const progress=useMemo(()=>Math.round(found.length/memories.length*100),[found]);

  function collect(i:number){ if(!found.includes(i)){ setFound(v=>[...v,i]); } setActive(i); }
  function move(dx:number,dy:number){ setPos(p=>({x:Math.max(2,Math.min(88,p.x+dx)),y:Math.max(5,Math.min(68,p.y+dy))})); }
  function reachGoal(){ if(complete){ setScreen('roof'); setTimeout(()=>setScreen('ending'),4200); } }

  return <div className="app">
    <div className="sky"><i/><i/><i/></div>
    <button className="music" onClick={()=>setMusic(!music)} aria-label="Toggle music">{music?<Music2/>:<VolumeX/>}</button>
    <AnimatePresence mode="wait">
      {screen==='intro'&&<motion.main className="screen" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} key="intro">
        <section className="glass heroCard">
          <p className="kicker">31 July · 11:58 PM</p>
          <h1>Pihu's Birthday<br/><span>Mission</span></h1>
          <p className="lead">Ek chhota sa web-slinging hero. Chhe memories. Aur city ke doosre side ek birthday girl.</p>
          <div className="duo"><div className="spidey">🕷️</div><Heart className="heart" fill="currentColor"/><div className="kitty">🐱</div></div>
          <button className="cta" onClick={()=>setScreen('story')}>Answer the call</button>
        </section>
      </motion.main>}

      {screen==='story'&&<motion.main className="screen" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} key="story">
        <section className="glass dialogue">
          <p className="kicker">{introLines[story][0]}</p>
          <h2>{introLines[story][1]}</h2>
          <div className="dots">{introLines.map((_,i)=><i className={i===story?'on':''} key={i}/>)}</div>
          <button className="cta" onClick={()=>story<introLines.length-1?setStory(story+1):setScreen('game')}>{story===introLines.length-1?'Start mission':'Continue'}</button>
        </section>
      </motion.main>}

      {screen==='game'&&<motion.main className="gameScreen" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} key="game">
        <div className="hud"><span>Mission: collect every memory</span><b>{found.length}/{memories.length}</b></div>
        <div className="meter"><i style={{width:`${progress}%`}}/></div>
        <section className="world">
          <div className="moon"/><div className="cloud one"/><div className="cloud two"/><div className="cityline"/>
          <motion.div className="player" animate={{left:`${pos.x}%`,bottom:`${pos.y}%`}}>🕷️</motion.div>
          {memories.map((m,i)=><button key={m.date} className={`orb ${found.includes(i)?'found':''}`} style={{left:`${13+i*13}%`,bottom:`${18+(i%2)*30}%`}} onClick={()=>collect(i)}>{m.icon}</button>)}
          <button className={`goal ${complete?'ready':''}`} onClick={reachGoal}>🐱<small>{complete?'Come here':'Find all memories'}</small></button>
          {complete&&<div className="readyText"><Sparkles/> Sab mil gaya. Ab Pihu tak pahucho.</div>}
        </section>
        <div className="controls"><button onClick={()=>move(-6,0)}>←</button><button onClick={()=>move(0,8)}>↑</button><button onClick={()=>move(0,-8)}>↓</button><button onClick={()=>move(6,0)}>→</button></div>
      </motion.main>}

      {screen==='roof'&&<motion.main className="screen" key="roof">
        <section className="rooftop"><div className="bigMoon"/>
          <motion.div className="reunion" initial={{gap:'180px'}} animate={{gap:'0px'}} transition={{delay:.8,duration:1.5}}><span>🕷️</span><span>🐱</span></motion.div>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}>Iss baar hero ne city save nahi ki… bas uss ladki tak wapas pahucha jo home jaisi feel hoti hai.</motion.p>
        </section>
      </motion.main>}

      {screen==='ending'&&<motion.main className="screen ending" initial={{opacity:0}} animate={{opacity:1}} key="ending">
        <section className="glass book"><p className="kicker">Mission complete</p><h2>Hamari story ke saare pieces.</h2>
          <div className="grid">{memories.map((m,i)=><article className="polaroid" key={m.date} style={{transform:`rotate(${i%2?2:-2}deg)`}}><div>{m.icon}<small>{m.photo}</small></div><b>{m.title}</b><em>{m.date}</em></article>)}</div>
          <section className="letter"><h3>For Pihu,</h3><p>Birthday letter yahan aayega. Abhi hum ise blank rakh rahe hain, kyunki ending tumhare exact words mein honi chahiye—not generic lines.</p></section>
        </section>
      </motion.main>}
    </AnimatePresence>

    <AnimatePresence>{active!==null&&<motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}>
      <motion.article className="memoryCard" initial={{scale:.75,rotate:-4}} animate={{scale:1,rotate:-1}} onClick={e=>e.stopPropagation()}>
        <div className="photoSlot">{memories[active].icon}<small>{memories[active].photo}</small></div>
        <p className="date">{memories[active].date}</p><h2>{memories[active].title}</h2><p>{memories[active].text}</p>
        {memories[active].special==='shirt'&&<div className="countdown">3… 2… 1… <b>GO ❤️</b></div>}
        {memories[active].special==='song'&&<div className="songChip">♪ Mai Kya Karu Haaye Mujhe Buddha Mil Gaya</div>}
        <button className="cta" onClick={()=>setActive(null)}>Keep swinging</button>
      </motion.article>
    </motion.div>}</AnimatePresence>
  </div>
}