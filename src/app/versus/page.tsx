"use client";
import "../../styles/globals.css";
import { useState } from "react";
import Button from "../../components/ui/button";
import Popup from "@/components/ui/popup";
import GameOption from "@/components/game/gameOption";
import CanvasOptions from "@/components/game/canvasOptions";

export default function VersusSettings() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [dropdownValue1, setDropdownValue1] = useState("Option 1");
  const [dropdownValue2, setDropdownValue2] = useState("Option 1");
  const [dropdownValue3, setDropdownValue3] = useState("Option 1");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [gameOptionValue, setGameOptionValue] = useState(0);

  return (
    <div className="p-8 flex flex-col gap-6">
      <Button
        color="secondary"
        size="small"
        onClick={() => setIsPopupOpen(true)}
        className="w-15"
      >
        Test
      </Button>
      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="p-4 gap-4 flex flex-col items-center">
          <h2 className="text-lg font-bold">Popup Content</h2>
          <p>This is a popup example.</p>
          <Button
            color="primary"
            size="small"
            onClick={() => setIsPopupOpen(false)}
          >
            Close
          </Button>
        </div>
      </Popup>
      <GameOption
        label="Example Switch"
        description="This is an example switch option."
        switchValue={isSwitchOn}
        onToggle={setIsSwitchOn}
      />
      <GameOption
        label="Example Input"
        description="This is an example input game option."
        switchValue={isSwitchOn}
        onToggle={setIsSwitchOn}
        inputValue={gameOptionValue}
        onInputChange={setGameOptionValue}
        sliderValue={gameOptionValue}
        onSliderChange={setGameOptionValue}
      />
      <GameOption
        label="Example Dropdown"
        description="This is an example dropdown option."
        dropdownOptionsList={[
          ["Option 1", "Option 2", "Option 3"],
          ["Option 1", "Option 2", "Option 3"],
          ["Option 1", "Option 2", "Option 3"],
        ]}
        dropdownValues={[dropdownValue1, dropdownValue2, dropdownValue3]}
        dropdownOnChanges={[
          setDropdownValue1,
          setDropdownValue2,
          setDropdownValue3,
        ]}
      />
      <CanvasOptions />
    </div>
  );
}
