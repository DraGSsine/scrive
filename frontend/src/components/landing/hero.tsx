"use client";
import React, { useEffect, useState } from "react";
import {
  Chrome,
  Play,
  X,
  CheckCircle2,
  Star,
  MoreHorizontal,
  AlertCircle,
  SmilePlus,
  LinkIcon,
  ImageIcon,
  Send,
} from "lucide-react";
import Trusted from "./trusted";
import Image from "next/image";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Close modal with escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative flex items-center justify-center py-20 md:py-24 min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 pointer-events-none" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 w-36 md:w-72 h-36 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
        <div className="absolute -right-4 top-40 w-36 md:w-72 h-36 md:h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute left-20 bottom-20 w-36 md:w-72 h-36 md:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="space-y-4 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/50 backdrop-blur-sm border border-blue-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-zinc-600">
                  Boost Your LinkedIn Game
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-800 leading-tight">
                Supercharge Your{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  LinkedIn
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-500 to-violet-600 bg-clip-text text-transparent">
                  Connections
                </span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-zinc-600 max-w-xl mx-auto lg:mx-0">
                Tired of blank stares at your LinkedIn messages? Our AI crafts
                killer, personalized intros that grab attention and spark real
                conversations no more crickets!
              </p>
            </div>

            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
              <a
                href="https://chromewebstore.google.com/detail/hfadoenckgoahdcacngfebieckmhemef?utm_source=item-share-cp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-medium flex items-center justify-center gap-2 rounded-full border-2 hover:border-violet-200 bg-white/50 hover:bg-white/80 hover:text-violet-600 transition-all duration-500"
              >
                <Chrome className="w-4 h-4 md:w-5 md:h-5" />
                <span className="whitespace-nowrap">Add to Chrome</span>
                <span className="hidden sm:inline ml-1">- Free!</span>
              </a>
              <button
                onClick={openModal}
                className="w-full sm:w-auto h-10 md:h-12 px-4 md:px-6 text-sm md:text-base rounded-full font-medium flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-200 transition-all duration-500 group"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Demo
              </button>
            </div>

            <div className="mt-8 md:mt-12">
              <Trusted className="" />
            </div>
          </div>

          {/* Right Column - Chat UI */}
          <div className="relative w-full max-w-lg md:max-w-2xl mx-auto lg:mx-0 mt-8 lg:mt-0">
            <HeroLeft />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={closeModal}
            aria-hidden="true"
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden animate-scaleIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Witness the LinkedIn Glow-Up
                  </h3>
                  <p className="text-sm text-gray-500">
                    Discover how to make connections that click
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2.5 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/atv88nZuP_s?si=ascLCj4TFw9GU_ea"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    "I went from ignored to inbox hero—landed a gig in weeks!"
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    Close
                  </button>
                  <a
                    href="https://chromewebstore.google.com/detail/hfadoenckgoahdcacngfebieckmhemef?utm_source=item-share-cp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-full hover:bg-violet-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    Grab It Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const HeroLeft = () => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const messages = [
      "I'm Interested.",
      `Hi Emma,\nThanks for reaching out! I’m impressed by Google Cloud’s innovations and believe my background in cloud architecture benefit your team. Are you available for a quick chat on Tuesday?`,
    ];
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
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
      {/* Header */}
      <div className="py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image src="/emma.avif" width={60} height={60} alt="Profile" />
              </div>
              <div className="absolute bottom-1 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
            </div>
            <div>
              <div className="font-medium">Emma Thompson</div>
              <div className="text-xs font-normal text-gray-50">
                Head of Recruiting at Google Cloud
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <Star className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Message */}
      <div className="px-4 py-10 border-gray-100 flex-grow">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
            <Image src="/emma.avif" width={50} height={50} alt="Profile" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-medium text-gray-900">Emma Thompson</span>
              <span className="text-xs text-gray-500">2m</span>
            </div>
            <div className="bg-zinc-100 rounded-lg rounded-tl-none px-4 py-3 text-gray-700 inline-block max-w-full shadow-sm border border-gray-100">
              <p className="mb-1 text-sm font-medium">Hi Alex,</p>
              <p className="text-sm">
                I hope this message finds you well. I've been following your
                work and think you’d be a great fit for our team. Would you be
                open to a brief chat about potential opportunities at Google?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Section */}
      <div className="p-4 border-t mt-20 border-gray-100">
        {/* Response Type Pills */}
        <div className="flex gap-2 mb-3">
          <button
            className={`py-1.5 px-3 rounded-full text-sm font-medium flex items-center gap-1.5 ${
              step === 0
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>Without Scrive</span>
            {step === 0 && <AlertCircle className="w-4 h-4" />}
          </button>
          <button
            className={`py-1.5 px-3 rounded-full text-sm font-medium flex items-center gap-1.5 ${
              step === 1
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>With Scrive</span>
            {step === 1 && <CheckCircle2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Message Input Area */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-gray-700 w-full bg-transparent resize-none outline-none min-h-[100px] placeholder-gray-400"
              rows={4}
              placeholder="Type your response..."
              readOnly
            ></textarea>
          </div>

          {/* Message Actions */}
          <div className="px-3 py-2.5 flex items-center justify-between border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-200 rounded-md transition-colors">
                <ImageIcon className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded-md transition-colors">
                <LinkIcon className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded-md transition-colors">
                <SmilePlus className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {isTyping ? (
                <div
                  className={`px-2 py-1.5 rounded-md ${
                    step === 0 ? "bg-gray-100" : "bg-blue-50"
                  } flex items-center gap-1`}
                >
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      step === 0 ? "bg-gray-500" : "bg-blue-500"
                    }`}
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      step === 0 ? "bg-gray-500" : "bg-blue-500"
                    }`}
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      step === 0 ? "bg-gray-500" : "bg-blue-500"
                    }`}
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              ) : (
                <div
                  className={`text-sm font-medium ${
                    step === 0 ? "text-gray-500" : "text-blue-600"
                  }`}
                >
                  {step === 0 ? "Meh" : "Wow"}
                </div>
              )}
              <button
                className={`p-2 rounded-md flex items-center justify-center text-white shadow-sm hover:shadow w-9 h-9 transition-all ${
                  step === 0
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quality indicator */}
        <div className="mt-3 flex justify-end">
          <div
            className={`text-xs flex items-center gap-1 ${
              step === 0 ? "text-gray-500" : "text-blue-600"
            }`}
          >
            {step === 0 ? (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Boring and bland</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Fresh and friendly</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
