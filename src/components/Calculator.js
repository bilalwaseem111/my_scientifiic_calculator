"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "../styles/Calculator.module.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [showScientific, setShowScientific] = useState(false);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      if (!input.trim()) return;
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const toggleScientific = () => {
    setShowScientific(!showScientific);
  };

  const toRadians = (angle) => (angle * Math.PI) / 180;

  const scientificFunctions = [
    { label: "sin", func: (val) => Math.sin(toRadians(val)), needsInput: true },
    { label: "cos", func: (val) => Math.cos(toRadians(val)), needsInput: true },
    { label: "tan", func: (val) => Math.tan(toRadians(val)), needsInput: true },
    { label: "log", func: (val) => (val > 0 ? Math.log10(val) : "Error"), needsInput: true },
    { label: "ln", func: (val) => (val > 0 ? Math.log(val) : "Error"), needsInput: true },
    { label: "√", func: (val) => (val >= 0 ? Math.sqrt(val) : "Error"), needsInput: true },
    { label: "x²", func: (val) => Math.pow(val, 2), needsInput: true },
    { label: "π", func: () => Math.PI, needsInput: false },
    { label: "e", func: () => Math.E, needsInput: false },
  ];

  const handleScientificClick = (funcObj) => {
    try {
      let result;

      if (funcObj.needsInput) {
        if (!input.trim()) {
          setInput("Error");
          return;
        }

        const parsedInput = parseFloat(input);

        if (isNaN(parsedInput)) {
          setInput("Error");
          return;
        }

        result = funcObj.func(parsedInput);
      } else {
        result = funcObj.func();
      }

      if (result === "Error" || isNaN(result)) {
        setInput("Error");
      } else {
        setInput(result.toString());
      }
    } catch {
      setInput("Error");
    }
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.bubbles}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <motion.h1
        className={styles.heading}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        My Scientific Calculator
      </motion.h1>

      <div className={styles.calculatorWrapper}>
        <motion.div
          className={styles.calculator}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className={styles.display}>
            <input type="text" value={input} readOnly />
          </div>

          <div className={styles.buttons}>
            {["7", "8", "9", "/"].map((btn) => (
              <motion.button
                key={btn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </motion.button>
            ))}
            {["4", "5", "6", "*"].map((btn) => (
              <motion.button
                key={btn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </motion.button>
            ))}
            {["1", "2", "3", "-"].map((btn) => (
              <motion.button
                key={btn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </motion.button>
            ))}
            {["0", ".", "=", "+"].map((btn) => (
              <motion.button
                key={btn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={btn === "=" ? calculateResult : () => handleClick(btn)}
              >
                {btn}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearInput}
              className={styles.clearButton}
            >
              C
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleScientific}
              className={styles.scientificToggle}
            >
              {showScientific ? "Basic" : "Scientific"}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showScientific && (
            <motion.div
              className={styles.scientificPanelContainer}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div className={styles.scientificPanel}>
                {scientificFunctions.map((funcObj) => (
                  <motion.button
                    key={funcObj.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleScientificClick(funcObj)}
                  >
                    {funcObj.label}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div
                className={styles.footerInfo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p>Made by Bilal Waseem</p>
                <a
                  href="https://www.linkedin.com/in/bilal-waseem-b44006338"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/logo.webp"
                    alt="LinkedIn Logo"
                    width={60}
                    height={60}
                    className={styles.linkedinLogo}
                  />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Calculator;
