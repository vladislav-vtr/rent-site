/*
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ show, onClose }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Dim background }
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal window }
          <motion.div
            className="fixed top-1/2 left-1/2 z-[100] w-[90%] max-w-md
                       -translate-x-1/2 -translate-y-1/2
                       bg-white rounded-3xl shadow-xl p-8"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.25 }}
          >
            {/* Logo }
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-indigo-600">BRAND</div>
              <p className="text-gray-500 text-sm mt-1">Войти или зарегистрироваться</p>
            </div>

            {/* Form }
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Имя</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Иван"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Фамилия</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Иванов"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Телефон</label>
                <input
                  type="tel"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="text-sm font-medium">E-mail</label>
                <input
                  type="email"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="example@mail.ru"
                />
              </div>

              {/* Submit }
              <button
                type="button"
                className="w-full py-3 mt-2 rounded-xl 
                           text-white font-semibold 
                           bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                           hover:opacity-90 transition"
              >
                Продолжить
              </button>
            </form>

            {/* Close }
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
            >
              ×
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
*/

import { useState } from "react";
import { X, Eye, EyeOff, Mail, Phone, Lock, User, ChevronRight, ArrowLeft } from "lucide-react";
 
const DEMO_USERS = [];
 
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Смягчённая проверка: минимум 7 цифр в любом формате
const phoneRe = /^[\d\s()+\-]{7,}$/;
 
function formatPhone(raw) {
  const d = raw.replace(/\D/g, "").replace(/^7/, "");
  let s = "+7";
  if (d.length > 0) s += " (" + d.slice(0, 3);
  if (d.length >= 4) s += ") " + d.slice(3, 6);
  if (d.length >= 7) s += "-" + d.slice(6, 8);
  if (d.length >= 9) s += "-" + d.slice(8, 10);
  return s;
}
 
function Field({ label, icon: Icon, error, rightEl, ...p }) {
  return (
    <div style={{ display:"grid", gap:4 }}>
      <label style={{ fontSize:11, fontWeight:600, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</label>
      <div style={{ position:"relative" }}>
        {Icon && (
          <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#9ca3af", display:"flex" }}>
            <Icon size={15} />
          </span>
        )}
        <input
          {...p}
          style={{
            width:"100%", boxSizing:"border-box",
            borderRadius:12, border: error ? "1.5px solid #f87171" : "1.5px solid #e5e7eb",
            background: "#f9fafb", padding:"10px 12px 10px",
            paddingLeft: Icon ? 34 : 12, paddingRight: rightEl ? 36 : 12,
            fontSize:14, color:"#1f2937",
            outline:"none", transition:"border 0.15s, box-shadow 0.15s",
          }}
          onFocus={e => { e.target.style.border="1.5px solid #818cf8"; e.target.style.background="#fff"; e.target.style.boxShadow="0 0 0 3px #e0e7ff"; }}
          onBlur={e  => { e.target.style.border= error ? "1.5px solid #f87171" : "1.5px solid #e5e7eb"; e.target.style.background="#f9fafb"; e.target.style.boxShadow="none"; }}
        />
        {rightEl && <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)" }}>{rightEl}</span>}
      </div>
      {error && <p style={{ fontSize:11, color:"#ef4444", margin:0 }}>{error}</p>}
    </div>
  );
}
 
function PassField({ label, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <Field
      label={label} icon={Lock}
      type={show ? "text" : "password"}
      value={value} onChange={onChange} error={error}
      placeholder="••••••••"
      rightEl={
        <button type="button" onClick={() => setShow(v => !v)}
          style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", display:"flex", padding:0 }}>
          {show ? <EyeOff size={15}/> : <Eye size={15}/>}
        </button>
      }
    />
  );
}
 
function GradBtn({ children, loading, onClick }) {
  return (
    <button onClick={onClick} type="button"
      style={{
        width:"100%", border:"none", cursor: loading ? "not-allowed" : "pointer",
        borderRadius:12, background:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",
        color:"#fff", fontWeight:700, fontSize:14, padding:"12px",
        boxShadow:"0 4px 15px rgba(99,102,241,0.35)",
        opacity: loading ? 0.7 : 1, transition:"opacity .15s, transform .1s",
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
      }}
      onMouseEnter={e => !loading && (e.target.style.opacity="0.88")}
      onMouseLeave={e => !loading && (e.target.style.opacity="1")}
    >
      {loading
        ? <span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.4)", borderTop:"2px solid #fff", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
        : children}
    </button>
  );
}
 
function ChoiceBtn({ icon: Icon, iconBg, iconColor, label, hoverBg, hoverBorder, hoverColor, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        width:"100%", border: hov ? `1.5px solid ${hoverBorder}` : "1.5px solid #e5e7eb",
        background: hov ? hoverBg : "#f9fafb", borderRadius:14, padding:"14px 16px",
        cursor:"pointer", transition:"all .15s",
      }}>
      <span style={{ display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ width:32, height:32, borderRadius:8, background:iconBg, display:"grid", placeItems:"center" }}>
          <Icon size={15} color={iconColor}/>
        </span>
        <span style={{ fontSize:14, fontWeight:600, color: hov ? hoverColor : "#374151" }}>{label}</span>
      </span>
      <ChevronRight size={16} color={ hov ? hoverColor : "#9ca3af"}/>
    </button>
  );
}
 
