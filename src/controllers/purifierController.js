
import Purifier from '../models/Purifier.js';

// Get all purifiers
export const getAllPurifiers = async (req, res) => {
  try {
    const purifiers = await Purifier.find();
    res.json(purifiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new purifier
export const createPurifier = async (req, res) => {
  const purifierData = req.body;
  try {
    const newPurifier = new Purifier(purifierData);
    const savedPurifier = await newPurifier.save();
    res.status(201).json(savedPurifier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a purifier
export const updatePurifier = async (req, res) => {
  try {
    const updatedPurifier = await Purifier.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, lastUpdated: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedPurifier) {
      return res.status(404).json({ message: 'Purifier not found' });
    }

    res.json(updatedPurifier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a purifier
export const deletePurifier = async (req, res) => {
  try {
    const deletedPurifier = await Purifier.findOneAndDelete({ id: req.params.id });
    if (!deletedPurifier) {
      return res.status(404).json({ message: 'Purifier not found' });
    }
    res.json({ message: 'Purifier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle purifier switch status
export const togglePurifierStatus = async (req, res) => {
  try {
    const purifier = await Purifier.findOne({ id: req.params.id });
    if (!purifier) {
      return res.status(404).json({ message: 'Purifier not found' });
    }

    purifier.onlineStatus = !purifier.onlineStatus;
    purifier.lastUpdated = new Date();

    const updatedPurifier = await purifier.save();
    res.json(updatedPurifier);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling purifier status', error: error.message });
  }
};
