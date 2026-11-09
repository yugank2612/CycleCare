import React, { useEffect, useMemo, useState } from "react";
import {
  Activity, CalendarDays, Heart, ShoppingBag, Stethoscope, BookOpen,
  ShieldCheck, Settings, Sparkles, Plus, ChevronLeft, ChevronRight,
  Droplets, Moon, Sun, Smile, CircleHelp, LogOut, Download, Trash2,
  Menu, X, ArrowUpRight, LockKeyhole, CheckCircle2, AlertCircle
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";
import { addDays, cycleSummary, dateKey, monthCells, parseLocalDate } from "./lib/cycle";

const NAV = [
  ["Overview", "home", Activity], ["Cycle tracker", "tracker", CalendarDays],
  ["My journal", "journal", Heart], ["Care shop", "shop", ShoppingBag],
  ["Find a doctor", "doctors", Stethoscope], ["Learn", "learn", BookOpen],
  ["Privacy", "privacy", ShieldCheck]
];
const products = [
  {icon:"🌷",name:"Sanitary pads",desc:"Disposable options in different sizes and absorbencies.",tag:"Everyday care",price:"Varies"},
  {icon:"🌿",name:"Reusable cloth pads",desc:"Washable option. Follow care, washing and drying instructions.",tag:"Reusable",price:"Varies"},
  {icon:"🌸",name:"Menstrual cups",desc:"Reusable internal product; read sizing and safe-use instructions.",tag:"Reusable",price:"Varies"},
  {icon:"🩲",name:"Period underwear",desc:"Absorbent underwear offered in different absorbencies.",tag:"Comfort",price:"Varies"},
  {icon:"🔥",name:"Heating pad",desc:"External warmth may help some people with cramps.",tag:"Comfort",price:"Varies"},
  {icon:"👜",name:"Period pouch",desc:"A small organiser for carrying period-care essentials.",tag:"Essentials",price:"Varies"}
];
const education = [
  ["Understanding your cycle","A menstrual cycle is counted from the first day of one period to the first day of the next. Cycle length and bleeding patterns can vary, especially in the first years after periods begin."],
  ["Period hygiene","Wash hands before and after changing products. Change products according to their packaging instructions. Clean reusable products as directed and avoid scented internal washes or douching."],
  ["Choosing products","Pads, tampons, cups and period underwear are options. Comfort, access, personal preference and correct use matter. No one product is right for everyone."],
  ["PMS and symptoms","Some people notice changes in mood, sleep, appetite or physical comfort before a period. Keeping a journal may help you explain recurring symptoms to a clinician."],
  ["PCOS and endometriosis","These are different health conditions that require assessment by a qualified healthcare professional. A period tracker cannot diagnose either condition."],
  ["When to get medical help","Seek prompt medical advice for severe or worsening pain, very heavy bleeding, fainting, fever, or symptoms that disrupt daily activities. For an immediate emergency, contact local emergency services."]
];

function App() {
  const [page,setPage] = useState("home");
  const [session,setSession] = useState(null);
  const [profile,setProfile] = useState(null);
  const [loading,setLoading] = useState(Boolean(supabase));
  const [authMode,setAuthMode] = useState("signin");
  const [authEmail,setAuthEmail] = useState("");
  const [authPassword,setAuthPassword] = useState("");
  const [authMessage,setAuthMessage] = useState("");
  const [mobileNav,setMobileNav] = useState(false);
  const [lastPeriod,setLastPeriod] = useState("");
  const [cycleLength,setCycleLength] = useState(28);
  const [periodLength,setPeriodLength] = useState(5);
  const [entries,setEntries] = useState([]);
  const [cart,setCart] = useState([]);
  const [month,setMonth] = useState(new Date(new Date().getFullYear(),new Date().getMonth(),1));
  const [log,setLog] = useState({entry_date:dateKey(new Date()),flow:"Not bleeding",symptoms:[],mood:"Okay",notes:""});
  const [busy,setBusy] = useState(false);
  const [notice,setNotice] = useState("");

  const summary = useMemo(()=>cycleSummary(lastPeriod,cycleLength,periodLength),[lastPeriod,cycleLength,periodLength]);
  const isCloud = Boolean(session && supabase);

  useEffect(()=>{
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({data})=>{setSession(data.session);setLoading(false);});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{setSession(next);});
    return ()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if (!session || !supabase) { setProfile(null); setEntries([]); return; }
    let active=true;
    (async()=>{
      const [{data:p},{data:e}] = await Promise.all([
        supabase.from("profiles").select("display_name,last_period_start,cycle_length,period_length").eq("id",session.user.id).maybeSingle(),
        supabase.from("cycle_entries").select("id,entry_date,flow,symptoms,mood,notes").order("entry_date",{ascending:false}).limit(90)
      ]);
      if(!active)return;
      if(p){setProfile(p);setLastPeriod(p.last_period_start||"");setCycleLength(p.cycle_length||28);setPeriodLength(p.period_length||5);}
      if(e)setEntries(e);
    })().catch(()=>setNotice("Could not load your saved data. Check your connection and try again."));
    return ()=>{active=false;};
  },[session]);

  useEffect(()=>{
    if (!session) {
      const local=JSON.parse(localStorage.getItem("cyclecare-demo")||"{}");
      setLastPeriod(local.lastPeriod||"");setCycleLength(local.cycleLength||28);setPeriodLength(local.periodLength||5);
      setEntries(local.entries||[]);setCart(local.cart||[]);
    }
  },[session]);

  function localSave(next={}) {
    const data={lastPeriod,cycleLength,periodLength,entries,cart,...next};
    localStorage.setItem("cyclecare-demo",JSON.stringify(data));
  }
  function flash(message){setNotice(message);window.clearTimeout(flash.timer);flash.timer=window.setTimeout(()=>setNotice(""),3600);}
  async function saveCycle(){
    if(!lastPeriod){flash("Choose the first day of your most recent period.");return;}
    if(cycleLength<15||cycleLength>45||periodLength<1||periodLength>10){flash("Please check the cycle and period length values.");return;}
    if(isCloud){
      const {error}=await supabase.from("profiles").upsert({id:session.user.id,last_period_start:lastPeriod,cycle_length:Number(cycleLength),period_length:Number(periodLength)});
      if(error){flash("Could not save cycle settings. Please try again.");return;}
    } else localSave();
    flash("Cycle settings saved.");
  }
  async function saveEntry(){
    if(!log.entry_date){flash("Choose an entry date.");return;}
    if(isCloud){
      const {data,error}=await supabase.from("cycle_entries").insert({...log,user_id:session.user.id}).select("id,entry_date,flow,symptoms,mood,notes").single();
      if(error){flash("Entry could not be saved. Please try again.");return;}
      setEntries(old=>[data,...old]);
    } else {
      const next=[{...log,id:crypto.randomUUID()},...entries];setEntries(next);localSave({entries:next});
    }
    setLog({...log,notes:"",symptoms:[]});flash("Journal entry saved.");
  }
  async function removeEntry(id){
    if(isCloud){const {error}=await supabase.from("cycle_entries").delete().eq("id",id);if(error){flash("Could not delete entry.");return;}}
    const next=entries.filter(x=>x.id!==id);setEntries(next);if(!isCloud)localSave({entries:next});flash("Entry deleted.");
  }
  async function signIn(e){
    e.preventDefault();setBusy(true);setAuthMessage("");
    if(!supabase){setAuthMessage("Cloud sign-in is not configured. Use demo mode or follow the Supabase setup guide.");setBusy(false);return;}
    const action=authMode==="signup"?supabase.auth.signUp({email:authEmail,password:authPassword}):supabase.auth.signInWithPassword({email:authEmail,password:authPassword});
    const {error}=await action;setAuthMessage(error?.message|| (authMode==="signup"?"Check your email to confirm your account.":"Signed in."));setBusy(false);
  }
  async function signOut(){await supabase?.auth.signOut();setSession(null);setPage("home");}
  function addCart(i){const next=[...new Set([...cart,i])];setCart(next);if(!isCloud)localSave({cart:next});flash("Saved to your care list.");}
  function exportData(){
    const payload={exportedAt:new Date().toISOString(),cycle:{lastPeriod,cycleLength,periodLength},journal:entries};
    const a=document.createElement("a"),url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));
    a.href=url;a.download="cyclecare-data-export.json";a.click();URL.revokeObjectURL(url);
  }
  async function deleteData(){
    if(!window.confirm("Delete your CycleCare journal and cycle settings? This cannot be undone."))return;
    if(isCloud){
      const {error}=await supabase.from("cycle_entries").delete().eq("user_id",session.user.id);
      if(error){flash("Could not delete all data. Contact support or try again.");return;}
      const {error:profileError}=await supabase.from("profiles").update({last_period_start:null,cycle_length:28,period_length:5}).eq("id",session.user.id);
      if(profileError){flash("Journal deleted, but profile settings could not be reset.");return;}
    } else localStorage.removeItem("cyclecare-demo");
    setEntries([]);setLastPeriod("");setCycleLength(28);setPeriodLength(5);flash("CycleCare data deleted.");
  }
  function toggleSymptom(s){setLog(old=>({...old,symptoms:old.symptoms.includes(s)?old.symptoms.filter(x=>x!==s):[...old.symptoms,s]}));}

  if(loading)return <div className="loading">Loading CycleCare…</div>;
  const currentPage = NAV.find(n=>n[1]===page);
  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav?"open":""}`}>
      <div className="brand"><div className="brand-mark">✿</div><div><b>CycleCare</b><small>Your cycle, your care</small></div><button className="mobile-close icon-btn" onClick={()=>setMobileNav(false)}><X size={18}/></button></div>
      <div className="nav-label">YOUR SPACE</div>
      <nav>{NAV.map(([label,id,Icon])=><button key={id} className={page===id?"nav-item active":"nav-item"} onClick={()=>{setPage(id);setMobileNav(false);}}><Icon size={18}/><span>{label}</span>{id==="tracker"&&<span className="nav-dot"/>}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="privacy-mini"><ShieldCheck size={18}/><div><b>Your privacy matters</b><small>{isCloud?"Secure account mode":"Demo data stays in this browser"}</small></div></div>
        {session?<button className="nav-item" onClick={signOut}><LogOut size={18}/>Sign out</button>:<button className="nav-item" onClick={()=>setPage("privacy")}><Settings size={18}/>Account & privacy</button>}
        <small className="version">CYCLECARE · BETA 2.0</small>
      </div>
    </aside>
    {mobileNav&&<div className="scrim" onClick={()=>setMobileNav(false)}/>}
    <main className="main">
      <header className="topbar"><button className="icon-btn menu-btn" onClick={()=>setMobileNav(true)}><Menu/></button><div className="crumb">Your space <span>/</span> {currentPage?.[0]}</div><div className="top-actions"><span className="safe-chip"><span/>Private wellness space</span><div className="avatar">C</div></div></header>
      <div className="content">
        {notice&&<div className="toast"><CheckCircle2 size={17}/>{notice}<button onClick={()=>setNotice("")}><X size={15}/></button></div>}
        {!isCloud&&<div className="demo-banner"><Sparkles size={16}/><span><b>Preview mode</b> — information stays in this browser. Connect Supabase to enable secure accounts and cloud sync.</span><button onClick={()=>setPage("privacy")}>Set up <ArrowUpRight size={14}/></button></div>}
        {page==="home"&&<Home summary={summary} lastPeriod={lastPeriod} entries={entries} setPage={setPage} />}
        {page==="tracker"&&<Tracker lastPeriod={lastPeriod} setLastPeriod={setLastPeriod} cycleLength={cycleLength} setCycleLength={setCycleLength} periodLength={periodLength} setPeriodLength={setPeriodLength} summary={summary} month={month} setMonth={setMonth} onSave={saveCycle}/>}
        {page==="journal"&&<Journal log={log} setLog={setLog} toggleSymptom={toggleSymptom} saveEntry={saveEntry} entries={entries} removeEntry={removeEntry}/>}
        {page==="shop"&&<Shop cart={cart} addCart={addCart}/>}
        {page==="doctors"&&<Doctors/>}
        {page==="learn"&&<Learn/>}
        {page==="privacy"&&<Privacy isCloud={isCloud} session={session} authMode={authMode} setAuthMode={setAuthMode} authEmail={authEmail} setAuthEmail={setAuthEmail} authPassword={authPassword} setAuthPassword={setAuthPassword} authMessage={authMessage} signIn={signIn} busy={busy} exportData={exportData} deleteData={deleteData}/>}
      </div>
      <footer>CycleCare is an educational wellness tool, not a medical service. <span>Made with care ♡</span></footer>
    </main>
  </div>;
}

function PageHeading({eyebrow,title,desc,action}){return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{desc&&<p>{desc}</p>}</div>{action}</div>}
function StatCard({icon:Icon,label,value,sub,tint="pink"}){return <div className="stat-card"><div className={`stat-icon ${tint}`}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-sub">{sub}</div></div>}
function Home({summary,lastPeriod,entries,setPage}){
 const today=new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});
 return <><PageHeading eyebrow="YOUR WELLNESS OVERVIEW" title="A little care goes a long way." desc={`${today} · Take a moment to check in with yourself.`}/>
 <div className="welcome-grid"><div className="welcome-card"><div className="welcome-copy"><span className="soft-label">A GENTLER WAY TO TRACK</span><h2>Your body has its own rhythm.<br/><em>Get to know it.</em></h2><p>Keep track of your cycle, notice patterns and find helpful information — all in one calm space.</p><button className="btn-primary" onClick={()=>setPage("tracker")}>Explore my cycle <ArrowUpRight size={16}/></button></div><div className="flower-art"><div className="orb orb-one"/><div className="orb orb-two"/><div className="flower">✿</div><span className="art-caption">care, every cycle</span></div></div>
 <div className="cycle-card"><div className="card-top"><span>YOUR CYCLE</span><span className="live-dot">● OVERVIEW</span></div><div className="cycle-ring"><div><b>{summary&&summary.day>0?summary.day:"—"}</b><small>cycle day</small></div></div><h3>{summary?(summary.inPeriod?"Period phase":"Cycle in progress"):"Your tracker is waiting"}</h3><p>{summary?`Estimated next period ${summary.daysUntil>=0?`in ${summary.daysUntil} days`:"may be due"}.`:"Add your last period date to get started."}</p><button className="btn-light" onClick={()=>setPage("tracker")}>{summary?"View calendar":"Set up tracker"} <ArrowUpRight size={15}/></button></div></div>
 <div className="stats-grid"><StatCard icon={CalendarDays} label="Cycle length" value={lastPeriod?"~28 days":"—"} sub="Your saved cycle setting" tint="lavender"/><StatCard icon={Heart} label="Journal entries" value={entries.length} sub="Personal check-ins saved" tint="peach"/><StatCard icon={ShieldCheck} label="Your data" value="Private" sub="You control your information" tint="mint"/></div>
 <div className="section-head"><div><span className="eyebrow">A LITTLE SUPPORT</span><h2>What would help today?</h2></div></div><div className="quick-grid"><Quick icon={Droplets} title="Track my period" text="Record dates and cycle details." click={()=>setPage("tracker")}/><Quick icon={Heart} title="Check in with myself" text="Log symptoms, mood and notes." click={()=>setPage("journal")}/><Quick icon={BookOpen} title="Learn something new" text="Explore menstrual health basics." click={()=>setPage("learn")}/></div>
 <div className="gentle-note"><Sparkles size={18}/><div><b>A gentle reminder</b><p>Every body is different. Your cycle does not need to match someone else's to be normal for you.</p></div></div></>;
}
function Quick({icon:Icon,title,text,click}){return <button className="quick-card" onClick={click}><span><Icon size={20}/></span><b>{title}</b><small>{text}</small><ArrowUpRight className="quick-arrow" size={16}/></button>}
function Tracker({lastPeriod,setLastPeriod,cycleLength,setCycleLength,periodLength,setPeriodLength,summary,month,setMonth,onSave}){
 const cells=monthCells(month.getFullYear(),month.getMonth());
 const first=lastPeriod?parseLocalDate(lastPeriod):null;
 const next=first?addDays(first,Number(cycleLength)):null;
 return <><PageHeading eyebrow="GET TO KNOW YOUR RHYTHM" title="Your cycle tracker" desc="A simple way to record your period and understand your own patterns."/>
 <div className="tracker-layout"><section className="panel"><div className="panel-heading"><div><span className="eyebrow">YOUR CYCLE SETTINGS</span><h2>Let's start with the basics</h2></div><div className="round-icon"><CalendarDays/></div></div><div className="form-grid"><Field label="First day of your last period"><input type="date" value={lastPeriod} onChange={e=>setLastPeriod(e.target.value)}/></Field><Field label="Typical cycle length"><div className="input-suffix"><input type="number" min="15" max="45" value={cycleLength} onChange={e=>setCycleLength(Number(e.target.value))}/><span>days</span></div></Field><Field label="Typical period duration"><div className="input-suffix"><input type="number" min="1" max="10" value={periodLength} onChange={e=>setPeriodLength(Number(e.target.value))}/><span>days</span></div></Field></div><button className="btn-primary" onClick={onSave}>Save my settings <CheckCircle2 size={16}/></button><p className="helper">Cycle length is counted from the first day of one period to the first day of the next.</p></section>
 <section className="panel estimate-panel"><span className="eyebrow">YOUR ESTIMATE</span><div className="estimate-number">{summary?summary.daysUntil>=0?summary.daysUntil:"—":"—"}<small>{summary&&summary.daysUntil>=0?"days":" "}</small></div><h3>{summary?"Until your estimated next period":"Your cycle estimate"}</h3><p>{summary?`Estimated date: ${new Date(summary.nextDate+"T00:00:00").toLocaleDateString(undefined,{month:"long",day:"numeric"})}`:"Add your last period date to see an estimate."}</p><div className="estimate-foot"><CircleHelp size={16}/> Predictions are estimates, not guarantees.</div></section></div>
 <section className="panel calendar-panel"><div className="calendar-title"><div><span className="eyebrow">YOUR MONTH</span><h2>{month.toLocaleDateString(undefined,{month:"long",year:"numeric"})}</h2></div><div className="month-arrows"><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}><ChevronLeft/></button><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}><ChevronRight/></button></div></div><div className="calendar-grid">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div className="weekday" key={d}>{d}</div>)}{cells.map((d,i)=>{if(!d)return <div key={`blank-${i}`}/>;const isPastPeriod=first&&d>=first&&d<addDays(first,periodLength);const isPred=next&&d>=next&&d<addDays(next,periodLength);const today=dateKey(d)===dateKey(new Date());return <div key={i} className={`calendar-day ${isPastPeriod?"period-day":""} ${isPred?"predicted-day":""} ${today?"today":""}`}>{d.getDate()}</div>})}</div><div className="legend"><span><i className="legend-period"/>Recorded period</span><span><i className="legend-predicted"/>Estimated period</span><span><i className="legend-today"/>Today</span></div></section>
 <div className="info-strip"><ShieldCheck size={18}/><p>Cycle predictions can be less reliable when cycles vary, after a recent change in routine, or during the first years after periods begin. Do not use predictions to prevent pregnancy.</p></div></>;
}
function Field({label,children}){return <label className="field"><span>{label}</span>{children}</label>}
const symptoms=["Cramps","Headache","Bloating","Fatigue","Acne","Nausea","Tender breasts","Backache"];
function Journal({log,setLog,toggleSymptom,saveEntry,entries,removeEntry}){
 return <><PageHeading eyebrow="LISTEN TO YOUR BODY" title="Your health journal" desc="A private space to note how you feel. Patterns can help you explain concerns to a healthcare professional."/>
 <div className="journal-layout"><section className="panel"><div className="panel-heading"><div><span className="eyebrow">NEW CHECK-IN</span><h2>How are you feeling?</h2></div><div className="round-icon"><Heart/></div></div><Field label="Date"><input type="date" value={log.entry_date} onChange={e=>setLog({...log,entry_date:e.target.value})}/></Field><Field label="Flow"><select value={log.flow} onChange={e=>setLog({...log,flow:e.target.value})}>{["Not bleeding","Spotting","Light","Medium","Heavy"].map(x=><option key={x}>{x}</option>)}</select></Field><div className="field"><span>Symptoms (choose any that apply)</span><div className="symptom-list">{symptoms.map(s=><button key={s} className={log.symptoms.includes(s)?"symptom selected":"symptom"} onClick={()=>toggleSymptom(s)}>{s}</button>)}</div></div><Field label="Mood"><select value={log.mood} onChange={e=>setLog({...log,mood:e.target.value})}>{["Okay","Happy","Calm","Anxious","Irritable","Low","Tired"].map(x=><option key={x}>{x}</option>)}</select></Field><Field label="Anything else? (optional)"><textarea rows="3" maxLength="1000" value={log.notes} onChange={e=>setLog({...log,notes:e.target.value})} placeholder="Add a note for yourself…"/></Field><button className="btn-primary" onClick={saveEntry}>Save check-in <Heart size={16}/></button></section>
 <section className="panel entries-panel"><div className="panel-heading"><div><span className="eyebrow">YOUR NOTES</span><h2>Recent check-ins</h2></div><span className="count-pill">{entries.length} saved</span></div>{entries.length?entries.map(e=><div className="entry" key={e.id}><div className="entry-date">{new Date(e.entry_date+"T00:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric"})}</div><div className="entry-body"><b>{e.flow} · {e.mood}</b><p>{(e.symptoms||[]).join(" · ")||"No symptoms noted"}</p>{e.notes&&<small>{e.notes}</small>}</div><button className="icon-btn delete-btn" aria-label="Delete entry" onClick={()=>removeEntry(e.id)}><Trash2 size={16}/></button></div>):<div className="empty-state"><div>♡</div><b>Your check-ins will appear here</b><p>Start with a small note about how you're feeling today.</p></div>}</section></div></>;
}
function Shop({cart,addCart}){return <><PageHeading eyebrow="THOUGHTFUL PERIOD ESSENTIALS" title="A little care, ready when you need it." desc="Explore common menstrual-care product categories. This catalogue is a demo; it does not sell products or process payments."/><div className="shop-grid">{products.map((p,i)=><article className="product-card" key={p.name}><div className="product-visual"><span>{p.icon}</span><i>{p.tag}</i></div><div className="product-copy"><h3>{p.name}</h3><p>{p.desc}</p><div className="product-bottom"><b>{p.price}</b><button className="btn-light" onClick={()=>addCart(i)}>{cart.includes(i)?"Saved ✓":"Save item"}</button></div></div></article>)}</div><div className="panel saved-list"><div><span className="eyebrow">YOUR CARE LIST</span><h2>Saved essentials <span className="count-pill">{cart.length}</span></h2></div>{cart.length?cart.map(i=><span className="saved-chip" key={i}>{products[i].icon} {products[i].name}</span>):<p className="helper">Save products you're interested in and they'll appear here.</p>}</div></>}
function Doctors(){return <><PageHeading eyebrow="PROFESSIONAL SUPPORT" title="You deserve good care." desc="Find qualified support for menstrual and reproductive health questions."/><div className="notice-card"><AlertCircle size={20}/><div><b>Important</b><p>CycleCare does not provide medical consultations. The links below are starting points only, not endorsements or verified appointment availability. Check clinician credentials and clinic details independently.</p></div></div><div className="doctor-grid"><article className="panel doctor-card"><div className="doctor-icon">🩺</div><span className="eyebrow">SPECIALIST CARE</span><h2>Gynecologist</h2><p>A doctor specialising in reproductive and menstrual health. Consider an appointment for persistent cycle changes, severe pain or unusual bleeding.</p><a className="btn-light link-btn" href="https://www.practo.com/" target="_blank" rel="noreferrer">Explore clinician listings <ArrowUpRight size={15}/></a></article><article className="panel doctor-card"><div className="doctor-icon">🏥</div><span className="eyebrow">PUBLIC HEALTH</span><h2>Government health services</h2><p>Public hospitals and health centres may provide reproductive health information and services. Confirm local access and opening hours.</p><a className="btn-light link-btn" href="https://mohfw.gov.in/" target="_blank" rel="noreferrer">Ministry of Health, India <ArrowUpRight size={15}/></a></article></div><section className="panel appointment-panel"><span className="eyebrow">BEFORE YOUR VISIT</span><h2>Make the most of your appointment</h2><ul className="check-list"><li>Write down the dates of recent periods.</li><li>Note symptoms, when they happen and how they affect daily life.</li><li>Bring questions and a list of medicines or supplements.</li><li>Ask about privacy, fees and follow-up arrangements.</li></ul></section></>}
function Learn(){return <><PageHeading eyebrow="KNOWLEDGE IS CARE" title="Understand your body, one step at a time." desc="Clear, supportive menstrual-health basics for personal wellness users and the people who support them. Content requires qualified clinical review before public launch."/><div className="learn-grid">{education.map(([title,body],i)=><article className="panel learn-card" key={title}><div className="learn-number">0{i+1}</div><h2>{title}</h2><p>{body}</p></article>)}</div><section className="panel appointment-panel"><span className="eyebrow">FOR SUPPORTIVE CAREGIVERS</span><h2>Support without taking control</h2><p className="body-copy">A parent, guardian or trusted supporter can help by listening without judgement, asking what support is wanted, helping access period-care supplies when requested, and supporting access to a qualified healthcare professional. Respect the person's privacy and do not demand access to their cycle dates, journal or account.</p><div className="safeguard-grid"><Safeguard title="Listen first" text="Ask what would be helpful instead of assuming."/><Safeguard title="Respect privacy" text="Personal tracking and journal information belong to the person who entered them."/><Safeguard title="Offer practical support" text="Help with supplies, comfort and healthcare access when invited."/><Safeguard title="Avoid shame" text="Use calm, factual language. Menstruation is a normal health topic."/></div></section><div className="info-strip"><CircleHelp size={18}/><p>For personal medical advice, talk with a qualified healthcare professional. This content cannot diagnose a condition or replace a consultation.</p></div></>}
function Privacy({isCloud,session,authMode,setAuthMode,authEmail,setAuthEmail,authPassword,setAuthPassword,authMessage,signIn,busy,exportData,deleteData}){
 return <><PageHeading eyebrow="YOUR INFORMATION, YOUR CHOICE" title="Privacy comes first." desc="Menstrual and symptom information is sensitive. CycleCare is designed to collect as little as possible and keep control with the user."/><div className="privacy-grid"><section className="panel"><div className="panel-heading"><div><span className="eyebrow">STORAGE STATUS</span><h2>{isCloud?"Cloud account connected":"Local preview mode"}</h2></div><div className="round-icon"><LockKeyhole/></div></div><p className="body-copy">{isCloud?"Your account is connected. Database row-level security policies restrict each user to their own profile and journal rows.":"Your demo cycle settings and journal are saved in this browser only. They are not synced between devices. Anyone with access to this browser profile may be able to access them."}</p><div className="security-line"><CheckCircle2 size={17}/><span>{isCloud?"Account session active":"No server account configured"}</span></div><div className="security-line"><CheckCircle2 size={17}/><span>Export and deletion controls available</span></div></section>
 <section className="panel"><span className="eyebrow">ACCOUNT</span><h2>{session?"Signed in":"Enable secure account sync"}</h2>{session?<p className="body-copy">Signed in as {session.user.email}. Use Sign out in the sidebar when finished.</p>:<><p className="body-copy">Connect a Supabase project to enable email/password sign-in and cloud sync. Use a unique password and enable email confirmation in Supabase.</p><form onSubmit={signIn}><div className="auth-switch"><button type="button" className={authMode==="signin"?"selected":""} onClick={()=>setAuthMode("signin")}>Sign in</button><button type="button" className={authMode==="signup"?"selected":""} onClick={()=>setAuthMode("signup")}>Create account</button></div><Field label="Email"><input type="email" required autoComplete="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="you@example.com"/></Field><Field label="Password"><input type="password" required minLength="10" autoComplete={authMode==="signup"?"new-password":"current-password"} value={authPassword} onChange={e=>setAuthPassword(e.target.value)} placeholder="At least 10 characters"/></Field><button className="btn-primary" disabled={busy||!isSupabaseConfigured}>{busy?"Please wait…":authMode==="signup"?"Create account":"Sign in"} <ArrowUpRight size={15}/></button>{!isSupabaseConfigured&&<p className="helper">Supabase is not configured yet. See README for setup instructions.</p>}{authMessage&&<p className="auth-message">{authMessage}</p>}</form></>}</section></div>
 <section className="panel data-controls"><span className="eyebrow">DATA CONTROLS</span><h2>Take your information with you.</h2><p className="body-copy">Export a copy for your own records, or delete CycleCare data. Deleting the account itself is a separate action handled through your authentication provider.</p><div className="button-row"><button className="btn-light" onClick={exportData}><Download size={16}/> Export my data</button><button className="btn-danger" onClick={deleteData}><Trash2 size={16}/> Delete cycle & journal data</button></div></section>
 <section className="panel safeguards"><span className="eyebrow">DESIGN COMMITMENTS</span><div className="safeguard-grid"><Safeguard title="Private by default" text="No public profiles or social sharing of cycle data."/><Safeguard title="No ad tracking" text="Do not sell intimate health information or use it for ad targeting."/><Safeguard title="Clear consent" text="Explain collection and purpose before collecting sensitive information."/><Safeguard title="Safe for younger users" text="Design age-appropriate onboarding and obtain expert legal/privacy review before serving minors."/><Safeguard title="Minimal collection" text="Avoid collecting location, contacts or unnecessary identity details."/><Safeguard title="Clinical review" text="Have qualified clinicians review educational and safety content." /></div></section></>;
}
function Safeguard({title,text}){return <div className="safeguard"><ShieldCheck size={17}/><div><b>{title}</b><p>{text}</p></div></div>}

export default App;
