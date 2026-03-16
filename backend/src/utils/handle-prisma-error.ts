//This file needs to be worked on.
//  It is meant to be a global error handler for all Prisma related errors.
//  It should be used in the main app file as the last middleware, after all routes have been defined. 
// This way, any Prisma error that occurs in any route will be caught and handled here, providing consistent error responses across the entire application.
// I have used AI to generate this, but it needs work to sent appropriate status codes and messages based on the error type.

import { Prisma } from '../generated/prisma/client.js';
import { Request, Response, NextFunction } from 'express';

export function PrismaErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': 
        const target = (err.meta?.target as string[])?.join(', ') || 'field';
        return res.status(409).json({
          status: 'error',
          message: `A record with this ${target} already exists.`,
        });
      case 'P2025': 
        return res.status(404).json({
          status: 'error',
          message: 'The requested resource could not be found.',
        });
      default:
        return res.status(400).json({
          status: 'error',
          message: `Database error: ${err.message}`,
        });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid data provided or missing required fields.',
    });
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    console.error('Prisma Initialization Error:', err.message);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to connect to the database.',
    });
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error('Prisma Unknown Request Error:', err.message);
    return res.status(500).json({
      status: 'error',
      message: 'An unknown database error occurred.',
    });
  }


  if (err instanceof Prisma.PrismaClientRustPanicError) {
    console.error('CRITICAL: Prisma Rust Panic Error:', err.message);
    return res.status(500).json({
      status: 'error',
      message: 'A critical database engine error occurred.',
    });
  }

  next(err);
};