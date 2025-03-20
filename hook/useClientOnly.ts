"use client";
import { ensureClient } from "@/lib/utils/ensureClient";
import { useEffect } from "react";

export const useClientOnly = () => {
  useEffect(() => {
    ensureClient();
  }, []);
};
