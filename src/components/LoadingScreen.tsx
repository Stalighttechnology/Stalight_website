import React from "react";
import { motion } from "framer-motion";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#070514] flex flex-col items-center justify-center overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-900/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Animated outer glowing ring */}
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-purple-500/10 border-t-purple-500 border-r-indigo-500"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        />

        {/* Pulsing inner dot */}
        <motion.div
          className="absolute top-7 left-7 w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(147,51,234,0.5)]"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />

        {/* Text descriptions */}
        <motion.div
          className="mt-8 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-200 font-sans">
            STALIGHT
          </span>
          <motion.span
            className="mt-2 text-[12px] font-medium tracking-widest text-purple-400/80 uppercase"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            Sovereign Intelligence
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};
