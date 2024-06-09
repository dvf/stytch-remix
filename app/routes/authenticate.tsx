import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export const loader = async () => {
  // Here we can do some server side logic, like verify claims in the JWT
  // or send data to the Python backend
  // or store data in a separate session-based Cookie
  return {};
};

const Authenticate = () => {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stytch_token_type = urlParams.get("stytch_token_type");
    const token = urlParams.get("token");

    if (stytch && !user && isInitialized) {
      if (token && stytch_token_type === "oauth") {
        stytch.oauth.authenticate(token, {
          session_duration_minutes: 60,
        });
      } else if (token && stytch_token_type === "magic_links") {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, stytch, user]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (user) {
      console.log("User is authenticated", user);
      navigate("/");
    }
  }, [navigate, user, isInitialized]);

  return null;
};

export default Authenticate;
