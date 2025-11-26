import sequelize, { testConnection } from '../config/database.js';

import Rep from './rep.model.js';
import Location from './location.model.js';
import Inquiry from './inquiry.model.js';
import InspectionOrder from './inspectionOrder.model.js';
import InspectionFollowup from './inspectionFollowup.model.js';
import Attachment from './attachment.model.js';

// Rep relations
Rep.hasMany(Inquiry, { foreignKey: 'rep_id', as: 'inquiries' });
Inquiry.belongsTo(Rep, { foreignKey: 'rep_id', as: 'rep' });

Rep.hasMany(InspectionOrder, { foreignKey: 'rep_id', as: 'inspectionOrders' });
InspectionOrder.belongsTo(Rep, { foreignKey: 'rep_id', as: 'rep' });

Rep.hasMany(InspectionFollowup, { foreignKey: 'rep_id', as: 'followups' });
InspectionFollowup.belongsTo(Rep, { foreignKey: 'rep_id', as: 'rep' });

Rep.hasMany(Attachment, { foreignKey: 'uploaded_by_rep_id', as: 'uploadedAttachments' });
Attachment.belongsTo(Rep, { foreignKey: 'uploaded_by_rep_id', as: 'uploadedBy' });

// Location relations
Location.hasMany(Inquiry, { foreignKey: 'customer_id', as: 'inquiries' });
Inquiry.belongsTo(Location, { foreignKey: 'customer_id', as: 'customer' });

Location.hasMany(InspectionOrder, { foreignKey: 'customer_id', as: 'inspectionOrders' });
InspectionOrder.belongsTo(Location, { foreignKey: 'customer_id', as: 'customer' });

// Inquiry ↔ InspectionOrder
Inquiry.hasMany(InspectionOrder, { foreignKey: 'inquiry_id', as: 'inspectionOrders' });
InspectionOrder.belongsTo(Inquiry, { foreignKey: 'inquiry_id', as: 'inquiry' });

// InspectionOrder ↔ InspectionFollowup
InspectionOrder.hasMany(InspectionFollowup, {
  foreignKey: 'inspection_order_id',
  as: 'followups'
});
InspectionFollowup.belongsTo(InspectionOrder, {
  foreignKey: 'inspection_order_id',
  as: 'inspectionOrder'
});

export {
  sequelize,
  testConnection,
  Rep,
  Location,
  Inquiry,
  InspectionOrder,
  InspectionFollowup,
  Attachment
};
