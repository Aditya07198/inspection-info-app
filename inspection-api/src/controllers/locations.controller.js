import LocationService from '../services/location.service.js';

class LocationsController {
  constructor() {
    this.service = new LocationService();
  }

  getAll = async (req, res, next) => {
    try {
      const locations = await this.service.getAll();
      res.json(locations);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const location = await this.service.getById(req.params.id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.json(location);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const location = await this.service.create(req.body);
      res.status(201).json(location);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const location = await this.service.update(req.params.id, req.body);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.json(location);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default new LocationsController();
