import type { Request, Response } from "express";
import { getEnergyAnalytics } from "../services/energy.services.js";
import { devices } from "../data/devices.data.js";



const getEnergyData = (req : Request, res : Response) => {
    res.json(getEnergyAnalytics(devices, ))
}

export { getEnergyData }