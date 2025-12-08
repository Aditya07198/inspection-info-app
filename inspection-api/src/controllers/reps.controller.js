import RepService from '../services/rep.service.js';

class RepsController {
  constructor() {
    this.service = new RepService();
  }

  getAll = async (req, res, next) => {
    try {
      const reps = await this.service.getAll();
      res.json(reps);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const rep = await this.service.getById(req.params.id);
      if (!rep) {
        return res.status(404).json({ message: 'Rep not found' });
      }
      res.json(rep);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const { first_name, last_name, phone, email, is_active } = req.body;

      // Only allow these fields
      const payload = {
        first_name,
        last_name,
        phone: phone || null,
        email: email || null,
        is_active: typeof is_active === 'boolean' ? is_active : true,
        // NO created_at / updated_at here -> model default will set created_at
      };

      const rep = await this.service.create(payload);
      res.status(201).json(rep);
    } catch (err) {
      next(err);
    }
  };


  update = async (req, res, next) => {
    try {
      const id = req.params.id;          // ID only from URL
      const { first_name, last_name, phone, email, is_active } = req.body;

      const payload = {
        first_name,
        last_name,
        phone: phone ?? null,
        email: email ?? null,
        is_active,
        updated_at: new Date(),          // server-side timestamp
      };

      const rep = await this.service.update(id, payload);
      if (!rep) {
        return res.status(404).json({ message: 'Rep not found' });
      }
      res.json(rep);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Rep not found' });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default new RepsController();
