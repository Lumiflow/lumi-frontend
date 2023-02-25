import Card from "@/components/home/card";
import Layout from "@/components/layout";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import classNames from "classnames";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const StreamDetail = () => {
  const [progress, setProgress] = React.useState(60);

  useEffect(() => {
    let timerId: null | NodeJS.Timer = null;

    timerId = setInterval(() => {
      const p = Math.ceil(20 / 10) * 10;
      setProgress(p);
    }, 5000);

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, []);

  return (
    <Layout>
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          className="flex items-center justify-center space-x-8 px-5 pb-8"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Link
            className={classNames(
              "z-[5] flex items-center space-x-2 text-gray-400 transition-colors hover:text-gray-900",
            )}
            href="/dashboard"
          >
            <Home />
            <span>Dashboard</span>
          </Link>
        </motion.div>
        <motion.div
          className="mx-auto max-w-3xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Card title="Stream detail">
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <div className="text-xl">750 of 1500 $USDC</div>
                <div className="text-sm">1 USDC/minute</div>
              </div>
              <ProgressPrimitive.Root
                value={progress}
                className="h-3 w-full overflow-hidden rounded-full bg-gray-900"
              >
                <ProgressPrimitive.Indicator
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gray-600 duration-300 ease-in-out"
                />
              </ProgressPrimitive.Root>
              <div className="text-sm">38h 12m 44s remaining</div>
              <div className="flex flex-col text-left">
                <p className="font-semibold">Receiver</p>
                <p className="text-sm">flow.find</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default StreamDetail;
