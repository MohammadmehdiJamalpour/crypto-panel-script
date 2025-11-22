// data.js

export const data = {
  // === Booleans ===
  mainMenu: false,
  loginModal: false,
  setPasswordModal: false,
  setWithdrawModal: false,
  remoteControl: false,

  // === Strings / basic app info ===
  warehouseIp: "192.168.0.10",
  status: "offline",
  overallMinersHealth: "good",

  // === Profile ===
  profile: {
    username: "admin",
    password: "admin123",
    name: "Mining Operator",
    bio: "Responsible for monitoring and maintaining all miners.",
    profileImg: "/profile-defualt.jpg",
  },

  // === Power usage ===
  powerUsage: {
    status: "normal",
    powerUsage: 0,
    overheadUsage: {
      RackA1: 1200,
      RackA2: 950,
      RackB1: 1800,
    },
  },

  // === Security ===
  security: {
    motionSensorStatus: "inactive",
    installedMotionSensor: 0,
    addNewCamera: false,
    securityCameras: [
      { cameraId: "cam-1", cameraName: "Entrance Camera" },
      { cameraId: "cam-2", cameraName: "Warehouse Aisle 1" },
    ],
  },

  // === Rack section ===
  rackSection: {
    createRackOptions: ["singleRack", "doubleRowRack", "wallMountedRack", "customLayout"],
    placeNewRack: {
      row: null,
      column: null,
    },
    racks: [
      {
        rackId: "rack-a1",
        rackName: "Rack A1",
        rackStatus: "online",
        yield: 0.0,
        overallMinersHealth: "good",
        removeRack: false,
        rackPosition: { row: 1, column: 1 },
        miners: [
          {
            minerId: "miner-a1-01",
            minerName: "Miner A1-01",
            minerHealth: "good",
            minerLastRepair: "2025-10-10",
            powerUsage: 1200,
          },
          {
            minerId: "miner-a1-02",
            minerName: "Miner A1-02",
            minerHealth: "ok",
            minerLastRepair: "2025-09-15",
            powerUsage: 1150,
          },
        ],
      },
      {
        rackId: "rack-b1",
        rackName: "Rack B1",
        rackStatus: "maintenance",
        yield: 0.0,
        overallMinersHealth: "critical",
        removeRack: false,
        rackPosition: { row: 1, column: 2 },
        miners: [
          {
            minerId: "miner-b1-01",
            minerName: "Miner B1-01",
            minerHealth: "critical",
            minerLastRepair: "2025-08-01",
            powerUsage: 1400,
          },
        ],
      },
    ],
  },
};
