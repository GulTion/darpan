import React, { useEffect } from "react";
import SimplePeer, { SimplePeer } from "simple-peer";

export default function SP() {
  useEffect(() => {
    let p = new SimplePeer();
  }, []);
  return <div className="SP"></div>;
}
