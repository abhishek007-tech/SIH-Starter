import { motion } from "framer-motion";
import "./PageHero.css";

/**
 * Shared top-of-page hero for the marketing sub-pages.
 * <PageHero eyebrow="Solution" title="..." subtitle="..." />
 */
export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__blob page-hero__blob--a" />
      <div className="page-hero__blob page-hero__blob--b" />
      <div className="container page-hero__inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          className="page-hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="page-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
