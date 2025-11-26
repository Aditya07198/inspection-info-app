-- ============================================================================
--  DROP EXISTING TABLES (in dependency order)
-- ============================================================================

DROP TABLE IF EXISTS inspection_followup CASCADE;
DROP TABLE IF EXISTS inspection_order CASCADE;
DROP TABLE IF EXISTS inquiry CASCADE;
DROP TABLE IF EXISTS attachment CASCADE;
DROP TABLE IF EXISTS location CASCADE;
DROP TABLE IF EXISTS rep CASCADE;

-- ============================================================================
--  CREATE TABLE: REP (Table to store inspection representatives)
-- ============================================================================

CREATE TABLE rep (
    rep_id      BIGSERIAL PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    phone       VARCHAR(50),
    email       VARCHAR(255),
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ
);

-- ============================================================================
--  CREATE TABLE: LOCATION
-- ============================================================================

CREATE TABLE location (
    location_id          BIGSERIAL PRIMARY KEY,
    location_name        VARCHAR(255) NOT NULL,
    address_1            VARCHAR(255),
    address_2            VARCHAR(255),
    unit_number          VARCHAR(10),
    city                 VARCHAR(100),
    state_province       VARCHAR(100),
    country              VARCHAR(100),
    postal_code          VARCHAR(20),
    contact_name         VARCHAR(255),
    contact_mobile       VARCHAR(50),
    contact_office_phone VARCHAR(50),
    phone_ext            VARCHAR(10),
    contact_fax          VARCHAR(50),
    contact_email        VARCHAR(255),
    organization_type    VARCHAR(100),
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ
);

-- ============================================================================
--  CREATE TABLE: ATTACHMENT
--  (generic, can link to any entity via entity_name + entity_id)
-- ============================================================================

CREATE TABLE attachment (
    attachment_id       BIGSERIAL PRIMARY KEY,
    file_name           VARCHAR(255) NOT NULL,
    file_extension      VARCHAR(20),
    content_type        VARCHAR(100),
    file_size_bytes     BIGINT,
    storage_path        VARCHAR(500) NOT NULL,
    description         VARCHAR(500),
    entity_name         VARCHAR(100) NOT NULL,
    entity_id           BIGINT       NOT NULL,
    uploaded_by_rep_id  BIGINT       REFERENCES rep (rep_id),
    uploaded_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Helpful index for polymorphic lookups
CREATE INDEX IF NOT EXISTS ix_attachment_entity
    ON attachment (entity_name, entity_id);

-- ============================================================================
--  CREATE TABLE: INQUIRY
--  (NOTE: customer_id (FK) as in ERD, referencing LOCATION.location_id)
-- ============================================================================

CREATE TABLE inquiry (
    inquiry_id         BIGSERIAL PRIMARY KEY,
    customer_id        BIGINT      NOT NULL,
    rep_id             BIGINT      NOT NULL,
    inquiry_date       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    inquiry_channel    VARCHAR(50),
    status             VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    inspection_required BOOLEAN    NOT NULL DEFAULT FALSE,
    notes              TEXT,
    CONSTRAINT fk_inquiry_location
        FOREIGN KEY (customer_id) REFERENCES location (location_id),
    CONSTRAINT fk_inquiry_rep
        FOREIGN KEY (rep_id)      REFERENCES rep (rep_id)
);

-- ============================================================================
--  CREATE TABLE: INSPECTION_ORDER
--  (customer_id (FK) as in ERD, referencing LOCATION.location_id)
-- ============================================================================

CREATE TABLE inspection_order (
    inspection_order_id BIGSERIAL PRIMARY KEY,
    customer_id         BIGINT      NOT NULL,
    rep_id              BIGINT      NOT NULL,
    inquiry_id          BIGINT,
    order_date          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    scheduled_date      TIMESTAMPTZ,
    completion_date     TIMESTAMPTZ,
    status              VARCHAR(50)  NOT NULL DEFAULT 'OPEN',
    inspection_type     VARCHAR(100),
    next_due_date       DATE,
    followup_start_date DATE,
    invoice_raised      BOOLEAN      NOT NULL DEFAULT FALSE,
    invoice_amount      NUMERIC(12,2),
    remarks             TEXT,
    CONSTRAINT fk_inspection_order_location
        FOREIGN KEY (customer_id) REFERENCES location (location_id),
    CONSTRAINT fk_inspection_order_rep
        FOREIGN KEY (rep_id)      REFERENCES rep (rep_id),
    CONSTRAINT fk_inspection_order_inquiry
        FOREIGN KEY (inquiry_id)  REFERENCES inquiry (inquiry_id)
);

-- ============================================================================
--  CREATE TABLE: INSPECTION_FOLLOWUP
-- ============================================================================

CREATE TABLE inspection_followup (
    followup_id         BIGSERIAL PRIMARY KEY,
    inspection_order_id BIGINT      NOT NULL,
    rep_id              BIGINT      NOT NULL,
    followup_type       VARCHAR(50) NOT NULL,
    followup_status     VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    due_date            TIMESTAMPTZ,
    completed_at        TIMESTAMPTZ,
    notes               TEXT,
    CONSTRAINT fk_followup_order
        FOREIGN KEY (inspection_order_id) REFERENCES inspection_order (inspection_order_id),
    CONSTRAINT fk_followup_rep
        FOREIGN KEY (rep_id)             REFERENCES rep (rep_id)
);

-- Optional supporting indexes

CREATE INDEX IF NOT EXISTS ix_inquiry_customer_id
    ON inquiry (customer_id);

CREATE INDEX IF NOT EXISTS ix_inquiry_rep_id
    ON inquiry (rep_id);

CREATE INDEX IF NOT EXISTS ix_inspection_order_customer_id
    ON inspection_order (customer_id);

CREATE INDEX IF NOT EXISTS ix_inspection_order_rep_id
    ON inspection_order (rep_id);

CREATE INDEX IF NOT EXISTS ix_inspection_order_next_due_date
    ON inspection_order (next_due_date);

CREATE INDEX IF NOT EXISTS ix_followup_due_date_status
    ON inspection_followup (due_date, followup_status);
