import type { Request, Response } from "express";
import { getEnergyAnalytics } from "../services/energy.services.js";
import { appliances } from "../data/appliances.data.js";



const getEnergyData = (req : Request, res : Response) => {
    res.json(getEnergyAnalytics(appliances ))
}

export { getEnergyData }