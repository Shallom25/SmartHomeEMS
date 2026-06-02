import type { Request, Response } from "express";
import { getActiveDevices, getInactiveDevices, getDeviceDetails, getDevicesConsumption, getHourlyConsumption } from "../services/devices.services.js";
import { devices } from "../data/devices.data.js";
import { calculateCost, calculateDailyKwh } from "../utils/calculations.js";
import { settings } from "../data/settings.data.js";




const connectedDevices= (req : Request, res: Response)=>{
    res.json(getActiveDevices(devices))
}


const disconnectedDevices = ( req : Request, res : Response) => {
    res.json(getInactiveDevices(devices))
}

const devicesConsumption = (req : Request, res : Response) => {
    res.json(getDevicesConsumption(devices))
}

const hourlyConsumption = (re : Request, res : Response) => {
    res.json(getHourlyConsumption(devices))
}

const deviceDetails = ( req : Request<{deviceId: string}>, res : Response) => {
    const { deviceId } = req.params;
    const device = getDeviceDetails(devices, deviceId)

    if(!device) {
        return res.status(404).json({
            message : "Device not found"
        })
    }
    const deviceDailyUsage = calculateDailyKwh(device.power)
    const deviceDailyCost = calculateCost(calculateDailyKwh(device.power), settings.tariff)

      res.json({
    ...device,

    dailyUsage: deviceDailyUsage,

    dailyCost: deviceDailyCost,
  });
   
}
export { connectedDevices,  disconnectedDevices, deviceDetails, devicesConsumption, hourlyConsumption }