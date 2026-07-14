"use client";

import { useEffect } from "react";

import { captureInquiryAttribution } from "../lib/inquiry-client";

export default function InquiryAttribution() {
  useEffect(() => {
    captureInquiryAttribution();
  }, []);

  return null;
}
