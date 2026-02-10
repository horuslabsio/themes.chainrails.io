import { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { setAccessToken } from "../store/auth";

/**
 * Captures the `token` query parameter from the URL (set by the dashboard
 * after a successful sign-in) and stores it in the auth store.
 * Strips the token from the URL so it doesn't linger in the address bar.
 */
export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setAccessToken(token);

      // Remove the token from the URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("token");
      const cleanSearch = newParams.toString();
      navigate(`${location.pathname}${cleanSearch ? `?${cleanSearch}` : ""}`, { replace: true });
    }
  }, [searchParams, navigate, location.pathname]);

  return null;
}
