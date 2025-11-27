import AttachmentService from '../services/attachment.service.js';

class AttachmentsController {
  constructor() {
    this.service = new AttachmentService();
  }

  getAll = async (req, res, next) => {
    try {
      const attachments = await this.service.getAll();
      res.json(attachments);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const attachment = await this.service.getById(req.params.id);
      if (!attachment) {
        return res.status(404).json({ message: 'Attachment not found' });
      }
      res.json(attachment);
    } catch (err) {
      next(err);
    }
  };

  getByEntity = async (req, res, next) => {
    try {
      const { entityName, entityId } = req.params;
      const attachments = await this.service.getByEntity(entityName, entityId);
      res.json(attachments);
    } catch (err) {
      next(err);
    }
  };

  upload = async (req, res, next) => {
    try {
      const attachment = await this.service.createFromUpload({
        file: req.file,
        body: req.body
      });
      res.status(201).json(attachment);
    } catch (err) {
      next(err);
    }
  };

  download = async (req, res, next) => {
    try {
      const attachment = await this.service.getWithFileData(req.params.id);
      if (!attachment || !attachment.file_data) {
        return res.status(404).json({ message: 'Attachment or file data not found' });
      }

      res.setHeader(
        'Content-Type',
        attachment.content_type || 'application/octet-stream'
      );
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${attachment.file_name || 'file'}"`
      );

      // file_data is a Buffer
      res.send(attachment.file_data);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Attachment not found' });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default new AttachmentsController();
