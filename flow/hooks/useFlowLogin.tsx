import React, { useEffect, useState } from "react";

// @ts-expect-error: no typing
import * as fcl from "@onflow/fcl";

interface IUser {
  loggedIn: boolean | null;
  addr?: string;
}

export const useFlowLogin = (): {
  user: IUser;
  logIn: () => void;
  signUp: () => void;
  logOut: () => void;
} => {
  const [user, setUser] = useState<IUser>({ loggedIn: null });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const logIn = async () => {
    await fcl.logIn();
  };

  const signUp = () => {
    fcl.signUp();
  };

  const logOut = async () => {
    await fcl.unauthenticate();
  };

  return { user, logIn, signUp, logOut };
};
