# NamOS 1 Beta 3

## Overview

NamOS is a web-based operating system built entirely with client-side technologies. It simulates an OS environment within the browser, providing users with a desktop-like experience including file management, applications, and persistent storage. The project emphasizes mobile-first design with touch optimization and offline-first capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Single-Page Application (SPA)**
- Pure vanilla JavaScript implementation without framework dependencies
- All functionality runs entirely in the browser with no backend server requirements
- Component-based architecture using custom JavaScript classes
- Mobile-first responsive design with touch gesture support and viewport optimization

**UI/UX Design Decisions**
- Desktop metaphor with windows, taskbar, and desktop icons
- Theme support (light/dark modes) with CSS custom properties
- Touch-optimized interface preventing text selection, callouts, and tap highlights
- Responsive layout that adapts to different screen sizes

### Data Persistence Layer

**IndexedDB for Local Storage**
- Primary storage mechanism using a custom `IndexedDBStorage` class
- Key-value store pattern with in-memory caching for performance
- Asynchronous operations with Promise-based API
- Cache preloading on initialization for faster subsequent reads
- Enables offline functionality and persistent user data

**Design Rationale**
- IndexedDB chosen over localStorage for larger storage capacity and better performance with complex data
- In-memory cache layer reduces IndexedDB read operations
- Supports storing binary data (files, images) unlike localStorage's string-only limitation

### Mapping and Geolocation

**Leaflet.js Integration**
- Open-source mapping library for interactive maps
- Tile-based rendering with customizable layers
- Mobile-friendly with touch gesture support
- No API key requirements for basic functionality

### Authentication System

**Firebase Authentication**
- Handles user sign-up, login, and session management
- Supports multiple authentication providers
- Provides secure token-based authentication
- Integrates with Firebase Firestore for user data synchronization

### Cloud Data Synchronization

**Firebase Firestore**
- NoSQL cloud database for real-time data sync
- Enables cross-device data persistence
- Offline support with automatic synchronization
- Document-based data model for flexible schema

**Architecture Decision**
- Hybrid storage approach: IndexedDB for local/offline, Firestore for cloud sync
- Allows the application to function fully offline while maintaining cloud backup capabilities

### File Processing

**Client-Side File Handling**
- JSZip for creating and extracting ZIP archives within the browser
- FileSaver.js for downloading generated files to user's device
- Enables file export/import without server-side processing

### Machine Learning Capabilities

**TensorFlow.js Integration**
- In-browser machine learning using TensorFlow.js
- Universal Sentence Encoder model for natural language processing
- Enables semantic search and text analysis features
- All ML inference runs client-side preserving user privacy

**Use Cases**
- Semantic file search based on content understanding
- Natural language command processing
- Text similarity analysis

### Development and Debugging

**Eruda Mobile DevTools**
- Console, network, and element inspection for mobile devices
- Enables debugging on devices without desktop browser DevTools
- Critical for mobile-first development approach

## External Dependencies

### Mapping Services
- **Leaflet.js** (v1.9.4): Interactive map rendering and geolocation features
  - CDN: unpkg.com
  - Provides offline tile caching capabilities

### Backend Services
- **Firebase** (v8.10.1): Complete backend-as-a-service solution
  - Firebase Authentication: User identity management
  - Firebase Firestore: Cloud database and real-time synchronization
  - CDN: gstatic.com

### File Processing Libraries
- **JSZip** (v3.10.1): ZIP file creation and extraction in browser
  - CDN: cdnjs.cloudflare.com
- **FileSaver.js** (v2.0.5): Client-side file download functionality
  - CDN: cdnjs.cloudflare.com

### Machine Learning
- **TensorFlow.js** (v4.10.0): Browser-based machine learning framework
  - CDN: jsdelivr.net
- **Universal Sentence Encoder** (v1.3.3): Pre-trained NLP model for text embeddings
  - CDN: jsdelivr.net

### Development Tools
- **Eruda** (latest): Mobile browser DevTools console
  - CDN: jsdelivr.net
  - Used for development and debugging on mobile devices

### Browser APIs
- **IndexedDB API**: Native browser database for persistent local storage
- **Geolocation API**: Device location services (used with Leaflet)
- **File API**: Client-side file reading and manipulation