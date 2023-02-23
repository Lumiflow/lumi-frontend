import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import Layout from "@/components/layout";
import CountingNumbers from "@/components/shared/counting-numbers";
import { useCreateModal } from "@/components/shared/create-modal";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import useScroll from "@/lib/hooks/use-scroll";
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
  const scrolled = useScroll(50);

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
              "z-[5] flex items-center space-x-2 transition-colors hover:text-gray-900",
              pathname === "/dashboard" ? "text-gray-900" : "text-gray-400",
            )}
            href="/dashboard"
          >
            <Home />
            <span>Dashboard</span>
          </Link>
          <button
            className="z-[5] flex items-center space-x-2 text-gray-400 transition-colors hover:text-gray-900"
            onClick={() => setShowCreateModal(true)}
          >
            <Coins />
            <span>New stream</span>
          </button>
        </motion.div>
        <div className="grid w-full grid-cols-3 gap-4 p-2">
          <motion.div
            className="col-span-2"
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
                        stroke="#1D9BF0"
                      />
                    </motion.svg>
                    <CountingNumbers
                      value={v}
                      duration={2500}
                      className="absolute inset-0 mx-auto flex items-center justify-center font-display text-xl text-[#1D9BF0]"
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
          <motion.div
            className="col-span-3"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Card title="Analytics">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-full rounded-md bg-gray-100 bg-opacity-10 backdrop-blur">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black px-5 py-2 text-white">
                    Coming soon
                  </div>
                </div>
                <svg
                  className="mt-4 h-full w-full p-4"
                  width="800"
                  height="226"
                  viewBox="0 0 800 226"
                >
                  <title></title>
                  <desc></desc>
                  <defs>
                    <clipPath id="recharts264-clip">
                      <rect x="0" y="5" height="216" width="800"></rect>
                    </clipPath>
                  </defs>
                  <g className="recharts-layer recharts-area">
                    <g className="recharts-layer">
                      <path
                        fill="#77b5ef"
                        fill-opacity="0.6"
                        width="800"
                        height="216"
                        stroke="none"
                        className="recharts-curve recharts-area-area"
                        d="M0,5C44.444,23,88.889,41,133.333,59C177.778,77,222.222,113,266.667,113C311.111,113,355.556,70.88,400,70.88C444.444,70.88,488.889,118.94,533.333,118.94C577.778,118.94,622.222,106.34,666.667,91.94C711.111,77.54,755.556,55.04,800,32.54L800,221C755.556,221,711.111,221,666.667,221C622.222,221,577.778,221,533.333,221C488.889,221,444.444,221,400,221C355.556,221,311.111,221,266.667,221C222.222,221,177.778,221,133.333,221C88.889,221,44.444,221,0,221Z"
                      ></path>
                      <path
                        stroke="#77b5ef"
                        fill="none"
                        fill-opacity="0.6"
                        width="800"
                        height="216"
                        className="recharts-curve recharts-area-curve"
                        d="M0,5C44.444,23,88.889,41,133.333,59C177.778,77,222.222,113,266.667,113C311.111,113,355.556,70.88,400,70.88C444.444,70.88,488.889,118.94,533.333,118.94C577.778,118.94,622.222,106.34,666.667,91.94C711.111,77.54,755.556,55.04,800,32.54"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
