// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import styles from "./QEHSSection.module.css";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import Image from "next/image";
// import { urlForImage } from "@/sanity/lib/image";

// interface Policy {
//   title: string;
//   description: string;
//   image: any;
// }

// interface QEHSSectionProps {
//   data: {
//     qehsHeading?: string;
//     qehsDescription?: string;
//     qehsPolicies?: Policy[];
//   };
// }

// const DEFAULT_POLICIES: Policy[] = [
//   {
//     title: "Quality Assurance",
//     description: "We maintain rigorous quality control standards across all our operations to ensure excellence in every project we deliver.",
//     image: null,
//   },
//   {
//     title: "Environmental Stewardship",
//     description: "Our commitment to the environment drives us to implement sustainable practices and minimize our ecological footprint.",
//     image: null,
//   },
//   {
//     title: "Health & Occupational Safety",
//     description: "We prioritize a zero-harm culture, ensuring a safe and healthy working environment for all our stakeholders.",
//     image: null,
//   },
// ];

// export const QEHSSection: React.FC<QEHSSectionProps> = ({ data }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const policies = data.qehsPolicies && data.qehsPolicies.length > 0
//     ? data.qehsPolicies
//     : DEFAULT_POLICIES;

//   return <QEHSContent data={{ ...data, qehsPolicies: policies }} />;
// };

// const QEHSContent: React.FC<QEHSSectionProps> = ({ data }) => {
//   const { qehsHeading, qehsDescription, qehsPolicies = [] } = data;
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const totalItems = qehsPolicies.length;

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   // Each item occupies 60vw now for better visibility and less void
//   const translateX = useTransform(smoothProgress, [0, 1], ["0%", `-${(totalItems - 1) * 60}vw`]);

//   const pathXStep = 1000;
//   const generatePath = () => {
//     // The path should go through the center (500) and peak at 300/700
//     let d = "M 0 500";
//     for (let i = 0; i < totalItems; i++) {
//       const x = i * pathXStep + pathXStep / 2;
//       const endX = (i + 1) * pathXStep;
//       const y = i % 2 === 0 ? 300 : 700;

//       // Move exactly to the center of the number
//       d += ` L ${x} ${y}`;
//       d += ` L ${endX} 500`;
//     }
//     return d;
//   };

//   const riverPath = generatePath();

//   return (
//     <section
//       className={styles.section}
//       ref={sectionRef}
//       style={{ height: `${totalItems * 80}vh` }} // Slightly faster scroll
//     >
//       <div className={styles.stickyContainer}>
//         <div className={styles.headerOverlay}>
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             className={styles.headerContent}
//           >
//             <span className={styles.subtitle}>Our Journey</span>
//             <h2 className={styles.title}>{qehsHeading || "Our QEHS Policy"}</h2>
//           </motion.div>
//         </div>

//         <motion.div className={styles.mazeWrapper} style={{ x: translateX }}>
//           <div className={styles.mazePathContainer}>
//             <svg
//               viewBox={`0 0 ${totalItems * pathXStep} 1000`}
//               fill="none"
//               preserveAspectRatio="none"
//               style={{ width: `${totalItems * 60}vw`, height: '100%' }}
//             >
//               <path d={riverPath} className={styles.riverPath} />
//               <motion.path
//                 d={riverPath}
//                 className={styles.riverProgress}
//                 style={{ pathLength: smoothProgress }}
//               />
//             </svg>
//           </div>

//           {qehsPolicies.map((policy, index) => (
//             <PolicyItem
//               key={index}
//               policy={policy}
//               index={index}
//               globalProgress={smoothProgress}
//               totalItems={totalItems}
//             />
//           ))}
//         </motion.div>
//       </div>

//       <div className={styles.backgroundShapes}>
//         <div className={`${styles.shape} ${styles.shape1}`} />
//         <div className={`${styles.shape} ${styles.shape2}`} />
//       </div>
//     </section>
//   );
// };

// const PolicyItem = ({ policy, index, globalProgress, totalItems }: { policy: Policy; index: number; globalProgress: any; totalItems: number }) => {
//   const step = 1 / totalItems;
//   const start = index * step;
//   const mid = start + step * 0.5;

//   const itemScrollProgress = useTransform(globalProgress, [start, mid], [0, 1]);
//   const opacity = useTransform(itemScrollProgress, [0, 0.4, 1], [0, 1, 1]);
//   const rotateX = useTransform(itemScrollProgress, [0, 1], [-90, 0]);
//   const scale = useTransform(itemScrollProgress, [0, 1], [0.9, 1]);

//   return (
//     <div className={styles.policyItem}>
//       <motion.div
//         className={styles.numberCircle}
//         style={{
//           scale,
//           top: index % 2 === 0 ? '30%' : '70%', // Precisely on river peak
//         }}
//       >
//         <span>{index + 1}</span>
//       </motion.div>

//       <motion.div
//         style={{
//           opacity,
//           rotateX,
//           scale,
//           top: index % 2 === 0 ? 'calc(30% + 50px)' : 'auto',
//           bottom: index % 2 === 1 ? 'calc(30% + 50px)' : 'auto',
//           perspective: "1200px",
//           transformOrigin: index % 2 === 0 ? "top center" : "bottom center"
//         }}
//         className={styles.cardWrapper}
//       >
//         <div className={styles.glassCard}>
//           <div className={styles.cardInner}>
//             <div className={styles.textContent}>
//               <h3 className={styles.policyTitle}>{policy.title}</h3>
//               <p className={styles.policyText}>{policy.description}</p>
//             </div>

//             <div className={styles.policyImageWrapper}>
//               {policy.image ? (
//                 <Image
//                   src={urlForImage(policy.image).url()}
//                   alt={policy.image.alt || policy.title}
//                   fill
//                   className={styles.policyImage}
//                   sizes="400px"
//                 />
//               ) : (
//                 <div className={styles.imagePlaceholder}>
//                   <div className={styles.placeholderGlow} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };
