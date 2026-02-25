import { AnimatePresence, motion } from "motion/react";

import { CheckCircle } from "lucide-react";

export default function SuccessTick() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity:1}}
        className="absolute inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-xs"
      >
        <CheckCircle className="h-24 w-24 text-green-500" />
      </motion.div>
    </AnimatePresence>
  );
}
