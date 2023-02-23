import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import Layout from "@/components/layout";
import CountingNumbers from "@/components/shared/counting-numbers";
import { useCreateModal } from "@/components/shared/create-modal";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import classNames from "classnames";
import { motion } from "framer-motion";
import {
  Coins,
  ExternalLink,
  Home,
  LayoutDashboard,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { pathname } = useRouter();
  const { setShowCreateModal, CreateModal } = useCreateModal();

  return (
    <Layout>
      <CreateModal />
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
        <motion.div className="flex items-center justify-center space-x-8 px-5 pb-8">
          <Link
            className={classNames(
              "z-10 flex items-center space-x-2 transition-colors hover:text-gray-900",
              pathname === "/dashboard" ? "text-gray-900" : "text-gray-400",
            )}
            href="/dashboard"
          >
            <Home />
            <span>Dashboard</span>
          </Link>
          <button
            className="z-10 flex items-center space-x-2 text-gray-400 transition-colors hover:text-gray-900"
            onClick={() => setShowCreateModal(true)}
          >
            <Coins />
            <span>New stream</span>
          </button>
        </motion.div>
        <div className="grid w-full grid-cols-3 gap-4 p-2">
          <motion.div
            className=" col-span-2"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Card title="My streams">
              {[50, 20, 90].map((v) => (
                <div
                  key={v}
                  className="mt-4 flex items-center rounded-xl border border-gray-300 p-4"
                >
                  <div className="relative h-16 w-16">
                    <motion.svg
                      className="absolute inset-0 m-auto"
                      viewBox="0 0 100 100"
                      width={64}
                      height={64}
                    >
                      <motion.circle
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: v / 100 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5,
                          duration: 2,
                          ease: "easeOut",
                        }}
                        strokeWidth={7}
                        strokeDasharray="0 1"
                        strokeLinecap="round"
                        transform="rotate(180 50 50)"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="#22C55E"
                      />
                    </motion.svg>
                    <CountingNumbers
                      value={v}
                      duration={2500}
                      className="absolute inset-0 mx-auto flex items-center justify-center font-display text-xl text-green-500"
                    />
                  </div>
                  <div className="ml-6 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="text-xl">750 of 1500 $USDC</div>
                      <div className="text-sm">1 USDC/minute</div>
                    </div>
                    <div className="text-sm">38h 12m 44s remaining</div>
                  </div>
                  <div className="ml-8 flex flex-col text-left">
                    <p className="font-semibold">Receiver</p>
                    <p className="text-sm">flow.find</p>
                  </div>
                  <div className="ml-8 flex flex-col text-left">
                    <p className="font-semibold">Status</p>
                    <p className="text-sm">Active</p>
                  </div>
                  <div className="ml-auto">
                    <LinkIcon />
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Card title="Profile">
              <p className="mt-4 text-left text-lg font-semibold">Receiving</p>
              <div className="mt-2 flex items-center rounded-xl border border-gray-300 p-4">
                <div className="flex w-full items-center justify-between">
                  <div>Flow, $USDC</div>
                  <div>0.1 $USDC/sec</div>
                </div>
              </div>
              <p className="mt-4 text-left text-lg font-semibold">Sending</p>
              <div className="mt-2 flex items-center rounded-xl border border-gray-300 p-4">
                <div className="flex w-full items-center justify-between">
                  <div>Flow, $USDC</div>
                  <div>0 $USDC/sec</div>
                </div>
              </div>
              <p className="mt-4 text-left text-lg font-semibold">Withdrawn</p>
              <div className="mt-2 flex items-center rounded-xl border border-gray-300 p-4">
                <div className="flex w-full items-center justify-between">
                  <div>Flow, $USDC</div>
                  <div>100 $USDC</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
