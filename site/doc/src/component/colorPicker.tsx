import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import type { ChromePickerProps } from "react-color";

let pickerModule: Promise<typeof import("react-color")> | undefined;
function loadPicker() {
  return (pickerModule ??= import("react-color").catch((error) => {
    pickerModule = undefined;
    throw error;
  }));
}

export function ColorPicker(props: ChromePickerProps) {
  const [Picker, setPicker] = useState<ComponentType<ChromePickerProps>>();
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let mounted = true;
    setError(false);
    loadPicker().then((module) => {
      if (mounted) setPicker(() => module.ChromePicker);
    }).catch((reason) => {
      console.error("Unable to load the color picker", reason);
      if (mounted) setError(true);
    });
    return () => { mounted = false; };
  }, [attempt]);
  if (Picker) return <Picker {...props} />;
  return <div className={props.className}>
    <div className="w-[225px] rounded bg-white p-3 text-sm text-body shadow-lg">
      {error ? <><p role="alert">Color picker could not load.</p><button onClick={() => setAttempt((n) => n + 1)}>Retry</button></> : "Loading colors…"}
    </div>
  </div>;
}
