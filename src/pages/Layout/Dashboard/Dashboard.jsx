import "./Dashboard.css";
import React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import UserReviews from "../../Shared/UserReviews/UserReviews";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Dashboard = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <section className="dashboard-body">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div className="background" variants={sidebar} />
        <Navigation />
        <div  className="font-bold ml-96 m-12">
          <h1 className="text-5xl text-white m-12">
            Welcome to Galaxy Meeting.
          </h1>
          {/* <UserReviews /> */}
        </div>
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </section>
  );
};

export default Dashboard;
