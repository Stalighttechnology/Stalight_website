import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isBraveBrowser } from '@/services/voice/wakeWordService';

interface VoicePermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  onDismiss: () => void;
}

export const VoicePermissionModal: React.FC<VoicePermissionModalProps> = ({
  isOpen,
  onAllow,
  onDismiss,
}) => {
  const [isBrave, setIsBrave] = useState(false);

  useEffect(() => {
    isBraveBrowser().then((brave) => setIsBrave(brave));
  }, []);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-md p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 text-slate-900 overflow-hidden"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                <Mic className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-bold text-slate-900">Stalight Assistant</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200/60">
                    <Sparkles className="w-3 h-3 text-blue-500" /> Voice AI
                  </span>
                </div>
                <p className="text-xs text-slate-500">Hands-free voice experience for stalight.in</p>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-3 mb-6 text-sm text-slate-600">
              <p className="font-medium text-slate-800">
                Say <strong className="text-blue-600">"Hey Stalight"</strong> anytime to:
              </p>
              <ul className="space-y-1.5 pl-1 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Explore Stalight Campus ERP & Sync LMS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Book live demos & view access plans
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Ask about facial attendance, NAAC/NBA, & IT services
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Hands-free website scrolling & navigation
                </li>
              </ul>

              {/* Privacy Notice & Brave Tip */}
              <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy First:</strong> Wake-word detection runs locally in your browser. No raw microphone audio is ever permanently stored.
                </span>
              </div>

              {isBrave && (
                <div className="flex items-start gap-2 p-2.5 bg-amber-50/80 rounded-2xl border border-amber-200/70 text-[11px] text-amber-800">
                  <span className="shrink-0 text-xs">🦁</span>
                  <span>
                    <strong>Brave Browser Tip:</strong> If hands-free wake doesn&apos;t trigger, enable <em>&ldquo;Google services for voice recognition&rdquo;</em> in <code>brave://settings/extensions</code>.
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Button
                onClick={onAllow}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-blue-500/20"
              >
                Enable Hands-Free Voice
              </Button>
              <Button
                variant="outline"
                onClick={onDismiss}
                className="text-slate-600 hover:text-slate-900 border-slate-200 rounded-xl"
              >
                Browse Manually
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
