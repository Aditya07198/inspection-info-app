import { Attachment } from '../models/index.js';

class AttachmentService {
  async getAll() {
    // Do not return BLOBs in list view
    return Attachment.findAll({
      attributes: { exclude: ['file_data'] },
      order: [['attachment_id', 'ASC']]
    });
  }

  async getById(id) {
    // Metadata only; still exclude file_data
    return Attachment.findByPk(id, {
      attributes: { exclude: ['file_data'] }
    });
  }

  async getByEntity(entityName, entityId) {
    return Attachment.findAll({
      where: {
        entity_name: entityName,
        entity_id: entityId
      },
      attributes: { exclude: ['file_data'] },
      order: [['uploaded_at', 'DESC']]
    });
  }

  async createFromUpload({ file, body }) {
    if (!file) {
      throw new Error('File is required');
    }

    const {
      entity_name,
      entity_id,
      description,
      uploaded_by_rep_id
    } = body;

    if (!entity_name || !entity_id) {
      throw new Error('entity_name and entity_id are required');
    }

    return Attachment.create({
      file_name: file.originalname,
      file_extension: file.originalname.includes('.')
        ? file.originalname.split('.').pop()
        : null,
      content_type: file.mimetype,
      file_size_bytes: file.size,
      file_data: file.buffer, // BLOB

      description: description || null,
      entity_name,
      entity_id,
      uploaded_by_rep_id: uploaded_by_rep_id || null
    });
  }

  async getWithFileData(id) {
    // Used by download endpoint
    return Attachment.findByPk(id);
  }

  async delete(id) {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) return false;
    await attachment.destroy();
    return true;
  }
}

export default AttachmentService;
