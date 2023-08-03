import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import { Button } from "ui";

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center items-start overflow-scroll bg-stone-50">
      <DeviceFrameset device="iPhone X" color="gold" zoom={0.8}>
        {children}
      </DeviceFrameset>
    </div>
  );
}

export { PreviewFrame };
