import { Rep } from '../models/index.js';

class RepService {
  async getAll() {
    return Rep.findAll({ order: [['rep_id', 'ASC']] });
  }

  async getById(id) {
    return Rep.findByPk(id);
  }

  async create(data) {
    return Rep.create(data);
  }

  async update(id, data) {
    const rep = await Rep.findByPk(id);
    if (!rep) return null;
    await rep.update(data);
    return rep;
  }

  async delete(id) {
    const rep = await Rep.findByPk(id);
    if (!rep) return false;
    await rep.destroy();
    return true;
  }
}

export default RepService;
