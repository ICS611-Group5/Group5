Group 5 Client
==================

### version types:
### MAJOR version (e.g., 1.x.x):
Incremented when you make incompatible API changes that require the user to change something about their setup.
This is often referred to as a "breaking change."

### MINOR version (e.g., x.1.x):
Incremented when you add functionality in a backward-compatible manner.
This means you've added new features, but existing functionality isn't broken.

### PATCH version (e.g., x.x.1):
Incremented when you make backward-compatible bug fixes.
These fixes generally resolve issues that don't affect the software's overall functionality or features.

## 0.0.1
- set up ItemView and App.vue for demo purposes
- set up dark mode toggle 

## 1.0.0
- set up frontend to handle bulk inserts
- moved all api logic to itemStore to manage state

## 1.0.1
- added 'delete all' functionality to the frontend
- moved add item and edit item logic to modal component
- fixed edit item functionality
-
## 2.0.0
- Added transaction support for orders
- Added order form to create orders/make orders
- Added superuser role to control which view is  visible to the user