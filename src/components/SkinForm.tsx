
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedButton from "@/components/AnimatedButton";
import { analyzeWithGemini } from "@/utils/geminiAI";
import { useToast } from "@/components/ui/use-toast";

const skinTypes = ["Dry", "Oily", "Combination", "Normal", "Sensitive"];
const skinConcerns = [
  "Acne",
  "Aging",
  "Dullness",
  "Hyperpigmentation",
  "Redness",
  "Dryness",
  "Oiliness",
  "Pores",
  "Dark circles",
  "Fine lines",
];

const SkinForm = () => {
  const [skinType, setSkinType] = useState("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skinType) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select your skin type.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const userInput = {
        skinType,
        concerns: selectedConcerns,
        additionalInfo,
      };
      
      const results = await analyzeWithGemini(userInput);
      
      // Store results in localStorage to use on results page
      localStorage.setItem("skinAnalysisResults", JSON.stringify(results));
      
      navigate("/results");
      
      toast({
        title: "Analysis Complete!",
        description: "Your personalized routine is ready.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "Please try again later.",
      });
      console.error("Analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <Label htmlFor="skinType">What's your skin type?</Label>
        <Select value={skinType} onValueChange={setSkinType}>
          <SelectTrigger id="skinType" className="w-full">
            <SelectValue placeholder="Select your skin type" />
          </SelectTrigger>
          <SelectContent>
            {skinTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>What skin concerns do you have?</Label>
        <div className="flex flex-wrap gap-2 pt-1">
          {skinConcerns.map((concern) => (
            <button
              key={concern}
              type="button"
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedConcerns.includes(concern)
                  ? "bg-primary text-white"
                  : "bg-secondary/50 hover:bg-secondary text-gray-700"
              }`}
              onClick={() => toggleConcern(concern)}
            >
              {concern}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Tell us more about your skin (optional)</Label>
        <Textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Share any additional details about your skin, routine, or products you're currently using..."
          className="min-h-[100px]"
        />
      </div>

      <AnimatedButton
        type="submit"
        className="w-full bg-gradient-pink hover:shadow-[0_0_15px_rgba(255,154,158,0.5)]"
        isLoading={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Analyze My Skin"
        )}
      </AnimatedButton>
    </form>
  );
};

export default SkinForm;
