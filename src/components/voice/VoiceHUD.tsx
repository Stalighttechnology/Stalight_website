import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { VoiceWaveform } from './VoiceWaveform';
import { TypewriterText } from './TypewriterText';
import { normalizeStalightPhonetics } from '@/services/voice/voicePhonetics';
import { VoiceBeam } from 'voice-glow';
import {
  Mic,
  Send,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Settings,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const quickPrompts = [
    'Book a demo',
    'What is Stalight Campus?',
    'Tell me about attendance features',
    'Show access plans & pricing',
    'What does Stalight Sync do?',
    'Scroll down',
  ];

  const getStatusText = () => {
    switch (state) {
      case 'WAKE_DETECTED':
        return 'Hey Stalight detected!';
      case 'LISTENING':
        return 'Listening to your voice...';
      case 'TRANSCRIBING':
        return 'Transcribing speech...';
      case 'THINKING':
        return 'Stalight is thinking...';
      case 'SPEAKING':
        return 'Stalight speaking... (Say "Hey Stalight" to interrupt)';
      case 'ERROR':
        return 'Could not understand. Please try again.';
      case 'DISABLED':
        return 'Assistant paused. Click mic to enable.';
      case 'READY':
      default:
        return 'Ready. Say "Hey Stalight" or speak.';
    }
  };

  const isAudioActive = state === 'LISTENING' || state === 'TRANSCRIBING' || state === 'SPEAKING';

  // Sanitize any interim transcript displayed live
  const cleanInterim = normalizeStalightPhonetics(currentTranscript);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="w-[calc(100vw-32px)] max-w-[380px] sm:max-w-[420px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 text-slate-900 overflow-hidden flex flex-col z-50"
      style={{ maxHeight: 'min(580px, 80vh)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <h4 className="text-sm font-bold text-slate-900">Stalight Assistant</h4>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{getStatusText()}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-full transition-colors ${
              showSettings ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMute}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            title={settings.wakeWordEnabled ? 'Mute' : 'Unmute'}
            aria-label="Toggle mute"
          >
            {settings.wakeWordEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
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
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Hands-Free "Hey Stalight"</span>
              <input
                type="checkbox"
                checked={settings.wakeWordEnabled}
                onChange={(e) => updateSettings({ wakeWordEnabled: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Voice Spoken Responses</span>
              <input
                type="checkbox"
                checked={settings.speechSynthesisEnabled}
                onChange={(e) => updateSettings({ speechSynthesisEnabled: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Audio Chimes & Tones</span>
              <input
                type="checkbox"
                checked={settings.soundEffectsEnabled}
                onChange={(e) => updateSettings({ soundEffectsEnabled: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Waveform Bar */}
      <div className="h-6 flex items-center justify-center bg-slate-900/5 px-4">
        <VoiceWaveform frequencyData={frequencyData} isActive={isAudioActive} barCount={16} />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[160px] max-h-[300px]">
        {messages.length === 0 && !cleanInterim && (
          <div className="text-center py-6 text-slate-400">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-500 mb-2">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-slate-700">Say "Hey Stalight" to ask a question</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[240px] mx-auto">
              You can navigate pages, ask about attendance, or request a campus demo hands-free.
            </p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isLatestAssistant = msg.sender === 'assistant' && index === messages.length - 1;
          return (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60 shadow-sm'
                }`}
              >
                {msg.sender === 'assistant' && isLatestAssistant ? (
                  <TypewriterText text={msg.text} speed={12} isStreaming={true} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          );
        })}

        {/* Live Interim Transcript Bubble (Active Speaking only) */}
        {(state === 'LISTENING' || state === 'TRANSCRIBING') && cleanInterim && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed bg-blue-500/90 text-white rounded-br-none animate-pulse">
              {cleanInterim} ...
            </div>
          </div>
        )}

        {/* Thinking State Bubble */}
        {state === 'THINKING' && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-3.5 py-2.5 text-xs bg-slate-100 text-slate-600 rounded-bl-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>Stalight is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Chips */}
      <div className="px-3 py-1.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendTextQuery(prompt)}
            className="shrink-0 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200/80 rounded-full transition-all flex items-center gap-1"
          >
            {prompt}
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
        ))}
      </div>

      {/* Footer Controls & Text Input */}
      <div className="p-3 border-t border-slate-100 bg-white">
        <VoiceBeam
          stream={micStream}
          processing={state === 'THINKING'}
          type="default"
          colorVariant="colorful"
          theme="light"
          reach={1.4}
          strength={1}
        >
          <form onSubmit={handleSend} className="flex items-center gap-2 p-1">
            {/* Active Mic / Stop Listening Button */}
            {state === 'LISTENING' || state === 'TRANSCRIBING' ? (
              <button
                type="button"
                onClick={stopListening}
                className="p-2.5 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-sm"
                title="Stop listening"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            ) : state === 'SPEAKING' ? (
              <button
                type="button"
                onClick={cancel}
                className="p-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm"
                title="Stop speaking"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={startListening}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm"
                title="Speak to Stalight"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}

            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder='Ask or say "Hey Stalight"...'
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all"
            />

            <button
              type="submit"
              disabled={!textInput.trim()}
              className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </VoiceBeam>

        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> On-Device Wake Detection
          </span>
          <span>Press Ctrl+Space to speak</span>
        </div>
      </div>
    </motion.div>
  );
};
