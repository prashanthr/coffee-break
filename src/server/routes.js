const setupRoutes = (app) => {
  app.get('/health', async (req, res, next) => {
    res.json({ status: 'healthy'})
  })
}

export { setupRoutes }
