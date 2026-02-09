import { useState } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import { Button } from "../components/Button";

export default function ThemeCreator() {
  const navigate = useNavigate();
  const [themeName, setThemeName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  // const [hasPrice, setHasPrice] = useState(false);

  // Derived state for styles
  const isPublic = visibility === "public";
  const isPrivate = visibility === "private";
  const isValid = themeName.trim().length > 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-60" onClick={() => navigate("/")} />
      <div className="fixed top-0 right-0 h-full w-150 bg-[#FAFAFA] shadow-2xl z-70 p-10 overflow-y-auto">
        {/* Close Button */}
        <Link
          to="/"
          className="absolute top-10 right-10 w-10 h-10 flex items-center justify-center bg-[#EEE] hover:bg-[#E5E5E5] rounded-full transition-colors"
        >
          <X size={20} className="text-black" />
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl text-[#494949] mb-1">Create Theme</h1>
        </div>

        {/* Form */}
        <div className="space-y-5 flex flex-col h-[calc(100%-60px)]">
          <div className="flex pt-3 pb-4 px-4 gap-2.5 rounded-2xl border border-[#F2F2F2] bg-[#FFF] flex-col text-xs">
            <label className="text-[#494949]">Theme Name</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="border-none outline-none text-[#111111] placeholder:text-[#D1D1D1]"
            />
          </div>
          <div>
            <label className="text-[#494949] text-xs">Add a Description</label>
            <div className="flex pt-3 pb-4 px-4 gap-2.5 rounded-2xl border border-[#F2F2F2] bg-[#FFF] flex-col text-xs mt-1">
              <textarea
                placeholder="Enter here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                rows={10}
                className="border-none outline-none text-[#111111] placeholder:text-[#D1D1D1] resize-none h-auto"
              />
            </div>
          </div>
          <div>
            <label className="text-[#494949] text-xs">Theme Visibility</label>
            <div className="flex bg-[#F0F0F0] rounded-2xl mt-1">
              <div
                onClick={() => setVisibility("public")}
                className={cn(
                  "flex-1 px-3 py-4 rounded-xl cursor-pointer transition-all border select-none",
                  isPublic ? "bg-white border-[#EAEAEA] text-[#061920]" : "border-transparent text-[#061920AA]",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "relative mt-0.5 w-4.5 h-4.5 flex-shrink-0 border rounded-full transition-all duration-100",
                      isPublic ? "border-[#111111]" : "border-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border transition-all duration-100",
                        isPublic ? "border-3 border-white bg-[#111111]" : "border-[#D5D5D5] bg-transparent border-[1.5px]",
                      )}
                    />
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium mb-0.75">Public</h3>
                    <p>This will be available on the theme store.</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setVisibility("private")}
                className={cn(
                  "flex-1 px-3 py-4 rounded-xl cursor-pointer transition-all border select-none",
                  isPrivate ? "bg-white border-[#EAEAEA] text-[#061920]" : "border-transparent text-[#061920AA]",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "relative mt-0.5 w-4.5 h-4.5 flex-shrink-0 border rounded-full transition-all duration-100",
                      isPrivate ? "border-[#111111]" : "border-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border transition-all duration-100",
                        isPrivate ? "border-3 border-white bg-[#111111]" : "border-[#D5D5D5] bg-transparent border-[1.5px]",
                      )}
                    />
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium mb-0.75">Private</h3>
                    <p>Only visible to you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8 mt-auto">
            <Button
              className={cn(
                "w-full h-12 rounded-full text-base font-medium transition-colors",
                isValid
                  ? "bg-[#111111] hover:bg-black text-white"
                  : "bg-[#E5E5E5] text-white cursor-not-allowed hover:bg-[#E5E5E5]",
              )}
              disabled={!isValid}
              variant="primary" // We are overriding styles anyway, but keep it valid
              onClick={() => {
                if (isValid) {
                  navigate(`/edit/${encodeURIComponent(themeName)}`);
                }
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
