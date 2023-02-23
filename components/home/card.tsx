import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-md">
      <div className="text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
