const corsOptions = {
  origin: process.env.FRONTEND_URL as string,
  credentials: true as boolean,
  optionsSuccessStatus: 200 as number, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export default corsOptions
