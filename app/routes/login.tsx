import { StytchLogin } from "@stytch/nextjs";
import {
  OAuthProviders,
  Products,
  StytchEvent,
  StytchSDKUIError,
} from "@stytch/vanilla-js";

export default function Login() {
  const stytchProps = {
    config: {
      products: [Products.emailMagicLinks, Products.oauth],
      emailMagicLinksOptions: {
        loginRedirectURL: "http://localhost:5173/authenticate",
        signupRedirectURL: "http://localhost:5173/authenticate",
      },
      oauthOptions: {
        providers: [
          {
            type: OAuthProviders.Google,
          },
        ],
        loginRedirectURL: "http://localhost:5173/authenticate",
        signupRedirectURL: "http://localhost:5173/authenticate",
      },
    },
    styles: {
      // container: { width: "321px" },
      // colors: { primary: "#0577CA" },
      // fontFamily: '"Helvetica New", Helvetica, sans-serif',
    },
    callbacks: {
      onEvent: (message: StytchEvent) => console.log(message),
      onSuccess: (message: string) => console.log(message),
      onError: (message: StytchSDKUIError) => console.log(message),
    },
  };
  return (
    <div id="login">
      <StytchLogin
        config={stytchProps.config}
        styles={stytchProps.styles}
        callbacks={stytchProps.callbacks}
      />
    </div>
  );
}
