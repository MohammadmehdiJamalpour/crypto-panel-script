import React, { useEffect, useMemo, useState } from "react";
import Label from "./Label.jsx";
import DetailLayout from "./DetailLayout.jsx";
import Accordion from "./Accordion.jsx";
import AccordionSection from "./AccordionSection.jsx";
import AccordionItem from "./AccordionItem.jsx";
import AddCameraModal from "./AddCameraModal.jsx";
import { ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline";
import { PlusIcon,CameraIcon } from "@heroicons/react/20/solid";
import { data, installMotionSensors } from "../data.js";

export default function SecurityDetailView({ title, onBack, security }) {
  const [motionStatus, setMotionStatus] = useState(security?.motionSensorStatus ?? "");
  const [cameras, setCameras] = useState(security?.securityCameras || []);
  const installedMotionSensor = security?.installedMotionSensor ?? 0;
  const [cameraModalOpen, setCameraModalOpen] = useState(!!(data.addCameraModal || security?.addNewCamera));

  useEffect(() => {
    setMotionStatus(security?.motionSensorStatus ?? "");
    setCameras(security?.securityCameras || []);
  }, [security?.motionSensorStatus, security?.securityCameras]);

  const motionText = useMemo(() => {
    const norm = (motionStatus || "").toLowerCase();
    if (!norm || norm === "notinstalled") return "Not installed";
    if (norm === "active") return "Active";
    return "Inactive";
  }, [motionStatus]);

  const normStatus = (motionStatus || "").toLowerCase();
  const showInstall = normStatus === "inactive" || !normStatus || normStatus === "notinstalled";
  const motionColor = normStatus === "active" ? "text-emerald-300" : "text-red-300";

  return (
    <DetailLayout title={title} onBack={onBack}>
      <Label
        items={[
          {
            icon: <ShieldCheckIcon className={`h-4 w-4 ${motionColor}`} />,
            label: <span>Motion Sensors</span>,
            value: <span className={motionColor}>{motionText}</span>,
          },
          ...(showInstall
            ? [
                {
                  icon: <BoltIcon className="h-4 w-4 text-blue-200" />,
                  label: "Install motion sensor to detect break in",
            
                  onClick: async () => {
                    await installMotionSensors();
                    setMotionStatus("active");
                    if (security) security.motionSensorStatus = "active";
                  },
                  onChevronClick: async () => {
                    await installMotionSensors();
                    setMotionStatus("active");
                    if (security) security.motionSensorStatus = "active";
                  },
                },
              ]
            : []),
       
        ]}
      />

      <Accordion className="space-y-2">
        <AccordionSection
          title="Security Cameras"
          icon={<CameraIcon className="h-4 w-4 text-blue-200" />}
          defaultOpen={false}
          decorateChildrenByDefault
        >
          <AccordionItem
            label="Add new camera"
            leftIcon={<CameraIcon className="h-4 w-4 text-blue-200" />}
            chevron
            onClick={() => {
              setCameraModalOpen(true);
              data.addCameraModal = true;
              if (security) security.addNewCamera = true;
            }}
            onChevronClick={() => {
              setCameraModalOpen(true);
              data.addCameraModal = true;
              if (security) security.addNewCamera = true;
            }}
          />
          {cameras.map((cam) => (
            <AccordionItem
              key={cam.cameraId}
              label={cam.cameraId}
              leftIcon={<CameraIcon className="h-4 w-4 text-blue-200" />}
              value={cam.cameraName}
            />
          ))}
        </AccordionSection>
      </Accordion>

      <AddCameraModal
        open={cameraModalOpen}
        onClose={() => {
          setCameraModalOpen(false);
          data.addCameraModal = false;
          if (security) security.addNewCamera = false;
        }}
        onAdded={() => {
          setCameras([...(security?.securityCameras || [])]);
          setCameraModalOpen(false);
          data.addCameraModal = false;
          if (security) security.addNewCamera = false;
        }}
      />
    </DetailLayout>
  );
}
