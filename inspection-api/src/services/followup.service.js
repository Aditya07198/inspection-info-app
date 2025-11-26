import { InspectionFollowup, InspectionOrder, Rep } from '../models/index.js';

class FollowupService {
  async getAll() {
    return InspectionFollowup.findAll({
      order: [['followup_id', 'ASC']],
      include: [
        { model: InspectionOrder, as: 'inspectionOrder' },
        { model: Rep, as: 'rep' }
      ]
    });
  }

  async getById(id) {
    return InspectionFollowup.findByPk(id, {
      include: [
        { model: InspectionOrder, as: 'inspectionOrder' },
        { model: Rep, as: 'rep' }
      ]
    });
  }

  async create(data) {
    return InspectionFollowup.create(data);
  }

  async update(id, data) {
    const followup = await InspectionFollowup.findByPk(id);
    if (!followup) return null;
    await followup.update(data);
    return followup;
  }

  async delete(id) {
    const followup = await InspectionFollowup.findByPk(id);
    if (!followup) return false;
    await followup.destroy();
    return true;
  }
}

export default FollowupService;
