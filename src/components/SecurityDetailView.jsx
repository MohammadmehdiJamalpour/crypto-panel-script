import React from "react";
import Label from "./Label.jsx";
import DetailLayout from "./DetailLayout.jsx";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function SecurityDetailView({ title, onBack, security }) {
  const cameras = security?.securityCameras?.length ?? 0;
  const motion = security?.motionSensorStatus ?? "unknown";
  const installedMotionSensor = security?.installedMotionSensor ?? 0;

  const items = [
    { icon: <ShieldCheckIcon className="h-4 w-4 text-blue-200" />, label: "Motion Sensors", value: motion },
    { icon: <ShieldCheckIcon className="h-4 w-4 text-blue-200" />, label: "Installed Sensors", value: `${installedMotionSensor}` },
    { icon: <ShieldCheckIcon className="h-4 w-4 text-blue-200" />, label: "Cameras", value: `${cameras}` },
  ];

  return (
    <DetailLayout title={title} onBack={onBack}>
      <Label items={items} />
    </DetailLayout>
  );
}
