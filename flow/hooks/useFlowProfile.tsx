import React, { useCallback, useState } from "react";
// @ts-expect-error: missing typings
import * as fcl from "@onflow/fcl";

const useFlowProfile = (userAddress?: string) => {
  const [profile, setProfile] = useState<{ color: string } | undefined>();

  const queryProfile = useCallback(async () => {
    if (!userAddress) {
      return;
    }

    const profile = await fcl.query({
      cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
      args: (arg: any, t: any) => [arg(userAddress, t.Address)],
    });

    setProfile(profile);
  }, [userAddress]);

  return { profile, queryProfile };
};

export default useFlowProfile;
