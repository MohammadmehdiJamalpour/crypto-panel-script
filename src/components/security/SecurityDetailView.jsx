import React, { useEffect, useMemo, useState } from "react";
import Label from "../ui/Label.jsx";
import DetailLayout from "../ui/detail/DetailLayout.jsx";
import Accordion from "../ui/accordion/Accordion.jsx";
import AccordionSection from "../ui/accordion/AccordionSection.jsx";
import AccordionItem from "../ui/accordion/AccordionItem.jsx";
import AddCameraModal from "./AddCameraModal.jsx";
import { ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/20/solid";
import { data } from "../../data.js";
import { installMotionSensors } from "../../services/security.js";

export default function SecurityDetailView({ title, onBack, security }) {
  const [motionStatus, setMotionStatus] = useState(security?.motionSensorStatus ?? "");
  const [cameras, setCameras] = useState(security?.securityCameras || []);
  const installedMotionSensor = security?.installedMotionSensor ?? 0;
  const [cameraModalOpen, setCameraModalOpen] = useState(!!(data.addCameraModal || security?.addNewCamera));

  useEffect(() => {
    setMotionStatus(security?.motionSensorStatus ?? "");
    setCameras(security?.securityCameras || []);
  }, [security?.motionSensorStatus, security?.securityCameras]);

  // sync modal visibility with data flag in case it was toggled externally
  useEffect(() => {
    if (data.addCameraModal && !cameraModalOpen) setCameraModalOpen(true);
    if (!data.addCameraModal && cameraModalOpen && !(security?.addNewCamera)) setCameraModalOpen(false);
  }, [cameraModalOpen, security?.addNewCamera]);

  const motionText = useMemo(() => {
    const norm = (motionStatus || "").toLowerCase();
    if (!norm || norm === "notinstalled") return "Not installed";
    if (norm === "active") return "Active";
    return "Inactive";
  }, [motionStatus]);

  const normStatus = (motionStatus || "").toLowerCase();
  const showInstall = normStatus === "inactive" || !normStatus || normStatus === "notinstalled";
  const motionColor = normStatus === "active" ? "text-emerald-300" : "text-red-300";
  const isRemote = data.remoteAccessMode;
  const installDisabled = isRemote && data.remoteLimitations?.restrictedActions?.includes("installMotionSensors");
  const addCameraDisabled = isRemote && data.remoteLimitations?.restrictedActions?.includes("addCamera");

  return (
    <DetailLayout title={title} onBack={onBack}>
      <Label
        items={[
          {
            icon: <ShieldCheckIcon className={`h-4 w-4 ${motionColor}`} />,
            label: <span>Motion Sensors</span>,
            value: <span className={motionColor}>{motionText}</span>,
          },
          ...(showInstall && !installDisabled
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
          {addCameraDisabled ? null : (
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
          )}
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
