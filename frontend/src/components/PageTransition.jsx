import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const location = useLocation();
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    setTrigger(true);
    const timeout = setTimeout(() => setTrigger(false), 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <AnimatePresence>
      {trigger && (
        <>
          <motion.div
            className="curtain left"
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            className="curtain right"
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </>
      )}
    </AnimatePresence>
  );
}