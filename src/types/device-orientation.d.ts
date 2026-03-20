// Safari 13+ requires explicit permission for DeviceOrientation
interface DeviceOrientationEventStatic {
  requestPermission?: () => Promise<"granted" | "denied">;
}

declare interface DeviceOrientationEvent {
  constructor: DeviceOrientationEventStatic;
}