function LinkBtn({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{ background:"none", border:"none", cursor:"pointer", color:"#6366f1", fontWeight:600, fontSize:12, padding:0, textDecoration:"underline" }}>
      {children}
    </button>
  );
}
 
export default function AuthModal({ isOpen = true, onClose = () => {} }) {
  const [view, setView]       = useState("choice");
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
 
  const [loginId,  setLoginId]  = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [loginErr, setLoginErr] = useState({});
 
  const [reg, setReg]     = useState({ name:"", surname:"", phone:"", email:"", pwd:"", pwd2:"" });
  const [regErr, setRegErr] = useState({});
 
  const reset = () => {
    setView("choice"); setServerErr(""); setLoading(false);
    setLoginId(""); setLoginPwd(""); setLoginErr({});
    setReg({ name:"", surname:"", phone:"", email:"", pwd:"", pwd2:"" }); setRegErr({});
  };
 
  if (!isOpen) return null;
 
  const validateLogin = () => {
    const e = {};
    if (!loginId.trim()) e.id = "Введите e-mail или телефон";
    else if (!emailRe.test(loginId) && !phoneRe.test(loginId)) e.id = "Некорректный e-mail или телефон";
    if (!loginPwd) e.pwd = "Введите пароль";
    setLoginErr(e);
    return !Object.keys(e).length;
  };
 
  const handleLogin = async () => {
    if (!validateLogin()) return;
    setLoading(true); setServerErr("");
    await new Promise(r => setTimeout(r, 800));
 
    const found = DEMO_USERS.find(u => (u.email===loginId||u.phone===loginId) && u.pwd===loginPwd);
    setLoading(false);
    if (!found) { setServerErr("Неверный логин или пароль"); return; }
    setView("success");
  };
 
  const validateReg = () => {
    const e = {};
    if (!reg.name.trim())    e.name    = "Введите имя";
    if (!reg.surname.trim()) e.surname = "Введите фамилию";
    // Смягчённая проверка: достаточно 7+ цифр
    const digits = reg.phone.replace(/\D/g, "");
    if (digits.length < 7) e.phone = "Введите номер телефона (минимум 7 цифр)";
    if (!emailRe.test(reg.email)) e.email = "Некорректный e-mail";
    if (reg.pwd.length < 6)  e.pwd  = "Минимум 6 символов";
    if (reg.pwd !== reg.pwd2) e.pwd2 = "Пароли не совпадают";
    setRegErr(e);
    return !Object.keys(e).length;
  };
 
  const handleRegister = async () => {
    if (!validateReg()) return;
    setLoading(true); setServerErr("");
    await new Promise(r => setTimeout(r, 800));
 
    const exists = DEMO_USERS.find(u => u.email===reg.email || u.phone===reg.phone);
    if (exists) { setServerErr("Аккаунт с таким e-mail или телефоном уже существует"); setLoading(false); return; }
    DEMO_USERS.push({ ...reg });
    setLoading(false); setView("success");
  };
 
  const titles = { choice:"Личный кабинет", login:"Войти в аккаунт", register:"Создать аккаунт", success:"" };
 
  const views = {
    choice: (
      <div style={{ display:"grid", gap:12 }}>
        <ChoiceBtn icon={Lock} iconBg="#e0e7ff" iconColor="#6366f1"
          label="Войти в аккаунт" hoverBg="#eef2ff" hoverBorder="#818cf8" hoverColor="#6366f1"
          onClick={() => setView("login")} />
        <ChoiceBtn icon={User} iconBg="#f3e8ff" iconColor="#a855f7"
          label="Создать аккаунт" hoverBg="#faf5ff" hoverBorder="#c084fc" hoverColor="#a855f7"
          onClick={() => setView("register")} />
        <p style={{ textAlign:"center", fontSize:11, color:"#9ca3af", margin:0 }}>
          Продолжая, вы принимаете условия использования
        </p>
      </div>
    ),
 
    login: (
      <div style={{ display:"grid", gap:14 }}>
        <Field label="E-mail или телефон"
          icon={loginId.startsWith("+") || /^\d/.test(loginId) ? Phone : Mail}
          type="text" value={loginId} error={loginErr.id}
          placeholder="example@mail.ru или +7 (___) ___-__-__"
          onChange={e => { const v=e.target.value; setLoginId(/^\d/.test(v.replace("+",""))?formatPhone(v):v); setLoginErr(p=>({...p,id:""})); }}
        />
        <PassField label="Пароль" value={loginPwd}
          onChange={e=>{setLoginPwd(e.target.value);setLoginErr(p=>({...p,pwd:""}));}} error={loginErr.pwd} />
        {serverErr && (
          <div style={{ borderRadius:10, background:"#fef2f2", border:"1px solid #fecaca", color:"#dc2626", fontSize:12, padding:"8px 12px" }}>
            {serverErr}
          </div>
        )}
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <LinkBtn onClick={()=>{}}>Забыли пароль?</LinkBtn>
        </div>
        <GradBtn loading={loading} onClick={handleLogin}>Войти</GradBtn>
        <p style={{ textAlign:"center", fontSize:12, color:"#6b7280", margin:0 }}>
          Нет аккаунта?{" "}
          <LinkBtn onClick={()=>{setView("register");setServerErr("");}}>Создать</LinkBtn>
        </p>
      </div>
    ),
 
    register: (
      <div style={{ display:"grid", gap:12 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Field label="Имя" icon={User} value={reg.name} error={regErr.name} placeholder="Иван"
            onChange={e=>{setReg(p=>({...p,name:e.target.value}));setRegErr(p=>({...p,name:""}));}} />
          <Field label="Фамилия" value={reg.surname} error={regErr.surname} placeholder="Иванов"
            onChange={e=>{setReg(p=>({...p,surname:e.target.value}));setRegErr(p=>({...p,surname:""}));}} />
        </div>
        <Field label="Телефон" icon={Phone} value={reg.phone} error={regErr.phone}
          placeholder="+7 (___) ___-__-__"
          onChange={e=>{setReg(p=>({...p,phone:formatPhone(e.target.value)}));setRegErr(p=>({...p,phone:""}));}} />
        <Field label="E-mail" icon={Mail} type="email" value={reg.email} error={regErr.email}
          placeholder="example@mail.ru"
          onChange={e=>{setReg(p=>({...p,email:e.target.value}));setRegErr(p=>({...p,email:""}));}} />
        <PassField label="Пароль" value={reg.pwd}
          onChange={e=>{setReg(p=>({...p,pwd:e.target.value}));setRegErr(p=>({...p,pwd:""}));}} error={regErr.pwd} />
        <PassField label="Повторите пароль" value={reg.pwd2}
          onChange={e=>{setReg(p=>({...p,pwd2:e.target.value}));setRegErr(p=>({...p,pwd2:""}));}} error={regErr.pwd2} />
        {serverErr && (
          <div style={{ borderRadius:10, background:"#fef2f2", border:"1px solid #fecaca", color:"#dc2626", fontSize:12, padding:"8px 12px" }}>
            {serverErr}
          </div>
        )}
        <GradBtn loading={loading} onClick={handleRegister}>Создать аккаунт</GradBtn>
        <p style={{ textAlign:"center", fontSize:12, color:"#6b7280", margin:0 }}>
          Уже есть аккаунт?{" "}
          <LinkBtn onClick={()=>{setView("login");setServerErr("");}}>Войти</LinkBtn>
        </p>
      </div>
    ),
 
    success: (
      <div style={{ textAlign:"center", padding:"16px 0", display:"grid", gap:16, justifyItems:"center" }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#a855f7)", display:"grid", placeItems:"center", boxShadow:"0 8px 24px rgba(99,102,241,.3)" }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div>
          <p style={{ fontWeight:700, fontSize:18, color:"#1f2937", margin:0 }}>Добро пожаловать!</p>
          <p style={{ fontSize:13, color:"#6b7280", marginTop:4 }}>Вы успешно вошли в аккаунт</p>
        </div>
        <button type="button" onClick={()=>{reset();onClose();}}
          style={{ background:"none", border:"none", cursor:"pointer", color:"#6366f1", fontWeight:600, fontSize:14, textDecoration:"underline" }}>
          Продолжить →
        </button>
      </div>
    ),
  };
 
  return (
    <>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div onClick={e => e.target===e.currentTarget && onClose()}
        style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center",
          padding:16, background:"rgba(0,0,0,.45)", backdropFilter:"blur(4px)" }}>
        <div style={{ width:"100%", maxWidth:420, background:"#fff", borderRadius:24,
          boxShadow:"0 25px 60px rgba(0,0,0,.2)", maxHeight:"90vh", overflowY:"auto" }}>
 
          {/* Header */}
          <div style={{ position:"relative", padding:"22px 24px 16px", borderBottom:"1px solid #f3f4f6", textAlign:"center" }}>
            {(view==="login"||view==="register") && (
              <button type="button" onClick={()=>{setView("choice");setServerErr("");}}
                style={{ position:"absolute", left:16, top:18, width:32, height:32, borderRadius:10,
                  background:"#f3f4f6", border:"none", cursor:"pointer", display:"grid", placeItems:"center" }}>
                <ArrowLeft size={15} color="#4b5563"/>
              </button>
            )}
            <div style={{ fontWeight:800, fontSize:18, background:"linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              BRAND
            </div>
            {titles[view] && <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"4px 0 0" }}>{titles[view]}</p>}
            <button type="button" onClick={()=>{reset();onClose();}}
              style={{ position:"absolute", right:16, top:18, width:32, height:32, borderRadius:10,
                background:"#f3f4f6", border:"none", cursor:"pointer", display:"grid", placeItems:"center" }}>
              <X size={15} color="#4b5563"/>
            </button>
          </div>
 
          {/* Body */}
          <div style={{ padding:"20px 24px 24px" }}>
            {views[view]}
          </div>
        </div>
      </div>
    </>
  );
}