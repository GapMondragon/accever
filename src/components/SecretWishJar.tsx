import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Trash2, Pin, CheckSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface Note {
  id: string;
  text: string;
  date: string;
  color: string;
  shadow: string;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: '1',
    text: "Gabe owes me an iced matcha latte & almond croissant before Friday. 🍵🥐",
    date: 'Priority Request',
    color: 'bg-emerald-200',
    shadow: 'shadow-clay-mint',
  },
  {
    id: '2',
    text: "Official grievance: Please stop leaving your hoodie draped on the dining chair. 🧥",
    date: 'Household Notice',
    color: 'bg-amber-200',
    shadow: 'shadow-clay-peach',
  },
  {
    id: '3',
    text: "Reminder that it is technically your turn to pick the next TV series. 🎬",
    date: 'Standing Order',
    color: 'bg-violet-200',
    shadow: 'shadow-clay-lavender',
  },
];

export const SecretWishJar: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('accever_wish_jar');
      return saved ? JSON.parse(saved) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('accever_wish_jar', JSON.stringify(notes));
    } catch {
      // Ignore
    }
  }, [notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sound.playPop(800);
    const colors = [
      { color: 'bg-violet-200', shadow: 'shadow-clay-lavender' },
      { color: 'bg-emerald-200', shadow: 'shadow-clay-mint' },
      { color: 'bg-amber-200', shadow: 'shadow-clay-peach' },
      { color: 'bg-sky-200', shadow: 'shadow-clay-sky' },
    ];
    const picked = colors[Math.floor(Math.random() * colors.length)];

    const newNote: Note = {
      id: Date.now().toString(),
      text: inputText.trim(),
      date: 'Logged Just Now',
      color: picked.color,
      shadow: picked.shadow,
    };

    setNotes([newNote, ...notes]);
    setInputText('');

    confetti({
      particleCount: 20,
      spread: 50,
      colors: ['#6EE7B7', '#DDD6FE', '#FED7AA', '#BAE6FD'],
    });
  };

  const handleDelete = (id: string) => {
    sound.playSquish();
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16">
      <div className="rounded-[36px] bg-sky-100/90 shadow-clay-card p-6 sm:p-10 border-none">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-950 shadow-clay-sky">
            <CheckSquare className="w-3.5 h-3.5 text-sky-700" />
            Official Requests & Grievances
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-clay-indigo-dark tracking-tight">
            Accever's Demand Box 📥📋
          </h2>
          <p className="text-xs sm:text-sm font-bold text-sky-950/80 max-w-md mx-auto">
            File an official demand, snack requisition, or submit a complaint about Gabe leaving things around.
          </p>
        </div>

        {/* Input Form with Inspos Debossed Style */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. 'You owe me boba for running errands' 🧋"
              className="w-full rounded-2xl bg-sky-50/90 px-5 py-3.5 text-xs sm:text-sm font-bold text-violet-950 placeholder-violet-400/80 shadow-[inset_4px_4px_8px_rgba(14,165,233,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] outline-none transition-all focus:bg-white focus:shadow-[inset_2px_2px_6px_rgba(14,165,233,0.25),0_0_0_3px_rgba(125,211,252,0.4)]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto clay-btn bg-sky-300 hover:bg-sky-200 text-sky-950 px-6 py-3.5 text-xs sm:text-sm shadow-clay-sky shrink-0 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-sky-900" />
              <span>File Demand</span>
            </button>
          </div>
        </form>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`clay-surface ${note.color} ${note.shadow} p-5 flex flex-col justify-between min-h-[140px] relative group`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <Pin className="w-4 h-4 text-violet-800/60 rotate-45 shrink-0" />
                <button
                  onClick={() => handleDelete(note.id)}
                  title="Mark as resolved / dismissed"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white/50 text-violet-900 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm font-black text-violet-950 leading-relaxed my-1">
                "{note.text}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-black/5 text-[10px] font-bold text-violet-800/70">
                <span>{note.date}</span>
                <span className="text-xs">📌</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
