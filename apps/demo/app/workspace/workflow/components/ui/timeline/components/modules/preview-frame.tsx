import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex justify-center items-start overflow-scroll bg-stone-50">
      <DeviceFrameset device="iPhone X" color="gold" zoom={0.8}>
        {children}
      </DeviceFrameset>
    </div>
  );
}

export { PreviewFrame };
