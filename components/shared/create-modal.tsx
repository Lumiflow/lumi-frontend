import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import { Flower } from "lucide-react";
import { useFlowLogin } from "flow/hooks/useFlowLogin";
import * as Label from "@radix-ui/react-label";
import classNames from "classnames";
import { Switch } from "@headlessui/react";
import Popover from "./popover";

const CreateModal = ({
  showCreateModal,
  setShowCreateModal,
}: {
  showCreateModal: boolean;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
}) => {
  // const [signInClicked, setSignInClicked] = useState(false);

  // const { user } = useFlowLogin();
  const [enabled, setEnabled] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Modal showModal={showCreateModal} setShowModal={setShowCreateModal}>
      <div className="w-full max-w-fit overflow-hidden shadow-xl md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="text-left font-display text-2xl font-bold">
            Create stream
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="receiver"
              >
                Receiver{" "}
              </Label.Root>
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                type="text"
                id="receiver"
                placeholder="flow.find"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="startDate"
              >
                Stream start date{" "}
              </Label.Root>
              {/* @todo date picker */}
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                type="text"
                id="startDate"
                placeholder="02.02.2023"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="amountToStream"
              >
                Amount to stream{" "}
              </Label.Root>
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                type="text"
                id="amountToStream"
                placeholder="100"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="token"
              >
                Token{" "}
              </Label.Root>
              {/* @todo select */}
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                type="text"
                id="token"
                placeholder="USDC"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="endDate"
              >
                Stream end date{" "}
              </Label.Root>
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                type="text"
                id="endDate"
                placeholder="04.02.2023"
              />
            </div>
          </div>
          <div className="mt-4 w-full text-left">
            <p className="font-medium">
              Type of stream{" "}
              <Popover
                content="Make money work it"
                align="end"
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
              >
                <button
                  onClick={() => setOpenPopover(!openPopover)}
                  className="ml-1 text-xs text-blue-400 underline"
                >
                  Wat?
                </button>
              </Popover>
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <p className="text-sm">Normal</p>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? " bg-gray-900" : "bg-gray-600"}
          relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <p className="text-sm">Make money work</p>
            </div>
          </div>
          <div className="flex w-full items-end justify-between">
            <div className="mt-4 w-[300px] text-left ">
              <p>Total amount and fee:</p>
              <div className="mt-1 flex items-center justify-between text-left text-sm text-gray-500">
                <p>Amount to be streamed</p>
                <p>10 USDC</p>
              </div>
              <div className="flex items-center justify-between  text-left text-sm text-gray-500">
                <p>Fee</p>
                <p>0</p>
              </div>
            </div>
            <button>Create</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export function useCreateModal() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const CreateModalCallback = useCallback(() => {
    return (
      <CreateModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
    );
  }, [showCreateModal, setShowCreateModal]);

  return useMemo(
    () => ({ setShowCreateModal, CreateModal: CreateModalCallback }),
    [setShowCreateModal, CreateModalCallback],
  );
}
