const Resource = require("../models/Resource");

const uploadResource = async (req, res) => {
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

module.exports = { uploadResource, getResourcesBySemester };
