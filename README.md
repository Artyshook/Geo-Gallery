# Geo-Gallery

### 🌐 [Demo](https://geo-gallery.netlify.app/)

## Description

Geo-Gallery is a responsive web application that elegantly displays a gallery of images along with their geographic locations on a map. Built with performance and accessibility in mind, it adheres to W3C and WCAG standards for valid and accessible code. The application accommodates various devices, offering a responsive design that transitions smoothly from desktop to mobile views.

## Features

- Responsive layout with a two-thirds photo gallery and a one-third map view on desktops.
- Single-column view on mobile, with the gallery above the map.
- Dynamic display of image locations on the map within the viewport.
- Optional azimuth information display for images with directional metadata.
- Optional route or path visualization between image locations.

## Technologies Used

- **React.js**: For constructing the user interface.
- **Vite**: A modern, fast build tool for JavaScript projects.
- **Leaflet**: For interactive map features.
- **exifr**: To parse image metadata.
- **react-intersection-observer**: For efficient lazy loading of images.
- **axios**: For handling reverse geocoding requests.

## Installation

To set up the project locally, follow these steps:

```bash
# Clone the repository
git clone [Your-Repository-Link]

# Navigate to the project directory
cd geo-gallery

# Install dependencies
npm install

# Start the development server with Vite
npm run dev
