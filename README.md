# AI-Interview-Platform UI Components

## Overview

Reusable UI components used throughout the AI Interview Platform.
These components help maintain a clean structure by avoiding repeated code and making the application easier to maintain.

## Included Components

### Button.tsx

A reusable button component used across the application.

Features:
- Accepts custom button text through props.
- Supports click events from parent components.
- Provides consistent styling for all buttons.

Example usage:

```tsx
<Button 
    text="Generate Interview"
    onClick={handleGenerate}
/>

# Database Utilities & Models

## Overview

This folder contains the database-related files used to connect our Next.js application with MongoDB and define the structure of interview data.

## Included Files

### `lib/mongodb.ts`

This file handles the connection between our Next.js application and MongoDB database using Mongoose.

Responsibilities:
- Connects the application with MongoDB Atlas.
- Checks whether the MongoDB connection URL exists.
- Provides a reusable database connection function.
- Helps API routes communicate with the database.

Example:

```ts
connectDB()