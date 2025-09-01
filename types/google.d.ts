// types/google.d.ts
declare namespace google {
  namespace accounts {
    namespace id {
      function initialize(config: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
        auto_select?: boolean;
        login_uri?: string;
        native_callback?: () => void;
        cancel_on_tap_outside?: boolean;
        prompt_parent_id?: string;
        nonce?: string;
        context?: string;
        state_cookie_domain?: string;
        ux_mode?: "popup" | "redirect";
        allowed_parent_origin?: string | string[];
        intermediate_iframe_close_callback?: () => void;
      }): void;
      
      function renderButton(
        parent: HTMLElement,
        options: {
          type?: "standard" | "icon";
          theme?: "outline" | "filled_blue" | "filled_black";
          size?: "large" | "medium" | "small";
          text?: "signin_with" | "signup_with" | "continue_with" | "signin";
          shape?: "rectangular" | "pill" | "circle" | "square";
          logo_alignment?: "left" | "center";
          width?: number | string;
          locale?: string;
          click_listener?: () => void;
        }
      ): void;
      
      function prompt(): void;
    }
  }
}

interface CredentialResponse {
  credential: string;
  select_by?: string;
  clientId?: string;
}