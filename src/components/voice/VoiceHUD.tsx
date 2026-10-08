import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { VoiceWaveform } from './VoiceWaveform';
import { TypewriterText } from './TypewriterText';
import { normalizeStalightPhonetics } from '@/services/voice/voicePhonetics';
import { isBraveBrowser } from '@/services/voice/wakeWordService';
import { VoiceBeam } from 'voice-glow';
import stalightLogo from '@/assets/logos/stalightlogo.png';
import {
  Mic,
  Send,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Settings,
  ShieldCheck,
  RotateCcw,
  Bot,
  User,
  ArrowUpRight,
  GraduationCap,
  Calendar,
  Layers,
  CreditCard,
} from 'lucide-react';

interface VoiceHUDProps {
  frequencyData: number[];
  onClose: () => void;
}

export const VoiceHUD: React.FC<VoiceHUDProps> = ({ frequencyData, onClose }) => {
  const {
    state,
    micStream,
    currentTranscript,
    assistantResponseText,
    messages,
    settings,
    updateSettings,
    startListening,
    stopListening,
    cancel,
    toggleMute,
    sendTextQuery,
  } = useVoiceAssistant();

  const [textInput, setTextInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isBrave, setIsBrave] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isBraveBrowser().then((brave) => setIsBrave(brave));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript, assistantResponseText]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      sendTextQuery(textInput.trim());
      setTextInput('');
    }
  };

  const quickActionCards = [
    {
      title: 'Stalight Campus',
      desc: 'All-in-one education ERP',
      prompt: 'What is Stalight Campus?',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Book a Demo',
      desc: 'Schedule a tailored walkthrough',
      prompt: 'I want to book a demo',
      icon: Calendar,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'Stalight Sync',
      desc: 'Smart attendance & biometric',
      prompt: 'Tell me about attendance features and Sync',
      icon: Layers,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      title: 'Pricing & Plans',
      desc: 'Basic, Pro & Enterprise models',
      prompt: 'Show access plans & pricing',
      icon: CreditCard,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
  ];

  const getStatusBadge = () => {
    switch (state) {
      case 'WAKE_DETECTED':
        return { label: 'Wake Detected', dot: 'bg-cyan-500 animate-ping', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      case 'LISTENING':
        return { label: 'Listening...', dot: 'bg-blue-500 animate-ping', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'TRANSCRIBING':
        return { label: 'Transcribing', dot: 'bg-indigo-500 animate-pulse', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'THINKING':
        return { label: 'Thinking...', dot: 'bg-purple-500 animate-pulse', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'SPEAKING':
        return { label: 'Speaking', dot: 'bg-emerald-500 animate-pulse', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'ERROR':
        return { label: 'Try Again', dot: 'bg-rose-500', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'DISABLED':
        return { label: 'Muted', dot: 'bg-slate-400', bg: 'bg-slate-100 text-slate-600 border-slate-200' };
      case 'READY':
      default:
        return { label: 'Ready', dot: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const isAudioActive = state === 'LISTENING' || state === 'TRANSCRIBING' || state === 'SPEAKING';
  const cleanInterim = normalizeStalightPhonetics(currentTranscript);
  const status = getStatusBadge();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 16 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="w-[calc(100vw-32px)] max-w-[400px] sm:max-w-[430px] bg-white/95 text-slate-800 backdrop-blur-2xl rounded-[28px] shadow-[0_20px_60px_rgba(15,23,42,0.14),0_0_0_1px_rgba(226,232,240,0.8)] overflow-hidden flex flex-col z-50 font-sans"
      style={{ maxHeight: 'min(600px, 82vh)' }}
    >
      {/* Top Specular Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-xl bg-white flex items-center justify-center p-1 border border-slate-200/80 shadow-xs overflow-hidden">
            <img src={stalightLogo} alt="Stalight" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2 leading-none">
              <h4 className="text-xs font-bold tracking-tight text-slate-900">Stalight AI</h4>
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${status.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-lg transition-all ${
              showSettings ? 'bg-blue-100 text-blue-600' : 'hover:text-slate-700 hover:bg-slate-100'
            }`}
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMute}
            className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
            title={settings.wakeWordEnabled ? 'Mute' : 'Unmute'}
            aria-label="Toggle mute"
          >
            {settings.wakeWordEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all ml-0.5"
            title="Minimize"
            aria-label="Close assistant panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Drawer */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-xs space-y-2.5 overflow-hidden"
          >
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-medium">Hands-Free "Hey Stalight"</span>
              <input
                type="checkbox"
                checked={settings.wakeWordEnabled}
                onChange={(e) => updateSettings({ wakeWordEnabled: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-medium">Voice Spoken Responses</span>
              <input
                type="checkbox"
                checked={settings.speechSynthesisEnabled}
                onChange={(e) => updateSettings({ speechSynthesisEnabled: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-medium">Audio Chimes & Tones</span>
              <input
                type="checkbox"
                checked={settings.soundEffectsEnabled}
                onChange={(e) => updateSettings({ soundEffectsEnabled: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            {isBrave && (
              <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-amber-700 flex items-start gap-1.5">
                <span className="shrink-0 text-xs">🦁</span>
                <span>
                  <strong>Brave Browser:</strong> Enable <em>&ldquo;Google services for voice recognition&rdquo;</em> in <code>brave://settings/extensions</code> for hands-free wake word.
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Acoustic Frequency Waveform */}
      <div className="h-7 flex items-center justify-center bg-slate-50/50 border-b border-slate-100/80 px-4 overflow-hidden">
        <VoiceWaveform frequencyData={frequencyData} isActive={isAudioActive} />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-[180px] max-h-[310px] no-scrollbar">
        {messages.length === 0 && !cleanInterim && (
          <div className="py-2 space-y-3">
            <div className="text-center px-2 py-2">
              <p className="text-xs font-bold text-slate-800 tracking-tight">How can I assist you today?</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed">
                Speak hands-free with <span className="text-blue-600 font-semibold">"Hey Stalight"</span> or click a quick prompt below.
              </p>
            </div>

            {/* Quick Prompt Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
              {quickActionCards.map((card, i) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={i}
                    onClick={() => sendTextQuery(card.prompt)}
                    className="group relative p-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md text-left transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className={`p-1.5 rounded-lg border ${card.color}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 leading-tight">
                        {card.title}
                      </h5>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {card.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {messages.map((msg, index) => {
          const isLatestAssistant = msg.sender === 'assistant' && index === messages.length - 1;
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mb-0.5 shadow-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-sm shadow-blue-500/20 font-normal'
                    : 'bg-slate-100/90 text-slate-800 rounded-bl-xs border border-slate-200/60 shadow-xs font-normal'
                }`}
              >
                {msg.sender === 'assistant' && isLatestAssistant ? (
                  <TypewriterText text={msg.text} speed={12} isStreaming={true} />
                ) : (
                  msg.text
                )}
              </div>

              {isUser && (
                <div className="w-6 h-6 rounded-lg bg-blue-600/10 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mb-0.5 shadow-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {/* Live Interim Transcript Bubble */}
        {(state === 'LISTENING' || state === 'TRANSCRIBING') && cleanInterim && (
          <div className="flex justify-end items-end gap-2">
            <div className="max-w-[82%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed bg-blue-500 text-white shadow-sm rounded-br-xs animate-pulse">
              {cleanInterim} ...
            </div>
          </div>
        )}

        {/* Thinking State Bubble */}
        {state === 'THINKING' && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="rounded-2xl px-3.5 py-2.5 text-xs bg-slate-100/90 border border-slate-200/60 text-slate-700 rounded-bl-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Stalight is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Unified Input Dock with VoiceBeam Glow */}
      <div className="p-3 border-t border-slate-100 bg-white/90">
        <VoiceBeam
          stream={micStream}
          processing={state === 'THINKING'}
          type="default"
          colorVariant="colorful"
          theme="light"
          reach={1.3}
          strength={1}
        >
          <form
            onSubmit={handleSend}
            data-voice-assistant-form="true"
            className="flex items-center gap-2 p-1.5 bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white border border-slate-200/80 focus-within:border-blue-500/50 rounded-2xl transition-all duration-200 shadow-inner"
          >
            {/* Active Mic / Speech Action Button */}
            {state === 'LISTENING' || state === 'TRANSCRIBING' ? (
              <button
                type="button"
                onClick={stopListening}
                className="p-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-sm shrink-0"
                title="Stop listening"
              >
                <RotateCcw className="w-4 h-4 animate-spin" />
              </button>
            ) : state === 'SPEAKING' ? (
              <button
                type="button"
                onClick={cancel}
                className="p-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm shrink-0"
                title="Stop speaking"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={startListening}
                className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm shadow-blue-500/25 shrink-0"
                title="Speak to Stalight"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}

            {/* Main Text Input */}
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder='Ask a question or say "Hey Stalight"...'
              className="flex-1 text-xs px-2 py-1 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none tracking-tight"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!textInput.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-medium transition-all shadow-sm shrink-0 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </VoiceBeam>

        {/* Footer Subtext */}
        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> On-Device Wake Detection
          </span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500">
            Ctrl + Space
          </span>
        </div>
      </div>
    </motion.div>
  );
};
