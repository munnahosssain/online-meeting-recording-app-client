import "./Dashboard.css";
import { useRef } from "react";
import React, { useState } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import useAdmin from "../../../hooks/useAdmin";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

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
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const user = useSelector((state) => state.data.user.user);

  const [isAdmin] = useAdmin();
  
  /* ----------Admin------------ */
  const admin = (
    <>
      <div className="avatar my-4">
        <div className="mx-auto w-24 rounded-full">
          <img src={user?.photoURL} />
        </div>
      </div>
      <div className="mb-4">Welcome, {user?.email}</div>
    </>
  );

  /* ----------Users------------ */
  const users = (
    <>
      <div className="avatar my-4">
        <div className="mx-auto w-24 rounded-full">
          <img src={user?.photoURL} />
        </div>
      </div>
      <div className="mb-4">Welcome, {user?.email}</div>
    </>
  );

  return (
    <section className="dashboard-body">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div className="background" variants={sidebar} />
        <Navigation isAdmin={isAdmin} users={users} />
        <div className="font-bold ml-96 m-12">
          <h1 className="text-5xl text-white m-12">
            Welcome to Galaxy Meeting.
          </h1>
        </div>
        <Outlet/>
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </section>
  );
};

export default Dashboard;
