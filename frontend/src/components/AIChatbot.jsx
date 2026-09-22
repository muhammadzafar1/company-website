import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';

const API_URL = 'https://azmeer-ai.az-abdulbasit-az.workers.dev/v1beta/models/gemini-2.5-flash:generateContent';
const APP_AUTH_KEY = 'azmeer-ai-prompthub';
const assistantPrompt = `You are AZ MEER's helpful website assistant. Help visitors understand AZ MEER's services, products, portfolio, team, social media, contact options, FAQs, and how to request a quote. Be friendly, concise, accurate, and practical. You may help brainstorm software ideas, explain technology clearly, suggest the right AZ MEER service, and guide users through this website. Never claim to have taken an action you cannot take, never invent prices, guarantees, private data, or team facts, and never request passwords, API keys, or other sensitive secrets. For account, legal, medical, financial, or safety-critical matters, clearly recommend a qualified professional. When you do not know something, say so and direct the visitor to the Contact page.`;

const quickPrompts = ['What services do you offer?', 'Help me request a quote', 'Which service fits my idea?'];

function getAssistantText(payload) {
  return payload?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';
}

function renderInlineMarkdown(text) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function MarkdownMessage({ text }) {
  const lines = text.split('\n');
  const content = [];
  let listItems = [];
  let listType = null;

  const flushList = () => {
    if (!listItems.length) return;
    const List = listType === 'ordered' ? 'ol' : 'ul';
    content.push(
      <List key={`list-${content.length}`} className={listType === 'ordered' ? 'list-decimal space-y-2 pl-5' : 'list-disc space-y-2 pl-5'}>
        {listItems.map((item, index) => <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>)}
      </List>,
    );
    listItems = [];
    listType = null;
  };

  lines.forEach((line, index) => {
    const orderedItem = line.match(/^\s*\d+[.)]\s+(.*)$/);
    const unorderedItem = line.match(/^\s*[-*]\s+(.*)$/);
    if (orderedItem || unorderedItem) {
      const nextType = orderedItem ? 'ordered' : 'unordered';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((orderedItem || unorderedItem)[1]);
      return;
    }

    flushList();
    if (line.trim()) content.push(<p key={`line-${index}`}>{renderInlineMarkdown(line)}</p>);
  });
  flushList();

  return <div className="space-y-2">{content}</div>;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi, I am AzMeer AI. I can help you explore our services, products, team, and next steps.' },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (event, prompt = input) => {
    event?.preventDefault();
    const text = prompt.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const conversation = nextMessages
        .slice(-12)
        .map((message) => `${message.role === 'assistant' ? 'Assistant' : 'Visitor'}: ${message.text}`)
        .join('\n');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-auth-key': APP_AUTH_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${assistantPrompt}\n\nConversation:\n${conversation}\n\nRespond to the visitor's latest message.` }] }],
        }),
      });

      if (!response.ok) throw new Error(`AI request failed with status ${response.status}`);
      const payload = await response.json();
      const assistantText = getAssistantText(payload);
      if (!assistantText) throw new Error('The AI returned an empty response');
      setMessages((current) => [...current, { role: 'assistant', text: assistantText }]);
    } catch (error) {
      console.error('AI assistant request failed', error);
      setMessages((current) => [...current, { role: 'assistant', text: 'I could not connect right now. Please try again or use the Contact page to reach the AZ MEER team.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section className="flex h-[min(600px,calc(100vh-110px))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] shadow-[0_24px_70px_rgba(43,26,16,0.24)]" aria-label="AzMeer AI assistant">
          <header className="flex items-center justify-between bg-[var(--surface-dark)] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--on-accent)]"><Bot className="h-5 w-5" /></div>
              <div><p className="font-semibold">AzMeer AI</p><p className="text-xs text-[var(--text-on-dark-muted)]">Here to help you move forward</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-[var(--text-on-dark-muted)] transition hover:bg-white/10 hover:text-white" aria-label="Close assistant"><X className="h-5 w-5" /></button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[var(--bg-page)] p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-sm bg-[var(--accent)] text-[var(--on-accent)]' : 'rounded-bl-sm border border-[var(--border-light)] bg-[var(--surface-light)] text-[var(--text-on-light-body)]'}`}>
                  {message.role === 'assistant' ? <MarkdownMessage text={message.text} /> : message.text}
                </div>
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-sm text-[var(--text-on-light-muted)]"><Sparkles className="h-4 w-4 animate-pulse text-[var(--brand-dark)]" /> Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[var(--border-light)] bg-[var(--surface-light)] p-3">
            {messages.length === 1 && <div className="mb-3 flex flex-wrap gap-2">{quickPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => sendMessage(null, prompt)} className="rounded-full border border-[var(--border-light)] px-3 py-1.5 text-xs text-[var(--text-on-light-body)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]">{prompt}</button>)}</div>}
            <form onSubmit={sendMessage} className="flex items-end gap-2">
              <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(event); } }} rows="1" placeholder="Ask anything about AZ MEER..." className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-3 py-2.5 text-sm text-[var(--text-on-light-heading)] outline-none focus:border-[var(--accent)]" aria-label="Message AzMeer AI" />
              <button type="submit" disabled={loading || !input.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--on-accent)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message"><Send className="h-4 w-4" /></button>
            </form>
            <p className="mt-2 text-[10px] text-[var(--text-on-light-muted)]">AI responses may be imperfect. Do not share sensitive information.</p>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setOpen((current) => !current)} className="group flex items-center gap-3 rounded-full bg-[var(--surface-dark)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(43,26,16,0.24)] transition hover:-translate-y-1 hover:bg-[var(--brand-dark)]" aria-expanded={open} aria-label={open ? 'Close AzMeer AI' : 'Open AzMeer AI'}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)]">{open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}</span>
        <span className="hidden sm:inline">{open ? 'Close AzMeer AI' : 'Ask AzMeer AI'}</span>
      </button>
    </div>
  );
}
