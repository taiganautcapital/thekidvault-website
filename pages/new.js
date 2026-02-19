import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useProfiles } from '../lib/store';
import { C } from '../lib/data';

function Logo({ size = 90 }) {
  const id = `logo-new-${size}`;
  const op = (s) => {
    const cx=s/2,cy=s/2,r=s*0.46; let d="";
    for(let i=0;i<8;i++){const a=(Math.PI*2*i)/8-Math.PI/8;d+=(i===0?"M":"L")+(cx+r*Math.cos(a)).toFixed(1)+" "+(cy+r*Math.sin(a)).toFixed(1)+" ";}
    return d+"Z";
  };
  return (
    <svg width={size} height={size} viewBox="0 0 90 90">
      <defs>
        <linearGradient id={`g${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.gold}/><stop offset="100%" stopColor={C.goldDark}/>
        </linearGradient>
        <mask id={id}>
          <rect width="90" height="90" fill="white"/>
          <rect x="44" y="22" width="2" height="46" fill="black" opacity="0.6"/>
          <text x="31" y="58" textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="700" fill="black">K</text>
          <text x="59" y="58" textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="700" fill="black">V</text>
        </mask>
      </defs>
      <path d={op(90)} fill={`url(#g${id})`} mask={`url(#${id})`}/>
    </svg>
  );
}

export default function NewProfilePage() {
  const router = useRouter();
  const { profiles, setProfiles } = useProfiles();
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    const newProfiles = [...profiles, { name: name.trim(), stars: {} }];
    setProfiles(newProfiles);
    const newIdx = newProfiles.length - 1;
    sessionStorage.setItem('activeProfile', String(newIdx));
    const pending = sessionStorage.getItem('pendingChapter');
    if (pending !== null) {
      sessionStorage.removeItem('pendingChapter');
      router.push(`/chapter/${parseInt(pending) + 1}`);
    } else {
      router.push('/chapters');
    }
  };

  return (
    <>
      <Head>
        <title>New Learner – The Kid Vault</title>
      </Head>
      <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{maxWidth:400,width:"100%",textAlign:"center"}}>
          <Logo size={60}/>
          <h2 style={{color:"#fff",fontSize:26,margin:"16px 0 8px",fontFamily:"Georgia,serif"}}>Welcome, new learner!</h2>
          <p style={{color:C.goldLight,fontSize:15,marginBottom:32,fontFamily:"'Trebuchet MS',sans-serif"}}>What's your first name?</p>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your first name"
            onKeyDown={e => { if (e.key === 'Enter' && name.trim()) handleSave(); }}
            style={{padding:"14px 20px",borderRadius:12,border:`2px solid ${C.gold}`,fontSize:18,width:"100%",maxWidth:320,textAlign:"center",marginBottom:24,boxSizing:"border-box",background:"rgba(255,255,255,0.08)",color:"#fff",outline:"none",fontFamily:"Georgia,serif"}}
          />
          <br/>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            style={{background:name.trim()?C.gold:"rgba(255,255,255,0.1)",color:name.trim()?C.navy:"rgba(255,255,255,0.3)",border:"none",padding:"14px 32px",borderRadius:50,fontSize:15,fontWeight:700,cursor:name.trim()?"pointer":"default",fontFamily:"'Trebuchet MS',sans-serif",width:"100%",maxWidth:320,opacity:name.trim()?1:0.5}}
          >
            Let's Go! →
          </button>
          <br/>
          <button
            onClick={() => profiles.length > 0 ? router.push('/welcome') : router.push('/')}
            style={{background:"transparent",color:"rgba(255,255,255,0.5)",border:"none",padding:"14px 32px",borderRadius:50,fontSize:14,cursor:"pointer",fontFamily:"'Trebuchet MS',sans-serif",marginTop:16}}
          >
            ← Back
          </button>
        </div>
      </div>
    </>
  );
}
