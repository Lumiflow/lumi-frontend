import Card from "@/components/home/card";
import Layout from "@/components/layout";
import CountingNumbers from "@/components/shared/counting-numbers";
import { useCreateModal } from "@/components/shared/create-modal";
import Timer from "@/components/shared/timer";
import {
  FADE_DOWN_ANIMATION_VARIANTS,
  SUPPORTED_TOKENS,
  SUPPORTED_TOKENS_MAP,
} from "@/lib/constants";
import { IStream } from "@/lib/types";
import classNames from "classnames";
import { useFlowLogin } from "flow/hooks/useFlowLogin";
import {
  claimAvailable,
  getIncomingStreams,
  getOutcomingStreams,
} from "flow/lumi";
import { motion } from "framer-motion";
import { Binary, Coins, Home, Link as LinkIcon, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Image from "next/image";

export default function Dashboard() {
  const { pathname } = useRouter();
  const [update, setUpdate] = useState(0);

  const refresh = () => {
    const up = update + 1;
    setUpdate(up);
  };

  const { setShowCreateModal, CreateModal } = useCreateModal({
    callback: refresh,
  });

  const { user } = useFlowLogin();

  const [incomingStreams, setIncomingStreams] = useState<IStream[]>([]);
  const [outcomingStreams, setOutcomingStreams] = useState<IStream[]>([]);

  const [sendingSum, setSendingSum] = useState({
    flow: 0,
    usdc: 0,
  });
  const [receivingSum, setReceivingSum] = useState({
    flow: 0,
    usdc: 0,
  });

  useEffect(() => {
    const getStreamsList = async () => {
      setShowCreateModal(false);
      if (!user.addr) {
        return;
      }

      const streamsIn = await getIncomingStreams(user.addr);
      const streamsOut = await getOutcomingStreams(user.addr);
      console.log({ streamsIn, streamsOut });

      const streamsInFormatted = streamsIn.map((v: any) => ({
        claimed: Number(v.claimed),
        endTime: Number(v.endTime),
        startTime: Number(v.startTime),
        total: Number(v.total),
        receiver: v.to,
        sender: v.from,
        token: v.tag,
        velocity: Number(v.total) / (Number(v.endTime) - Number(v.startTime)),
        out: false,
        uuid: v.uuid,
      }));
      const receivingSumFlow = streamsInFormatted.reduce(
        (acc: any, cur: any) => {
          if (cur.token === "FLOW") {
            return acc + cur.velocity;
          } else {
            return acc;
          }
        },
        0,
      );
      const receivingSumUsdc = streamsInFormatted.reduce(
        (acc: any, cur: any) => {
          if (cur.token === "USDC") {
            return acc + cur.velocity;
          } else {
            return acc;
          }
        },
        0,
      );

      const streamsOutFormatted = streamsOut.map((v: any) => ({
        claimed: Number(v.claimed),
        endTime: Number(v.endTime),
        startTime: Number(v.startTime),
        total: Number(v.total),
        receiver: v.to,
        sender: v.from,
        token: v.tag,
        velocity: Number(v.total) / (Number(v.endTime) - Number(v.startTime)),
        out: true,
        uuid: v.uuid,
      }));

      const sendingSumFlow = streamsOutFormatted.reduce(
        (acc: any, cur: any) => {
          if (cur.token === "FLOW") {
            return acc + cur.velocity;
          } else {
            return acc;
          }
        },
        0,
      );
      const sendingSumUsdc = streamsOutFormatted.reduce(
        (acc: any, cur: any) => {
          if (cur.token === "USDC") {
            return acc + cur.velocity;
          } else {
            return acc;
          }
        },
        0,
      );

      setIncomingStreams(streamsInFormatted);
      setOutcomingStreams(streamsOutFormatted);
      setSendingSum({
        usdc: sendingSumUsdc,
        flow: sendingSumFlow,
      });
      setReceivingSum({
        usdc: receivingSumUsdc,
        flow: receivingSumFlow,
      });
    };

    getStreamsList();
  }, [user, update]);

  const [withdrawing, setWithdrawing] = useState<any>({});

  const withdraw = async (uuid: string) => {
    setWithdrawing({
      [uuid]: true,
    });
    try {
      console.log({ uuid });
      await claimAvailable(uuid);
    } catch (err) {
      console.error(err);
    } finally {
      setWithdrawing({
        [uuid]: false,
      });
    }
  };

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
        <motion.div
          className="flex items-center justify-center space-x-8 px-5 pb-8"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
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
            <Card title="Incoming streams">
              {/* INCOMING */}
              {incomingStreams.length ? (
                incomingStreams.map((v) => {
                  const alreadyVested =
                    v.velocity * (Date.now() / 1000 - v.startTime);
                  const claimable = alreadyVested - v.claimed;
                  const vestedPercent =
                    alreadyVested / v.total >= 1 ? 1 : alreadyVested / v.total;
                  const tokensStreamed = vestedPercent * v.total;
                  const velocityPerMinute = v.velocity * 60;
                  const token = v.token || "Flow";

                  return (
                    <div
                      key={v.startTime + v.endTime + v.total + v.receiver}
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
                            animate={{ pathLength: vestedPercent }}
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
                          value={Math.ceil(vestedPercent * 100)}
                          duration={2500}
                          className="absolute inset-0 mx-auto flex items-center justify-center font-display text-xl text-[#1D9BF0]"
                        />
                      </div>
                      <div className="ml-6 text-left">
                        <div className="flex flex-col items-start">
                          <div className="flex items-center text-xl">
                            <Link href={`/stream/${v.uuid}`}>
                              Total {v.total} {token}
                            </Link>
                            <div className="ml-2 flex items-center text-xs">
                              {velocityPerMinute.toFixed(4)}{" "}
                              <Image
                                // @ts-expect-error: kek
                                src={SUPPORTED_TOKENS_MAP[token].icon}
                                alt=""
                                width={16}
                                height={16}
                                className="mx-1"
                              />{" "}
                              {token}/min
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">Available now:</span>
                            <CountUp
                              start={0}
                              end={v.total}
                              duration={
                                Date.now() / 1000 > v.endTime
                                  ? 0
                                  : v.endTime - v.startTime
                              }
                              separator=" "
                              decimals={4}
                              enableScrollSpy
                              formattingFn={(number) =>
                                String(
                                  (Date.now() / 1000 > v.endTime
                                    ? number
                                    : number + Number(tokensStreamed.toFixed(4))
                                  ).toFixed(4),
                                )
                              }
                            >
                              {({ countUpRef }) => (
                                <div className="truncate">
                                  <span ref={countUpRef} />
                                </div>
                              )}
                            </CountUp>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center space-x-1 text-sm">
                          <Timer expiryTimestamp={new Date(v.endTime * 1000)} />{" "}
                          <span>remaining</span>
                        </div>
                      </div>
                      <div className="ml-auto flex items-center space-x-8">
                        <div className="flex flex-col text-left">
                          <p className="font-semibold">Sender</p>
                          <p className="text-sm">{v.sender}</p>
                        </div>
                        <button
                          onClick={() => withdraw(v.uuid)}
                          className="ml-auto flex items-center space-x-2"
                        >
                          {withdrawing[v.uuid] && (
                            <Loader className="animate-spin" />
                          )}
                          <span>Withdraw</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="mt-12 flex flex-col items-center justify-center space-y-2 text-gray-600">
                  <div>
                    <Binary />
                  </div>
                  <div>No streams</div>
                </div>
              )}
              <h2 className="mt-4 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
                Outcoming streams
              </h2>
              {/* OUTCOMING */}
              {outcomingStreams.length ? (
                outcomingStreams.map((v) => {
                  const alreadyVested =
                    v.velocity * (Date.now() / 1000 - v.startTime);
                  const claimable = alreadyVested - v.claimed;
                  const vestedPercent =
                    alreadyVested / v.total >= 1 ? 1 : alreadyVested / v.total;
                  const tokensStreamed = vestedPercent * v.total;
                  const velocityPerMinute = v.velocity * 60;
                  const token = v.token || "Flow";

                  return (
                    <div
                      key={v.startTime + v.endTime + v.total + v.receiver}
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
                            animate={{ pathLength: vestedPercent }}
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
                          value={Math.ceil(vestedPercent * 100)}
                          duration={2500}
                          className="absolute inset-0 mx-auto flex items-center justify-center font-display text-xl text-[#1D9BF0]"
                        />
                      </div>
                      <div className="ml-6 text-left">
                        <div className="flex flex-col items-start">
                          <div className="flex items-center text-xl">
                            <Link href={`/stream/${v.uuid}`}>
                              Total {v.total} {token}
                            </Link>
                            <div className="ml-2 flex items-center text-xs">
                              {velocityPerMinute.toFixed(4)}{" "}
                              <Image
                                // @ts-expect-error: kek
                                src={SUPPORTED_TOKENS_MAP[token].icon}
                                alt=""
                                width={16}
                                height={16}
                                className="mx-1"
                              />{" "}
                              {token}/min
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">Available now:</span>
                            <CountUp
                              start={0}
                              end={v.total}
                              duration={
                                Date.now() / 1000 > v.endTime
                                  ? 0
                                  : v.endTime - v.startTime
                              }
                              separator=" "
                              decimals={4}
                              enableScrollSpy
                              formattingFn={(number) =>
                                String(
                                  (Date.now() / 1000 > v.endTime
                                    ? number
                                    : number + Number(tokensStreamed.toFixed(4))
                                  ).toFixed(4),
                                )
                              }
                            >
                              {({ countUpRef }) => (
                                <div className="truncate">
                                  <span ref={countUpRef} />
                                </div>
                              )}
                            </CountUp>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center space-x-1 text-sm">
                          <Timer expiryTimestamp={new Date(v.endTime * 1000)} />{" "}
                          <span>remaining</span>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col text-left">
                        <p className="font-semibold">Receiver</p>
                        <p className="text-sm">{v.receiver}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="mt-12 flex flex-col items-center justify-center space-y-2 text-gray-600">
                  <div>
                    <Binary />
                  </div>
                  <div>No streams</div>
                </div>
              )}
            </Card>
          </motion.div>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Card title="Profile">
              <p className="mt-4 text-left text-lg font-semibold">Receiving</p>
              <div className="mt-2 flex flex-col items-center rounded-xl border border-gray-300 p-4">
                <div className="flex w-full items-center justify-between text-sm">
                  <div>FLOW</div>
                  <div>{(receivingSum.flow * 60).toFixed(4)} FLOW/min</div>
                </div>
                <div className="flex w-full items-center justify-between text-sm">
                  <div>USDC</div>
                  <div>{(receivingSum.usdc * 60).toFixed(4)} USDC/min</div>
                </div>
              </div>
              <p className="mt-4 text-left text-lg font-semibold">Sending</p>
              <div className="mt-2 flex flex-col items-center rounded-xl border border-gray-300 p-4">
                <div className="flex w-full items-center justify-between text-sm">
                  <div>FLOW</div>
                  <div>{(sendingSum.flow * 60).toFixed(4)} FLOW/min</div>
                </div>
                <div className="flex w-full items-center justify-between text-sm">
                  <div>USDC</div>
                  <div>{(sendingSum.usdc * 60).toFixed(4)} USDC/min</div>
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
                        fillOpacity="0.6"
                        width="800"
                        height="216"
                        stroke="none"
                        className="recharts-curve recharts-area-area"
                        d="M0,5C44.444,23,88.889,41,133.333,59C177.778,77,222.222,113,266.667,113C311.111,113,355.556,70.88,400,70.88C444.444,70.88,488.889,118.94,533.333,118.94C577.778,118.94,622.222,106.34,666.667,91.94C711.111,77.54,755.556,55.04,800,32.54L800,221C755.556,221,711.111,221,666.667,221C622.222,221,577.778,221,533.333,221C488.889,221,444.444,221,400,221C355.556,221,311.111,221,266.667,221C222.222,221,177.778,221,133.333,221C88.889,221,44.444,221,0,221Z"
                      ></path>
                      <path
                        stroke="#77b5ef"
                        fill="none"
                        fillOpacity="0.6"
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
