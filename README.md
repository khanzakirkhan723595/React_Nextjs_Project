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