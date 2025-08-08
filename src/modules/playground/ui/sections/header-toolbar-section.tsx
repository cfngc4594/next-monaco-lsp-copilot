"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useConfettiEffects } from "@/modules/playground/hooks/use-confetti-effects";
import { useEditorStore } from "@/modules/playground/stores/editor-store";
import {
  BrainCircuitIcon,
  BugIcon,
  CloudUploadIcon,
  MoonIcon,
  PlayIcon,
  SunIcon,
  TextCursorInputIcon,
  UserRoundIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

export const HeaderToolbarSection = () => {
  const { setTheme } = useTheme();
  const {
    languageServerEnabled,
    autoCompleteEnabled,
    setLanguageServerEnabled,
    setAutoCompleteEnabled,
  } = useEditorStore();

  const { handlePopperEffect, handleFireworksEffect, handleStarsEffect } =
    useConfettiEffects();

  return (
    <header className="h-12 flex items-center relative">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="hidden md:flex items-center space-x-4">
          <h1 className="text-2xl font-bold tracking-wider font-['IM_Fell_English_SC',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Judge4c
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="flex flex-none">
            <Button
              size="icon"
              variant="secondary"
              className="p-1.5 size-8 cursor-pointer rounded-r-none border-r border-background"
              onClick={() => setLanguageServerEnabled(!languageServerEnabled)}
              aria-label={
                languageServerEnabled
                  ? "Disable language server"
                  : "Enable language server"
              }
            >
              <BrainCircuitIcon
                size={16}
                aria-hidden="true"
                className={
                  languageServerEnabled
                    ? "text-green-500 transition-colors"
                    : "opacity-50 transition-colors"
                }
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="p-1.5 size-8 cursor-pointer rounded-l-none"
              onClick={() => setAutoCompleteEnabled(!autoCompleteEnabled)}
              aria-label={
                autoCompleteEnabled
                  ? "Disable auto complete"
                  : "Enable auto complete"
              }
            >
              <TextCursorInputIcon
                size={16}
                aria-hidden="true"
                className={
                  autoCompleteEnabled
                    ? "text-green-500 transition-colors"
                    : "opacity-50 transition-colors"
                }
              />
            </Button>
          </div>
          <Avatar className="cursor-pointer">
            <AvatarFallback>
              <UserRoundIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        <Button
          size="icon"
          variant="secondary"
          className="group p-1.5 size-8 text-yellow-500 rounded-r-none cursor-pointer"
          onClick={handleStarsEffect}
          aria-label="Trigger stars effect"
        >
          <BugIcon
            className="transition-transform group-hover:-translate-y-0.5"
            size={16}
            aria-hidden="true"
          />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="group p-1.5 size-8 rounded-none border-x border-background cursor-pointer"
          onClick={handleFireworksEffect}
          aria-label="Trigger fireworks effect"
        >
          <PlayIcon
            className="transition-transform group-hover:-translate-y-0.5"
            size={16}
            aria-hidden="true"
          />
        </Button>
        <Button
          variant="secondary"
          className="group h-8 px-3 py-1.5 text-green-500 rounded-l-none cursor-pointer"
          onClick={handlePopperEffect}
          aria-label="Submit code"
        >
          <CloudUploadIcon
            className="transition-transform group-hover:-translate-y-0.5"
            size={16}
            aria-hidden="true"
          />
          提交
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="ml-2 p-1.5 size-8 cursor-pointer"
          onClick={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          aria-label="Toggle dark mode"
        >
          <MoonIcon
            size={16}
            className="shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
            aria-hidden="true"
          />
          <SunIcon
            size={16}
            className="absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
            aria-hidden="true"
          />
        </Button>
      </div>
    </header>
  );
};
