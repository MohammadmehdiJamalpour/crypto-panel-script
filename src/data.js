// data.js

export const data = {
  // === Booleans ===
  mainMenu: true,
  loginModal: false,
  setPasswordModal: false,
  setWithdrawModal: false,
  remoteControl: false,
  addCameraModal: false,
  rackStandaloneMode: false,
  rackStandaloneRackId: "rack-a1",
  addRackModal: false,
  remoteAccessMode: false, // if true, app opens directly in main menu with remote limitations
  remoteLimitations: {
    note: "Remote sessions may restrict destructive actions.",
    restrictedActions: [
      "removeRack",
      "changeRackPosition",
      "installMotionSensors",
      "addCamera",
      "placeRack",
      "repairMiner",
    ],
  },
  infoMenu: {
    title: "Information",
    sections: [
      {
        title: "Overview",
        items: [
          "Control racks, security, and power usage from the main panel.",
          "Open any label with a chevron to view details or perform actions.",
        ],
      },
      {
        title: "Navigation",
        items: [
          "Use the Racks menu for rack placement and per-rack health.",
          "Use Security for motion sensors and cameras.",
          "Use Power Usage to view status and set passwords.",
        ],
      },
      {
        title: "Actions",
        items: [
          "Withdraw funds via the Withdraw accordion in the main list.",
          "Add racks/cameras and request repairs from their detail views.",
        ],
      },
    ],
  },

  // === Strings / basic app info ===
  warehouseIp: "192.168.0.10",
  status: "online",
  overallMinersHealth: "good",
  approximateYield: "[0/0]",
  withdraw: "12.234 $",
  overallHealthValue: 75,

  cryptoCoins: [
    { name: "Bitcoin", symbol: "BTC", value: "$68,210" },
    { name: "Ethereum", symbol: "ETH", value: "$3,520" },
    { name: "Litecoin", symbol: "LTC", value: "$175" },
  ],
  // === Profile ===
  profile: {
    username: "admin",
    password: "admin123",
    name: "Mining Operator",
    bio: "Responsible.",
    profileImg: "/profile-defualt.jpg",
  },

  // === Power usage ===
  powerUsage: {
    status: "normal",
    powerUsage: 200,
    overheadUsage: {
      RackA1: 1200,
      RackA2: 950,
      RackB1: 1800,
    },
  },

// === Security ===
  security: {
    motionSensorStatus: false,
    installedMotionSensor: 0,
    addNewCamera: false,
    securityCameras: [
      { cameraId: "cam-01", cameraName: "Entrance Camera" },
      { cameraId: "cam-02", cameraName: "Warehouse Aisle 1" },
    ],
  },

  // === Rack section ===
  rackSection: {
    addRackModal: false,
    selectedRackType: null,
    createRackOptions: [
      "singleRack",
      "doubleRowRack",
      "wallMountedRack",
      "customLayout",
    ],
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
        overallMinersHealth: 85,
        removeRack: false,
        rackPosition: { row: 1, column: 1 },
        miners: [
          {
            minerId: "miner-a1-01",
            minerName: "Miner A1-01",
            minerHealth: 85,
            minerLastRepair: "2025-10-10",
            powerUsage: 1200,
          },
          {
            minerId: "miner-a1-02",
            minerName: "Miner A1-02",
            minerHealth: 60,
            minerLastRepair: "2025-09-15",
            powerUsage: 1150,
          },
        ],
      },
      {
        rackId: "rack-b1",
        rackName: "Rack B1",
        rackStatus: "offline",
        yield: 0.0,
        overallMinersHealth: 30,
        removeRack: false,
        rackPosition: { row: 1, column: 2 },
        miners: [
          {
            minerId: "miner-b1-01",
            minerName: "Miner B1-01",
            minerHealth: 25,
            minerLastRepair: "2025-08-01",
            powerUsage: 1400,
          },
        ],
      },
    ],
  },
};

// Async helper to update password; replace with real fetch/API later
