import {
  InspectionOrder,
  Location,
  Rep,
  Inquiry,
  InspectionFollowup
} from '../models/index.js';

class InspectionOrderService {
  async getAll() {
    return InspectionOrder.findAll({
      order: [['inspection_order_id', 'ASC']],
      include: [
        { model: Location, as: 'location' },
        { model: Rep, as: 'rep' },
        { model: Inquiry, as: 'inquiry' },
        { model: InspectionFollowup, as: 'followups' }
      ]
    });
  }

  async getById(id) {
    return InspectionOrder.findByPk(id, {
      include: [
        { model: Location, as: 'location' },
        { model: Rep, as: 'rep' },
        { model: Inquiry, as: 'inquiry' },
        { model: InspectionFollowup, as: 'followups' }
      ]
    });
  }

  async create(data) {
    return InspectionOrder.create(data);
  }

  async update(id, data) {
    const order = await InspectionOrder.findByPk(id);
    if (!order) return null;
    await order.update(data);
    return order;
  }

  async delete(id) {
    const order = await InspectionOrder.findByPk(id);
    if (!order) return false;
    await order.destroy();
    return true;
  }
}

export default InspectionOrderService;
