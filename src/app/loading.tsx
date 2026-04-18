"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";
 const GlobalLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: "easeOut" 
        }}
        className="relative flex items-center justify-center"
      >

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-24 w-24 rounded-full bg-primary/20 blur-2xl"
        />

    
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-20 w-20 rounded-full border-b-2 border-t-2 border-primary"
        />

    
        <div className="absolute">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Film className="h-10 w-10 text-primary" />
          </motion.div>
        </div>
      </motion.div>

    
      <div className="mt-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold tracking-widest uppercase"
        >
          Cinema <span className="text-primary">Tube</span>
        </motion.h2>
        
 
        <div className="mt-4 w-48 h-0.5 bg-muted rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-full bg-linear-to-r from-transparent via-primary to-transparent"
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xs text-muted-foreground mt-3 font-medium tracking-[0.2em] uppercase"
        >
          Preparing your show...
        </motion.p>
      </div>


      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
      />
    </div>
  );
};

export default GlobalLoading;