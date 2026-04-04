"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "./_action";
import { Film } from "lucide-react";
import { motion, Variants } from "framer-motion";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], 
    },
  }),
}


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, 
    },
  },
};

const LogoutPage = () => {
  const router = useRouter();
  const loadingText = "Logging you out...";

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutAction();

        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Logout failed:", error);
        router.push("/");
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 bg-background p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-4 rounded-full bg-primary/20 blur-xl"
        />
        <div className="relative rounded-full border border-primary/20 bg-background p-6 shadow-inner">
          <Film className="h-12 w-12 text-primary animate-pulse" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold tracking-tighter flex items-center justify-center gap-1">
          {loadingText.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={textVariants}
              className={char === " " ? "mr-1" : ""}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-muted-foreground text-sm"
        >
          Securing your account for next time.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
        className="h-1 bg-primary/20 rounded-full overflow-hidden"
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-full w-1/2 bg-primary rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default LogoutPage;
