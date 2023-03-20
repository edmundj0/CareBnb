# Use Node.js LTS (Boron) as the base image
FROM node:16

# Create a working directory for the application
WORKDIR /app

# Copy the backend and frontend folders to the working directory
COPY . /app

# Install dependencies for the backend and frontend
RUN cd backend && npm install && cd ../frontend && npm install

# Create and set environment variables
RUN cd backend && touch .env && \
    echo "PORT=8000" >> .env && \
    echo "DB_FILE=db/dev.db" >> .env && \
    echo "JWT_SECRET=placeholder" >> .env && \
    echo "JWT_EXPIRES_IN=604800" >> .env

# Seed the database
RUN cd backend && npm run db:reset

# Expose ports for backend and frontend
EXPOSE 8000
EXPOSE 3000

# Start the backend and frontend servers
CMD ["sh", "-c", "cd frontend && npm start & cd backend && npm start"]
