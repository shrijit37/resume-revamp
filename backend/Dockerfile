# Use Node.js official image
FROM node:18-bullseye

# Install TeX Live (required for pdflatex)
RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-fonts-recommended texlive-latex-recommended texlive-latex-extra && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application, including .env
COPY . .

# Expose the app port (if using Express)
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
