import { Request, Response } from "express";
import { ApplicationModel } from "../model/applicationmodel";
import { SortOrder } from "mongoose";
export async function create(req: Request, res: Response) {
  try {
    const { company, role, status, link, dateOfApplication } = req.body;
    const data1 = await ApplicationModel.findOne({ company });
    if (data1) {
      res.status(400).json({ message: "Company name is already exist " });
      return;
    }
    const data = new ApplicationModel({
      company,
      role,
      status,
      link,
      dateOfApplication,
    });
    await data.save();
    res.status(200).json({ message: "Application created successfully" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const {
      company,
      role,
      status,
      search,
      page = "1",
      limit = "10",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filters: any = {};

    // Optional filters
    if (company) filters.company = company;
    if (role) filters.role = role;
    if (status) filters.status = status;

    // Optional search (case-insensitive)
    if (search) {
      filters.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const sort: Record<string, SortOrder> = {
      [sortBy as string]: sortOrder === "asc" ? 1 : -1,
    };

    const totalCount = await ApplicationModel.countDocuments(filters);

    const data = await ApplicationModel.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit as string));

    res.status(200).json({
      data,
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / parseInt(limit as string)),
    });
  } catch (error) {
    console.error("Error in getAll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await ApplicationModel.findById(id);
    if (!data) {
      res.status(404).json({ message: "Application not found" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const data = await ApplicationModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!data) {
      res.status(404).json({ message: "Application not found" });
      return;
    }
    res.status(200).json({ message: "Application updated successfully" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}

export async function DeleteOne(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await ApplicationModel.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({ message: "Application not found" });
      return;
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
