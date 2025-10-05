import { useState, useRef } from "react";
import { ImageIcon, Pencil, X, RefreshCw } from "lucide-react";

type FillType = "cover" | "contain" | "fill" | "none";

interface BackgroundPickerProps {
  onBackgroundChange: (imageUrl: string | null, fillType: FillType, blur: number) => void;
}

export const BackgroundPicker = ({ onBackgroundChange }: BackgroundPickerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentFillType, setCurrentFillType] = useState<FillType>("cover");
  const [blurAmount, setBlurAmount] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentImageUrl(imageUrl);
      setHasBackground(true);
      setIsExpanded(false);
      setShowActionButtons(false);
      onBackgroundChange(imageUrl, currentFillType, blurAmount);
    }
  };

  const handleRemoveBackground = () => {
    setHasBackground(false);
    setShowActionButtons(false);
    setShowOptions(false);
    setIsExpanded(false);
    setCurrentImageUrl(null);
    onBackgroundChange(null, currentFillType, 0);
    setBlurAmount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMainIconClick = () => {
    if (hasBackground) {
      setShowActionButtons(!showActionButtons);
      if (showActionButtons) {
        setShowOptions(false);
      }
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleFillTypeChange = (fillType: FillType) => {
    setCurrentFillType(fillType);
    onBackgroundChange(currentImageUrl, fillType, blurAmount);
  };

  const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlur = parseInt(e.target.value);
    setBlurAmount(newBlur);
    onBackgroundChange(currentImageUrl, currentFillType, newBlur);
  };

  const fillTypeOptions = [
    { type: "cover" as FillType, label: "Cover", icon: "🖼️" },
    { type: "contain" as FillType, label: "Contain", icon: "📐" },
    { type: "fill" as FillType, label: "Stretch", icon: "↔️" },
    { type: "none" as FillType, label: "Repeat", icon: "🔲" },
  ];

  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-2">
      {/* Main Icon Button */}
      <button
        onClick={handleMainIconClick}
        className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
      >
        <ImageIcon className="w-5 h-5 text-foreground transition-transform duration-300" />
      </button>

      {/* Choose Background Button (Expanded) */}
      {isExpanded && !hasBackground && (
        <div className="transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-left-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.gif"
            onChange={handleFileSelect}
            className="hidden"
            id="bg-file-input"
          />
          <label
            htmlFor="bg-file-input"
            className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 text-sm font-medium"
          >
            Choose Background
          </label>
        </div>
      )}

      {/* Action Buttons (When Background is Set) */}
      {hasBackground && showActionButtons && (
        <div className="flex items-center gap-2 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-left-2">
          {/* Pencil Icon - Fill Type & Blur Options */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
              title="Adjust fill and blur"
            >
              <Pencil className="w-4 h-4 text-foreground" />
            </button>

            {/* Options Panel */}
            {showOptions && (
              <div className="absolute top-12 left-0 bg-background/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 min-w-[200px] transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95">
                {/* Fill Type Options */}
                <div className="mb-4">
                  <p className="text-xs font-semibold mb-2 text-muted-foreground">Fill Type</p>
                  <div className="grid grid-cols-2 gap-2">
                    {fillTypeOptions.map((option) => (
                      <button
                        key={option.type}
                        onClick={() => handleFillTypeChange(option.type)}
                        className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-medium ${
                          currentFillType === option.type
                            ? "border-primary bg-primary/10"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <div className="text-xl mb-1">{option.icon}</div>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blur Slider */}
                <div>
                  <p className="text-xs font-semibold mb-2 text-muted-foreground">
                    Blur Amount: {blurAmount}px
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={blurAmount}
                    onChange={handleBlurChange}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Change Background Button */}
          <button
            onClick={() => {
              setShowOptions(false);
              fileInputRef.current?.click();
            }}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
            title="Change background"
          >
            <RefreshCw className="w-4 h-4 text-foreground" />
          </button>

          {/* Remove Background Button */}
          <button
            onClick={handleRemoveBackground}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 hover:bg-destructive/80"
            title="Remove background"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};
