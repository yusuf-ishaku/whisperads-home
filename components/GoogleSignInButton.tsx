// components/GoogleSignInButton.tsx
"use client";

import { useEffect, useCallback } from "react";
import Google from "@/components/icons/Google";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface GoogleSignInButtonProps {
  role: string | null;
  buttonText?: string;
  isLoading?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleSignInButton({
  role,
  buttonText = "Continue with Google",
  isLoading = false,
  onSuccess,
  onError,
}: GoogleSignInButtonProps) {
  const { login } = useAuth();
  const router = useRouter();

  const handleCredentialResponse = useCallback(
    async (response: any) => {
      console.log("Google auth response:", response);

      // Get role from URL params or sessionStorage as fallback
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam =
        urlParams.get("role") || sessionStorage.getItem("tempRole") || role;

      if (!roleParam) {
        toast.error("Please select a role first");
        return;
      }

      try {
        const authResponse = await fetch(
          "https://whisperads-api-production.up.railway.app/auth/google/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: response.credential,
              role: roleParam,
            }),
          }
        );

        if (!authResponse.ok) {
          throw new Error("Google authentication failed");
        }

        const data = await authResponse.json();
        console.log(data);
         const accessToken = data.accessToken || data.token;
    if (!accessToken) {
      throw new Error('Access token missing in Google response');
    }

        login(accessToken, data.user);

        toast.success("Login successful!");

        const normalizedRole = data.user.role.toLowerCase();

        if (onSuccess) {
          onSuccess({
            ...data,
            token: accessToken,
            refreshToken: data.refreshToken,
          });
        } else {
          if (data.isNewUser) {
            router.push(`/dashboard/${normalizedRole}/create-profile`);
          } else {
            router.push(`/dashboard/${normalizedRole}`);
          }
        }
      } catch (error: any) {
        console.error("Error:", error);
        const errorMessage = error.message || "Login failed";
        toast.error("Login failed: " + errorMessage);

        if (onError) {
          onError(error);
        }
      }
    },
    [role, router, onSuccess, onError, login]
  );

  useEffect(() => {
    // Store role in sessionStorage as backup
    if (role) {
      sessionStorage.setItem("tempRole", role);
    }

    // Load Google script if not already loaded
    if (!document.querySelector('script[src*="accounts.google.com"]')) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    } else if (window.google) {
      initializeGoogleSignIn();
    }

    function initializeGoogleSignIn() {
      if (!window.google) {
        console.error("Google API not loaded");
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id:
            "463830682690-qroc4kljsdut223jb50i6b5skqktvafk.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          context: "signin",
          ux_mode: "popup",
          auto_select: false,
        });

        // Render button if element exists
        const buttonElement = document.getElementById("googleSignInButton");
        if (buttonElement && window.google.accounts.id.renderButton) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme: "outline",
            size: "large",
            width: 300, // Using fixed width instead of percentage
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            type: "standard",
          });
        }
      } catch (error) {
        console.error("Error initializing Google Sign-In:", error);
        toast.error("Failed to initialize Google Sign-In");
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, [role, handleCredentialResponse]);

  return (
    <div className="w-full">
      <div
        id="googleSignInButton"
        className="w-full flex items-center justify-center"
      >
        {/* Fallback button in case Google script doesn't load */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 h-11 rounded-xl px-8 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          disabled={isLoading || !role}
          onClick={() => {
            if (!role) {
              toast.error("Please select a role first");
            } else if (!window.google) {
              toast.error("Google sign-in is not available. Please try again.");
            } else {
              // Manually trigger Google Sign-In
              window.google.accounts.id.prompt();
            }
          }}
        >
          <Google />
          <span className="text-sm font-medium">
            {isLoading ? "Processing..." : buttonText}
          </span>
        </button>
      </div>
    </div>
  );
}
