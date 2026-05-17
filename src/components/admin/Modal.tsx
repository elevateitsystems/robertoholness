"use client";

import React, { useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  onSubmit?: (e: React.FormEvent) => void;
  isSaving?: boolean;
  submitText?: string;
  showFooter?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  onSubmit,
  isSaving = false,
  submitText = "Save Changes",
  showFooter = true,
}: ModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formContent = (
    <div className="relative flex flex-col w-full bg-white rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden transform">
      {/* Top Brand Gradient Ribbon */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-[#FF6B35] to-primary" />

      {/* Modal Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/55 mt-1.5">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 hover:rotate-90 transition-all duration-300 p-1.5 rounded-lg hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-16rem)]">
        {children}
      </div>

      {/* Modal Footer */}
      {showFooter && (
        <div className="px-6 py-4 bg-gray-50/55 border-t border-gray-100 flex justify-end items-center gap-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="rounded-lg font-semibold border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type={onSubmit ? "submit" : "button"}
            disabled={isSaving}
            className="rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold flex items-center gap-2 px-5 transition-colors shadow-md shadow-primary/10"
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : submitText}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className={cn("w-full z-10", sizeClasses[size])}
          >
            {onSubmit ? (
              <form onSubmit={onSubmit} className="w-full">
                {formContent}
              </form>
            ) : (
              formContent
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
