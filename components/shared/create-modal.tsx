import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useFlowLogin } from "flow/hooks/useFlowLogin";
import * as Label from "@radix-ui/react-label";
import { Switch } from "@headlessui/react";
import Popover from "./popover";
import { mintTestTokens, queryTokens } from "flow/helper";
import Datepicker from "react-tailwindcss-datepicker";
import { Select } from "./select";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { createStreamFlow } from "flow/lumi";
import { Loader } from "lucide-react";

const CreateModal = ({
  showCreateModal,
  setShowCreateModal,
}: {
  showCreateModal: boolean;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
}) => {
  // const [signInClicked, setSignInClicked] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const streamAmount = watch("amount");

  // const { user } = useFlowLogin();
  const [enabledLending, setEnabledLending] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const { user } = useFlowLogin();

  const [streamStartDate, setStreamStartDate] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const [streamEndDate, setStreamEndDate] = useState<any>({
    startDate: null,
    endDate: null,
  });

  const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS[0].title);

  const [creatingStream, setCreatingStream] = useState(false);

  const onSubmit = async (data: any) => {
    if (!streamStartDate.startDate || !streamEndDate.startDate) {
      return;
    }
    const startDate = Date.parse(streamStartDate.startDate) / 1000;
    const endDate = Date.parse(streamEndDate.startDate) / 1000;
    const resultData = {
      ...data,
      token: selectedToken,
      startDate,
      endDate,
      enabledLending,
    };
    console.log({ resultData });

    try {
      setCreatingStream(true);
      await createStreamFlow(
        resultData.receiver,
        Number(resultData.amount).toFixed(8),
        resultData.startDate.toFixed(8),
        resultData.endDate.toFixed(8),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingStream(false);
    }
  };

  return (
    <Modal showModal={showCreateModal} setShowModal={setShowCreateModal}>
      <div className="w-full max-w-fit shadow-xl md:rounded-2xl md:border md:border-gray-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:rounded-2xl md:px-16"
        >
          <h3 className="text-left font-display text-2xl font-bold">
            Create stream
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="receiver"
              >
                Receiver{" "}
              </Label.Root>
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-75 hover:border-gray-800 focus:border-blue-500 focus:outline-none focus:ring-blue-500/20 active:bg-gray-100"
                type="text"
                id="receiver"
                placeholder="flow.find"
                {...register("receiver", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="startDate"
              >
                Stream start date{" "}
              </Label.Root>
              <Datepicker
                inputClassName="h-9 rounded-md border border-gray-300 px-3 py-2 transition-all font-normal duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                useRange={false}
                asSingle={true}
                value={streamStartDate}
                onChange={(v: any) => setStreamStartDate(v)}
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
                className="h-9 rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-75 hover:border-gray-800 focus:border-blue-500 focus:outline-none focus:ring-blue-500/20 active:bg-gray-100"
                type="number"
                id="amountToStream"
                placeholder="100"
                {...register("amount", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="token"
              >
                Token{" "}
              </Label.Root>
              <Select
                value={selectedToken}
                onValueChange={(v: any) => setSelectedToken(v)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label.Root
                className="text-left text-sm font-medium"
                htmlFor="endDate"
              >
                Stream end date{" "}
              </Label.Root>
              <Datepicker
                inputClassName="h-9 rounded-md border border-gray-300 px-3 py-2 transition-all font-normal duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                useRange={false}
                asSingle={true}
                value={streamEndDate}
                onChange={(v: any) => setStreamEndDate(v)}
              />
            </div>
          </div>
          <div className="mt-5 w-full text-left">
            <p className="font-medium">
              Type of stream{" "}
              <Popover
                content={
                  <div className="max-w-[200px] p-4 text-sm">
                    If you turn on make money work, then IncrementFi will bring
                    yield on streaming money
                  </div>
                }
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
                checked={enabledLending}
                onChange={setEnabledLending}
                className={`${enabledLending ? " bg-gray-900" : "bg-gray-600"}
          relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Make money work</span>
                <span
                  aria-hidden="true"
                  className={`${
                    enabledLending ? "translate-x-4" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <p className="text-sm">Make money work</p>
            </div>
          </div>
          <div className="mt-5 flex w-full items-end justify-between">
            <div className="w-[300px] text-left ">
              <p>Total amount and fee:</p>
              <div className="mt-1 flex items-center justify-between text-left text-sm text-gray-500">
                <p>Amount to be streamed</p>
                <p className="flex items-center">
                  <span className="mr-1 block max-w-[100px] truncate">
                    {streamAmount || 0}
                  </span>{" "}
                  {selectedToken}
                </p>
              </div>
              <div className="flex items-center justify-between  text-left text-sm text-gray-500">
                <p>Fee</p>
                <p>0</p>
              </div>
            </div>
            <button className="flex items-center space-x-2">
              {creatingStream && <Loader className="animate-spin" />}
              <span>Create</span>
            </button>
          </div>
        </form>
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
