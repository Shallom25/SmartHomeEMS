import type { Request, Response } from "express";
import { getActiveAppliances, getInactiveAppliances, getApplianceDetails, getAppliancesConsumption, getHourlyConsumption } from "../services/appliances.services.js";
import { appliances } from "../data/appliances.data.js";
import { calculateCost, calculateDailyKwh } from "../utils/calculations.js";
import { settings } from "../data/settings.data.js";




const connectedAppliances= (req : Request, res: Response)=>{
    res.json(getActiveAppliances(appliances))
}


const disconnectedAppliances = ( req : Request, res : Response) => {
    res.json(getInactiveAppliances(appliances))
}

const appliancesConsumption = (req : Request, res : Response) => {
    res.json(getAppliancesConsumption(appliances))
}

const hourlyConsumption = (re : Request, res : Response) => {
    res.json(getHourlyConsumption(appliances))
}

const applianceDetails = ( req : Request<{applianceId: string}>, res : Response) => {
    const { applianceId } = req.params;
    const appliance = getApplianceDetails(appliances, applianceId)

    if(!appliance) {
        return res.status(404).json({
            message : "Appliance not found"
        })
    }
    const applianceDailyUsage = calculateDailyKwh(appliance.power)
    const applianceDailyCost = calculateCost(calculateDailyKwh(appliance.power), settings.tariff)

      res.json({
    ...appliance,

    dailyUsage: applianceDailyUsage,

    dailyCost: applianceDailyCost,
  });
   
}
export { connectedAppliances,  disconnectedAppliances, applianceDetails, appliancesConsumption, hourlyConsumption }