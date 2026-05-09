import type { Request, Response } from "express";
import { getActiveDevices, getInactiveDevices, getDeviceDetails } from "../services/devices.services.js";
import { devices } from "../data/devices.data.js";


const connectedDevices= (req : Request, res: Response)=>{
    res.json(getActiveDevices(devices))
}

const disconnectedDevices = ( req : Request, res : Response) => {
    res.json(getInactiveDevices(devices))
}

const deviceDetails = ( req : Request<{deviceId: string}>, res : Response) => {
    const { deviceId } = req.params;
    const device = getDeviceDetails(devices, deviceId)

    if(!device) {
        return res.status(404).json({
            message : "Device not found"
        })
    }

    res.json(device)
    // res.json(getDeviceDetails(devices, deviceId))
}