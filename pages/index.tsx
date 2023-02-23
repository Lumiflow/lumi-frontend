import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { Coins, LayoutDashboard, Wind } from "lucide-react";
import Link from "next/link";
import { useCreateModal } from "@/components/shared/create-modal";

export default function Home() {
  const { setShowCreateModal, CreateModal } = useCreateModal();

  return (
    <Layout>
      <CreateModal />
      <motion.div
        className="px-5 py-16 xl:px-0"
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
        <Image
          src="/bg-lumi.png"
          alt=""
          width={956}
          height={960}
          className="absolute left-1/2 top-20 -translate-x-1/2 opacity-30"
        />
        <motion.h1
          className="mx-auto max-w-xl bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Earn or spend every second, literally</Balancer>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            Lumi allowing tokens to be streamed to users’ wallets instantly with
            just one click. No more individual transactions, just click and
            stream
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-6 flex max-w-xl items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Link
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href="/dashboard"
          >
            <LayoutDashboard />
            <p>Go to Dashboard</p>
          </Link>
          <button
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            onClick={() => setShowCreateModal(true)}
          >
            <Coins />
            <p>Create stream</p>
          </button>
        </motion.div>
        <motion.h1
          className="mt-16 max-w-5xl bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Use cases & Benefits</Balancer>
        </motion.h1>
        <motion.div
          className="mt-4 grid max-w-5xl grid-cols-2 gap-4"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Card title="Payroll">
            <div className="mt-2 text-left text-gray-600">
              Withdrawal of payroll at any time
            </div>
          </Card>
          <Card title="Grants streaming">
            <div className="mt-2 text-left text-gray-600">
              Issue grants without step-by-step payouts
            </div>
          </Card>
          <Card title="Token vesting">
            <div className="mt-2 text-left text-gray-600">
              Transparency token vesting
            </div>
          </Card>
          <Card title="Subscription widget">
            <div className="mt-2 text-left text-gray-600">
              Grant payers extended access (coming soon)
            </div>
          </Card>
          <div className="col-span-2">
            <Card title="Its all about DAO's">
              <div className="mt-2 text-left text-gray-600">
                A reliable token streaming tool that is great for investments,
                grants, airdrops or salaries
              </div>
            </Card>
          </div>
        </motion.div>
        <motion.h1
          className="mt-12 max-w-5xl bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>And more</Balancer>
        </motion.h1>
        <motion.div
          className="mt-4 grid max-w-5xl grid-cols-1 gap-4"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Card title="Smart money">
            <div className="mt-2 text-left text-gray-600">
              Make the money work while it streams in Lumi thanks to integration
              with IncrementFi
            </div>
          </Card>
          <Card title="Enhance token utility">
            <div className="mt-2 text-left text-gray-600">
              Send tokens to the NFT holder and add the extra utility (coming
              soon)
            </div>
          </Card>
          <Card title="Analytics">
            <div className="mt-2 text-left text-gray-600">
              Easy access to viewing and tracking transactions for your
              company’s reports (coming soon)
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

const features = [
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    demo: <WebVitals />,
  },
];
