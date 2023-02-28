import Card from "@/components/home/card";
import Layout from "@/components/layout";
import {
  FADE_DOWN_ANIMATION_VARIANTS,
  SUPPORTED_TOKENS_MAP,
} from "@/lib/constants";
import { IStream } from "@/lib/types";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import classNames from "classnames";
import { useFlowLogin } from "flow/hooks/useFlowLogin";
import { getIncomingStreams, getOutcomingStreams } from "flow/lumi";
import { motion } from "framer-motion";
import { Copy, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import Timer from "@/components/shared/timer";
import { useCopyToClipboard } from "react-use";

const StreamDetail = () => {
  const { query } = useRouter();
  const { uuid } = query;
  const [state, copyToClipboard] = useCopyToClipboard();

  const { user } = useFlowLogin();

  const [stream, setStream] = useState<IStream | null>(null);

  useEffect(() => {
    const getStreamsList = async () => {
      if (!user.addr) {
        return;
      }

      const streamsIn = await getIncomingStreams(user.addr);
      const streamsOut = await getOutcomingStreams(user.addr);

      const streamsInFormatted = streamsIn.map((v: any) => ({
        claimed: Number(v.claimed),
        endTime: Number(v.endTime),
        startTime: Number(v.startTime),
        total: Number(v.total),
        receiver: v.to,
        token: v.tag,
        velocity: Number(v.total) / (Number(v.endTime) - Number(v.startTime)),
        out: false,
        uuid: v.uuid,
      }));

      const streamsOutFormatted = streamsOut.map((v: any) => ({
        claimed: Number(v.claimed),
        endTime: Number(v.endTime),
        startTime: Number(v.startTime),
        total: Number(v.total),
        receiver: v.to,
        token: v.tag,
        velocity: Number(v.total) / (Number(v.endTime) - Number(v.startTime)),
        out: true,
        uuid: v.uuid,
      }));

      const streams = [...streamsInFormatted, ...streamsOutFormatted];

      const stream = streams.find((v) => v.uuid === uuid);

      setStream(stream);
    };

    getStreamsList();
  }, [user, uuid]);

  if (!stream) {
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
            className="mx-auto max-w-3xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Card title="Stream detail">
              <div className="my-4">Please, connect wallet</div>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    );
  }

  const alreadyVested =
    stream.velocity * (Date.now() / 1000 - stream.startTime);
  const claimable = alreadyVested - stream.claimed;
  const vestedPercent =
    alreadyVested / stream.total >= 1 ? 1 : alreadyVested / stream.total;
  const tokensStreamed = vestedPercent * stream.total;
  const velocityPerMinute = stream.velocity * 60;
  const token = stream.token || "Flow";

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
              <div className="mt-4 flex items-center space-x-2">
                <div className="text-xl">
                  Total {stream.total} {token}
                </div>
                <div className="flex items-center text-sm">
                  {stream.velocity.toFixed(5)}{" "}
                  <Image
                    // @ts-expect-error: kek
                    src={SUPPORTED_TOKENS_MAP[token].icon}
                    alt=""
                    width={16}
                    height={16}
                    className="mx-1"
                  />{" "}
                  {token}/minute
                </div>
              </div>
              <div className="my-2">
                <span>Already claimable:</span>
                <CountUp
                  start={0}
                  end={stream.total}
                  duration={
                    Date.now() / 1000 > stream.endTime
                      ? 0
                      : stream.endTime - stream.startTime
                  }
                  separator=" "
                  decimals={4}
                  enableScrollSpy
                  formattingFn={(number) =>
                    String(
                      (Date.now() / 1000 > stream.endTime
                        ? number
                        : number + Number(tokensStreamed.toFixed(4))
                      ).toFixed(4),
                    )
                  }
                >
                  {({ countUpRef }) => (
                    <div className="truncate font-semibold">
                      <span ref={countUpRef} />
                    </div>
                  )}
                </CountUp>
              </div>
              <ProgressPrimitive.Root
                value={Math.ceil(vestedPercent * 100)}
                className="mt-4 h-3 w-1/2 overflow-hidden rounded-full border border-gray-700 bg-gray-300"
              >
                <ProgressPrimitive.Indicator
                  style={{ width: `${Math.ceil(vestedPercent * 100)}%` }}
                  className="h-full bg-[#1D9BF0] duration-300 ease-in-out"
                />
              </ProgressPrimitive.Root>
              <div className="mt-2 flex flex-col">
                <span>Remaining time:</span>
                <Timer expiryTimestamp={new Date(stream.endTime * 1000)} />{" "}
              </div>
              <div className="mt-4">
                <div className="font-semibold">Link to the stream</div>
                <div className="flex items-center space-x-2">
                  <div>{window.location.href}</div>
                  <button
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    <Copy />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-col text-left">
                <p className="font-semibold">Receiver</p>
                <p className="text-sm">{stream.receiver}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default StreamDetail;
