import {
  FADE_DOWN_ANIMATION_VARIANTS,
  FADE_IN_ANIMATION_SETTINGS,
} from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Twitter } from "lucide-react";
import { useFlowLogin } from "flow/hooks/useFlowLogin";
import { useCreateModal } from "../shared/create-modal";
import LumiLogo from "../shared/lumi-logo";
import classNames from "classnames";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const { user } = useFlowLogin();

  return (
    <>
      <Meta {...meta} />
      <SignInModal />
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-10 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            {/* <LumiLogo /> */}
            <div
              className={classNames(
                "lumi h-5 w-5 rounded-full after:transition-opacity",
                scrolled
                  ? "bg-black shadow-none after:opacity-0"
                  : "bg-white after:opacity-100",
              )}
            ></div>
            <p
              className={classNames(
                "ml-2 transition-colors",
                scrolled ? "text-black" : "text-white",
              )}
            >
              Lumi
            </p>
          </Link>
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              <motion.a
                href="https://twitter.com/maximal_dao/"
                target="_blank"
                rel="noreferrer"
                className="flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                <Twitter className="h-5 w-5 text-[#1d9bf0]" />
                <p className="text-sm font-semibold text-[#1d9bf0]">
                  Introducing Lumi
                </p>
              </motion.a>
            </AnimatePresence>
            <AnimatePresence>
              <motion.a
                href="https://flow.com/"
                target="_blank"
                rel="noreferrer"
                className="flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-[#00EF8B] border-opacity-80 px-7 py-2 text-[#00EF8B] transition-colors hover:bg-[#00EF8B] hover:bg-opacity-10"
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                <Image
                  src="/flow-flow-logo.svg"
                  alt=""
                  className="h-5 w-5"
                  width={20}
                  height={20}
                />
                <p className="text-sm font-semibold">#OnFlow</p>
              </motion.a>
            </AnimatePresence>
            <AnimatePresence>
              {!user.loggedIn ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Connect wallet
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center py-20">
        {children}
      </main>
    </>
  );
}
