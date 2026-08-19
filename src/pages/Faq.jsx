import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button.jsx";
import PageHero from "../components/PageHero.jsx";
import { faqs } from "../data/demoData.js";
import "./Faq.css";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button className="faq-item__q" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <motion.span
          className="faq-item__icon"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="faq-item__a-wrap"
          >
            <p className="faq-item__a">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(faqs[0].id);

  return (
    <div>
      <PageHero
        eyebrow="FAQ"
        title="Questions you might have"
        subtitle="Everything about how Veyora works, answered plainly."
      />

      <section className="page">
        <div className="container faq-inner">
          <div className="faq-list">
            {faqs.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openFaq === item.id}
                onToggle={() => setOpenFaq(openFaq === item.id ? null : item.id)}
              />
            ))}
          </div>

          <motion.div
            className="faq-still"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Still curious?</h3>
            <p>See the full solution, or read what Veyora stands for.</p>
            <div className="faq-still__actions">
              <Link to="/solutions">
                <Button variant="primary">Explore the solution</Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary">About Veyora</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
