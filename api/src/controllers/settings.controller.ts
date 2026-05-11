import type { Request, Response } from "express";

import {
  getSettings,
  updateSettings,
} from "../services/settings.service.js";

export const getSystemSettings = (
  _req: Request,
  res: Response
) => {
  const settings = getSettings();

  res.json(settings);
};

export const updateSystemSettings = (
  req: Request,
  res: Response
) => {
  const updatedSettings = updateSettings(
    req.body
  );

  res.json({
    message: "Settings updated successfully",

    settings: updatedSettings,
  });
};