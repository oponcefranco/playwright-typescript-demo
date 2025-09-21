# Use official Playwright image with pre-installed browsers
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

# Install additional system dependencies if needed
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Create non-root user early
RUN groupadd -r appuser && useradd -r -g appuser -m appuser

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for testing)
RUN npm ci && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Copy source code with proper ownership
COPY --chown=appuser:appuser . .

# Ensure appuser has write permissions to the app directory
RUN chown -R appuser:appuser /app && chmod -R 755 /app

# Switch to non-root user
USER appuser

# Environment variables
ENV NODE_ENV=production \
    CI=true \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Health check with timeout
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD npx playwright --version || exit 1

# Use exec form for proper signal handling
CMD ["npx", "playwright", "test"]