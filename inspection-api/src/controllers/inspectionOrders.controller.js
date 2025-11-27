import InspectionOrderService from '../services/inspectionOrder.service.js';

class InspectionOrdersController {
  constructor() {
    this.service = new InspectionOrderService();
  }

  getAll = async (req, res, next) => {
    try {
      const orders = await this.service.getAll();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const order = await this.service.getById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Inspection order not found' });
      }
      res.json(order);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const order = await this.service.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const order = await this.service.update(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({ message: 'Inspection order not found' });
      }
      res.json(order);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Inspection order not found' });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default new InspectionOrdersController();
