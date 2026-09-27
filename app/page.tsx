'use client';
import { useEffect, useMemo, useState } from 'react';
import { streak, dayKey } from '../lib/streak.mjs';
type Entry = { id: string; project: string; update: string; createdAt: string };
const sample: Entry[] = [{ id: 'a', project: 'AI Portfolio', update: 'Shipped the first public preview and ran the basic checks.', createdAt: '2026-09-27T12:00:00Z' }, { id: 'b', project: 'AI Portfolio', update: 'Added tests and documentation for the core workflow.', createdAt: '2026-09-26T12:00:00Z' }];
export default function Page() {
  const [entries, setEntries] = useState<Entry[]>(sample);
  const [form, setForm] = useState({ project: '', update: '' });
  const [zone, setZone] = useState('Europe/Berlin');
  useEffect(() => { try { const saved = localStorage.getItem('ship-log-demo'); if (saved) setEntries(JSON.parse(saved)); } catch {} }, []);
  useEffect(() => { localStorage.setItem('ship-log-demo', JSON.stringify(entries)); }, [entries]);
  const current = useMemo(() => streak(entries, new Date(), zone), [entries, zone]);
  function add() { if (!form.project.trim() || !form.update.trim()) return; setEntries([{ id: crypto.randomUUID(), project: form.project.trim(), update: form.update.trim(), createdAt: new Date().toISOString() }, ...entries]); setForm({ project: '', update: '' }); }
  return <main><div className="eyebrow">BUILD IN PUBLIC · LOCAL DEMO</div><header><h1>Public Ship Log</h1><p>Record what shipped, keep a visible timeline, and track a daily streak in your chosen time zone.</p></header><div className="grid"><article><span className="muted">Current streak</span><div className="metric">{current} day{current === 1 ? '' : 's'}</div></article><article><span className="muted">Updates</span><div className="metric">{entries.length}</div></article></div>
    <section><h2>New update</h2><div className="grid"><label>Project<input type="text" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} /></label><label>Time zone<input type="text" value={zone} onChange={e => setZone(e.target.value)} /></label></div><label>What shipped today?<textarea value={form.update} onChange={e => setForm({ ...form, update: e.target.value })} /></label><button onClick={add}>Add to local log</button></section>
    <section><h2>Timeline</h2>{entries.map(item => <article key={item.id}><span className="pill">{dayKey(item.createdAt, zone)}</span><h3>{item.project}</h3><p>{item.update}</p></article>)}</section><footer>Updates are saved in this browser only. Social auto-posting and shared public accounts are not enabled in this preview.</footer></main>;
}
