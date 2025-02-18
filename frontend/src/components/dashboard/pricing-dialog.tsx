"use client";
import React, { useState } from "react";
import { Flame, Zap, Diamond, Check, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useUserInfo } from "@/lib/queries";
import { api } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

interface PricingCardProps {
  price: string;
  planName: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  icon: React.ReactNode;
  onSelect: () => void;
  isLoading?: boolean;
  selectedPlan?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  price,
  planName,
  description,
  features,
  isPopular = false,
  icon,
  onSelect,
  isLoading,
  selectedPlan,
}) => {
  const isSelected = selectedPlan === planName;

  return (
    <div
      className={`relative rounded-xl transition-all duration-500 hover:scale-105 ${
        isPopular
          ? "bg-violet-600 text-white ring-2 ring-violet-500"
          : "bg-white border border-zinc-100 hover:border-violet-200 hover:shadow-lg"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full bg-zinc-800 text-white text-xs font-medium shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="mb-6">
          <div
            className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transform transition-transform duration-500 hover:rotate-12 ${
              isPopular
                ? "bg-violet-500 text-white"
                : "bg-violet-50 text-violet-500"
            }`}
          >
            {icon}
          </div>

          <h3
            className={`text-lg font-bold ${
              isPopular ? "text-white" : "text-zinc-800"
            }`}
          >
            {planName}
          </h3>
          <p
            className={`mt-2 text-sm ${
              isPopular ? "text-zinc-100" : "text-zinc-500"
            }`}
          >
            {description}
          </p>

          <div className="mt-5 flex items-baseline">
            <span
              className={`text-4xl font-bold ${
                isPopular ? "text-white" : "text-zinc-800"
              }`}
            >
              ${price}
            </span>
            <span
              className={`ml-2 text-sm ${
                isPopular ? "text-zinc-100" : "text-zinc-500"
              }`}
            >
              /month
            </span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className={`mt-1 rounded-full p-1 ${
                  isPopular ? "bg-violet-500" : "bg-violet-50"
                }`}
              >
                <Check
                  className={`w-3 h-3 ${
                    isPopular ? "text-white" : "text-violet-600"
                  }`}
                />
              </div>
              <span
                className={`text-sm leading-relaxed ${
                  isPopular ? "text-zinc-100" : "text-zinc-600"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center ${
            isPopular
              ? "bg-white text-violet-600 hover:bg-zinc-50"
              : "bg-violet-600 text-white hover:bg-violet-700"
          } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isLoading && isSelected ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : null}
          {isLoading && isSelected ? "Processing..." : "Get Started"}
        </button>
      </div>
    </div>
  );
};

const SubscriptionDialog = () => {
  const [planName, setPlanName] = useState<string>("Starter");
  const { data } = useUserInfo();
  const { mutate, isPending } = useMutation({
    mutationFn: async (plan: string) => {
      const response = await api.post("/payments/create-checkout-session", {
        plan,
      });
      return response.data;
    },
    onSuccess: (data: {url:string}) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description:
          "An error occurred while processing your request. Please try again later.",
      });
    },
  });
  console.log(data);
  if (data?.plan !== "none") return null;

  const handlePlanSelection = (selectedPlan: string) => {
    setPlanName(selectedPlan);
    mutate(selectedPlan);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-zinc-800">
            Your subscription has expired
          </h2>
          <p className="text-zinc-600">
            Select a plan to continue using all features
          </p>
        </div>

        <PricingSection
          onPlanSelect={handlePlanSelection}
          isLoading={isPending}
          selectedPlan={planName}
          showTitle={false}
        />
      </div>
    </div>
  );
};

interface PricingSectionProps {
  onPlanSelect?: (plan: string) => void;
  isLoading?: boolean;
  selectedPlan?: string;
  showTitle?: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  onPlanSelect,
  isLoading,
  selectedPlan,
}) => {
  const pricingData = [
    {
      price: "3.99",
      planName: "Starter",
      description:
        "Get started for just $3.99! Perfect for occasional LinkedIn users needing message help. Up to 200 messages.",
      icon: <Flame className={`w-7 h-7`} />,
      features: [
        "200 messages per month",
        "Generate new responses",
        "Refine draft messages",
        "24/7 customer support",
      ],
      isPopular: false,
    },
    {
      price: "7.99",
      planName: "Growth",
      description:
        "Our most popular plan offering great value! Ideal for daily LinkedIn engagement. Up to 750 messages.",
      icon: <Zap className={`w-7 h-7`} />,
      features: [
        "750 messages per month",
        "Generate new responses",
        "Refine draft messages",
        "24/7 customer support",
      ],
      isPopular: true,
    },
    {
      price: "12.99",
      planName: "Pro",
      description:
        "Unlock unlimited potential! For serious LinkedIn networkers who demand the best. Truly unlimited messages.",
      icon: <Diamond className={`w-7 h-7`} />,
      features: [
        "Unlimited messages per month",
        "Generate new responses",
        "Refine draft messages",
        "24/7 customer support",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="py-8 px-4 bg-white" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              onSelect={() => onPlanSelect?.(plan.planName)}
              isLoading={isLoading}
              selectedPlan={selectedPlan}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionDialog;