const defaultOrigins = ['http://localhost:4200','https://inspection-info-app.onrender.com'];

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
// comma-separated list of origins in .env, if provided
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(',').map(o => o.trim())
  : defaultOrigins;

export const corsOptions = {
  origin: (origin, callback) => {
    // allow tools / server-side calls with no origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
