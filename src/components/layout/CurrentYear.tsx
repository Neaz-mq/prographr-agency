"use client";

import { useSyncExternalStore } from "react";

/* Browser-er shomoy theke bochor ney, tai rebuild/redeploy lage na.
   useSyncExternalStore: prerender/hydration-e getServerSnapshot (null) use hoy,
   tai new Date() prerender-e cholbe na; hydrate-er por client-e sothik bochor dekhay.
   Effect ba setState lage na, tai cascading render-er lint error-o ashbe na. */
const subscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => null;

export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getClientYear, getServerYear);

  return (
    <span style={{ display: "inline-block", minWidth: "4ch" }}>
      {year ?? " "}
    </span>
  );
}