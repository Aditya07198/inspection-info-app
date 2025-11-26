import { Location } from '../models/index.js';

class LocationService {
  async getAll() {
    return Location.findAll({ order: [['location_id', 'ASC']] });
  }

  async getById(id) {
    return Location.findByPk(id);
  }

  async create(data) {
    return Location.create(data);
  }

  async update(id, data) {
    const location = await Location.findByPk(id);
    if (!location) return null;
    await location.update(data);
    return location;
  }

  async delete(id) {
    const location = await Location.findByPk(id);
    if (!location) return false;
    await location.destroy();
    return true;
  }
}

export default LocationService;
