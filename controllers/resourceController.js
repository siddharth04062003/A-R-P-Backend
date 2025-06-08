// controllers/resourceController.js

const Resource = require("../models/Resource");

const addResource = async (req, res) => {
  try {
    const { title, description, semester, subject, type, url } = req.body;

    const newResource = new Resource({
      title,
      description,
      semester,
      subject,
      type,
      url,
    });

    await newResource.save();
    return res.status(201).json({ msg: "Resource uploaded successfully", resource: newResource });
  } catch (error) {
    console.error("Upload Error:", error.message);
    return res.status(500).json({
      error: "Failed to upload resource",
      message: error.message
    });
  }
};
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updated = await Resource.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(200).json({ message: "Resource updated", resource: updated });
  } catch (error) {
    console.error("Update Error:", error.message);
    return res.status(500).json({ message: "Failed to update resource", error: error.message });
  }
};

const getResourcesBySemester = async (req, res) => {
  try {
    const { sem } = req.params;
    const { subject, type } = req.query;

    let filter = { semester: parseInt(sem) };
    if (subject) filter.subject = subject;
    if (type) filter.type = type;

    const resources = await Resource.find(filter);
    return res.status(200).json(resources);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch resources", message: error.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Resource.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    return res.status(500).json({ message: "Failed to delete resource", error: error.message });
  }
};

module.exports = {
  addResource,               // previously uploadResource
  getResourcesBySemester,
  updateResource,
  deleteResource
};