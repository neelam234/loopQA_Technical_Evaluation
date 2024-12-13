# Use the official Playwright image which includes all necessary dependencies
FROM mcr.microsoft.com/playwright:v1.36.0-focal

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (including Playwright)
RUN npm install

# Install required system dependencies for Playwright browsers
RUN apt-get update && apt-get install -y \
  libx11-xcb1 libxcomposite1 libxdamage1 libxi6 libxtst6 \
  libnss3 libatk-bridge2.0-0 libatk1.0-0 libcups2 libgbm1 \
  libasound2 libxrandr2 libxss1 libnss3 libnspr4 libgdk-pixbuf2.0-0 \
  libpangocairo-1.0-0 libxft2 libgtk-3-0 libnotify4 libgdk-pixbuf2.0-dev \
  libatk-bridge2.0-dev libpango1.0-dev libxcomposite1 libxdamage1 \
  libxrandr2 libasound2 libnss3 libgbm-dev && apt-get clean

# Install browsers needed by Playwright
RUN npx playwright install --with-deps

# Copy the rest of your project files to the container
COPY . .

# Command to run your Playwright test (adjust if necessary)
CMD ["node", "test.js"]
