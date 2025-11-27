import InquiryService from '../services/inquiry.service.js';

class InquiriesController {
  constructor() {
    this.service = new InquiryService();
  }

  getAll = async (req, res, next) => {
    try {
      const inquiries = await this.service.getAll();
      res.json(inquiries);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const inquiry = await this.service.getById(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.json(inquiry);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const inquiry = await this.service.create(req.body);
      res.status(201).json(inquiry);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const inquiry = await this.service.update(req.params.id, req.body);
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.json(inquiry);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default new InquiriesController();
