"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Chrome,
  ArrowRight,
  MoreHorizontal,
  Star,
  ImageIcon,
  Link,
  SmilePlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Trusted from "./trusted";
import Image from "next/image";
function Hero() {
  return (
    <div className="relative flex items-center justify-center py-20 lg:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 pointer-events-none" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float" />
        <div
          className="absolute -right-4 top-40 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute left-20 bottom-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-blue-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-zinc-600">
                  write better replies
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-800 leading-tight">
                Write Better{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  LinkedIn
                </span>
                <br />
                <span className="bg-gradient-to-r bg-violet-500 from-violet-500 to-violet-600 bg-clip-text text-transparent">
                  Messages
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 max-w-xl mx-auto lg:mx-0">
                Stuck on what to say? Our tool helps you create friendly, custom
                LinkedIn messages that get replies. Say goodbye to awkward
                introductions!
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-6 font-medium gap-2 rounded-full border-2 hover:border-violet-200 hover:bg-white/50 hover:text-violet-600 transition-all duration-200"
              >
                <Chrome className="w-5 h-5" />
                Get it for Chrome
                <span className="hidden sm:inline"> - It's Free</span>
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-6 rounded-full font-medium bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-200 transition-all duration-200 group"
              >
                Try it Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="mt-12">
              <Trusted className="text-sm text-zinc-800" />
            </div>
          </div>

          {/* Right Column - Chat UI */}
          <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
            <HeroLeft />
          </div>
        </div>
      </div>
    </div>
  );
}

const HeroLeft = () => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    "yo, i want this job. just hit me up with what i need to do next, no messing around.",
    "Hi Emma, thank you for reaching out. I am very interested in the opportunity and would appreciate further details regarding the role and next steps at your earliest convenience.",
  ];

  useEffect(() => {
    let isActive = true;

    const typeMessage = async (message: string) => {
      if (!isActive) return;
      setIsTyping(true);
      let currentText = "";
      const typingSpeed = 30;

      for (let i = 0; i <= message.length; i++) {
        if (!isActive) return;
        currentText = message.slice(0, i);
        setInputValue(currentText);
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      }

      if (!isActive) return;
      setIsTyping(false);
    };

    const animateMessages = async () => {
      while (isActive) {
        setStep(0);
        await typeMessage(messages[0]);
        if (!isActive) return;
        await new Promise((resolve) => setTimeout(resolve, 4000));

        if (!isActive) return;
        setStep(1);
        await typeMessage(messages[1]);
        if (!isActive) return;
        await new Promise((resolve) => setTimeout(resolve, 6000));
      }
    };

    animateMessages();

    return () => {
      isActive = false;
      setIsTyping(false);
    };
  }, []);
  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative z-10 hover:shadow-3xl transition-shadow duration-300">
      {/* Header */}
      <div className="py-3 px-6 bg-gradient-to-r from-zinc-600 to-zinc-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <div className="font-semibold text-lg">Emma Thompson</div>
              <div className="text-xs text-blue-100">
                Senior Product Designer at Google
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Star className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white min-h-[200px]">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
            alt="Emma"
            className="w-10 h-10 rounded-full border-2 border-blue-100 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900">Emma Thompson</span>
              <span className="text-sm text-gray-500">2m ago</span>
            </div>
            <div className="space-y-2">
              <p className="bg-zinc-100 rounded-2xl rounded-tl-none px-4 py-2.5 text-gray-700 inline-block max-w-md shadow-sm">
                Hey Alex, I recently came across your outstanding UX work, and
                I’m truly impressed by your creativity. I’d love to explore how
                your talent might fit into our growing design team at Google.
                Would you be open to chatting about potential opportunities?
              </p>
            </div>
          </div>
        </div>
      </div>
      <span className=" block border-t"></span>
      <div className="pt-6 mx-7 bg-white ">
        <div className="bg-gray-50 overflow-hidden rounded-2xl shadow-sm border border-gray-100">
          <div
            className={`px-4 py-3 flex items-center gap-3 border-b border-gray-100 transition-all duration-500 ${
              step === 0 ? "bg-zinc-50/50" : "bg-blue-50/50"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                step === 0 ? "bg-zinc-500" : "bg-blue-500"
              }`}
            />
            <div className="flex-1">
              <div
                className={`text-sm font-medium transition-all duration-500 ${
                  step === 0 ? "text-zinc-700" : "text-blue-700"
                }`}
              >
                {step === 0 ? "Basic Response" : "Enhanced Response"}
              </div>
              <div
                className={`text-xs transition-all duration-500 ${
                  step === 0 ? "text-zinc-600/70" : "text-blue-600/70"
                }`}
              >
                {step === 0
                  ? "Direct but could be more engaging"
                  : "Professional, personalized, and shows genuine interest"}
              </div>
            </div>
            {step === 0 ? (
              <AlertCircle className="w-5 h-5 text-zinc-500" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
            )}
          </div>
          <div className="p-4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className=" text-gray-600 w-full bg-transparent resize-none outline-none min-h-[97px] placeholder-gray-400 transition-all duration-700  "
              rows={3}
              readOnly
            ></textarea>
          </div>
        </div>
        <div className=" px-4 pb-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Link className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <SmilePlus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            {isTyping ? (
              <div
                className={`p-2 rounded-xl ${
                  step === 0 ? "bg-zinc-50" : "bg-blue-50"
                } flex items-center gap-1`}
              >
                <div
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    step === 0 ? "bg-zinc-500" : "bg-blue-500"
                  }`}
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    step === 0 ? "bg-zinc-500" : "bg-blue-500"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    step === 0 ? "bg-zinc-500" : "bg-blue-500"
                  }`}
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            ) : (
              <button
                className={`rounded-xl transition-all duration-500 group`}
              >
                <Image src="/logo.svg" alt="logo" width={30} height={30} />
              </button>
            )}
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-1 rounded-full flex items-center gap-2 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-colors shadow-md hover:shadow-lg">
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
