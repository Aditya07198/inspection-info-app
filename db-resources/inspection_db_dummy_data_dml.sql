INSERT INTO public.rep (first_name,last_name,phone,email,is_active,created_at,updated_at) VALUES
	 ('RepFname1','Lname1','1234567890','test.test@abc.com',true,'2025-11-26 16:35:14.072',NULL),
	 ('RepFname2','Lname2','9876543210','rep2.lname2@abc.com',true,'2025-11-26 16:35:14.072',NULL);

INSERT INTO public."location" (location_name,address_1,address_2,unit_number,city,state_province,country,postal_code,contact_name,contact_mobile,contact_office_phone,phone_ext,contact_fax,contact_email,organization_type,created_at,updated_at) VALUES
	 ('loc_name_1','23, xyz st',NULL,'1','Brampton','Ontario','Canada','L6Y5M5','Jim Dazling','1112223333','2223334444','101',NULL,'manager_name@location_name_1.ca','Restaurant','2025-11-26 17:08:59.085',NULL),
	 ('loc_name_2','24, xyz st',NULL,'11-A','North York','Ontario','Canada','M9L1B3','Margret Bishop','1239876540','3124567777','200',NULL,'manager_name@location_name_1.ca','Restaurant','2025-11-26 17:08:59.085',NULL),
	 ('loc_name_3','25, xyz st',NULL,'21-B','Toronto','Ontario','Canada','M2A1B1','Ralph Noman','985463131','2899478541','387',NULL,'manager_name@location_name_1.ca','Restaurant','2025-11-26 17:08:59.085',NULL),
	 ('loc_name_4','26, xyz st',NULL,'41-D','Caledon','Ontario','Canada','L9Y9Z1','Jim Hopper','6477777007','5142369865','461',NULL,'manager_name@location_name_1.ca','Restaurant','2025-11-26 17:08:59.085',NULL);

INSERT INTO public.inquiry (location_id,rep_id,inquiry_date,inquiry_channel,status,inspection_required,notes) VALUES
	 (1,1,'2025-10-21 00:00:00.000','In-person','CLOSE',false,'The inspection is done at the loc 1 and it is a restaurant and there is 200 seating capacity.'),
	 (2,2,'2025-10-23 00:00:00.000','Online','OPEN',true,'The inspection is done at the loc 1 and it is a restaurant and there is 200 seating capacity.'),
	 (3,1,'2025-10-21 00:00:00.000','In-person','FOLLOWUP',true,'The inspection is done at the loc 1 and it is a restaurant and there is 200 seating capacity.');

INSERT INTO public.inspection_order (location_id,rep_id,inquiry_id,order_date,scheduled_date,completion_date,status,inspection_type,next_due_date,followup_start_date,invoice_raised,invoice_amount,remarks) VALUES
	 (1,1,2,'2025-11-21 00:00:00-05','2025-11-24 00:00:00-05','2025-11-26 00:00:00-05','OPEN','Sanitation','2026-11-23','2026-05-01',false,12000.00,'Ongoing inspection, Kitchen shows signs of pests');

INSERT INTO public.inspection_followup (inspection_order_id,rep_id,followup_type,followup_status,due_date,completed_at,notes) VALUES
	 (1,1,'FIRST','INITIATED','2025-11-12 00:00:00.000','2025-11-13 00:00:00.000','Followed up, CX ready to get inspection done on next Due date');
