import { Inquiry, Location, Rep } from '../models/index.js';

class InquiryService {
  async getAll() {
    return Inquiry.findAll({
      order: [['inquiry_id', 'ASC']],
      include: [
        { model: Location, as: 'location' },
        { model: Rep, as: 'rep' }
      ]
    });
  }

  async getById(id) {
    return Inquiry.findByPk(id, {
      include: [
        { model: Location, as: 'location' },
        { model: Rep, as: 'rep' }
      ]
    });
  }

  async create(data) {
    return Inquiry.create(data);
  }

  async update(id, data) {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) return null;
    await inquiry.update(data);
    return inquiry;
  }

  async delete(id) {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) return false;
    await inquiry.destroy();
    return true;
  }
}

export default InquiryService;
