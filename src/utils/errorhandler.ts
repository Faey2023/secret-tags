import { Prisma } from '@prisma/client';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class ExtendedError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function handleError(error: unknown, defaultStatusCode = 500) {
    const defaultErrorMessage = 'Unknown error';
    let errorMessage = defaultErrorMessage;
    let statusCode = defaultStatusCode;

    if (error instanceof ExtendedError) {
        statusCode = error.statusCode;
        errorMessage = error.message;
    } else if (error instanceof ZodError) {
        statusCode = 400;
        errorMessage = error.issues.map((e) => e.message).join(", ");
    } else if (error instanceof AxiosError) {
        console.error(error.response?.data);
        statusCode = error.response?.status || defaultStatusCode;
        const responseData = error.response?.data;
        if (isString(responseData?.error?.message)) {
            errorMessage = responseData.error.message;
        } else if (isString(responseData?.error)) {
            errorMessage = responseData.error;
        } else if (isString(responseData?.message)) {
            errorMessage = responseData.message;
        } else if (isString(responseData)) {
            errorMessage = responseData;
        }
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(JSON.stringify(error, null, 2));
        const message = error.meta?.error || error.message;
        if (typeof message === 'string') {
            errorMessage = message;
        }
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error(JSON.stringify(error, null, 2));
        if (typeof error.message === 'string') {
            errorMessage = error.message;
        }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        if (typeof error.message === 'string') {
            errorMessage = error.message;
        }
    } else if (error instanceof Error) {
        console.error(error.message);
        errorMessage = error.message;
    } else {
        console.error(error);
    }

    return NextResponse.json({
        message: errorMessage,
        success: false,
        status: statusCode,
    });
}
