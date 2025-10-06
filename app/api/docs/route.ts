import swaggerJsdoc from 'swagger-jsdoc';
import { NextResponse } from 'next/server';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Career AI Assistant API',
            version: '1.0.0',
            description: 'API documentation for the Career AI Assistant application',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://your-domain.com'
                    : 'http://localhost:3000',
                description: 'API Server',
            },
        ],
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication and session management endpoints',
            },
            {
                name: 'User',
                description: 'User account and session information endpoints',
            },
            {
                name: 'Profile',
                description: 'User profile management endpoints',
            },
            {
                name: 'Drafts',
                description: 'Job application draft management endpoints',
            },
        ],
        components: {
            securitySchemes: {
                sessionAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'session',
                    description: 'Session-based authentication using iron-session',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the user',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User registration date',
                        },
                    },
                },
                Profile: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the profile',
                        },
                        userId: {
                            type: 'string',
                            description: 'Reference to the user',
                        },
                        name: {
                            type: 'string',
                            description: 'User full name',
                        },
                        title: {
                            type: 'string',
                            description: 'Professional title',
                        },
                        experience: {
                            type: 'string',
                            description: 'Work experience details',
                        },
                        education: {
                            type: 'string',
                            description: 'Education background',
                        },
                        skills: {
                            type: 'string',
                            description: 'Technical and professional skills',
                        },
                        strengths: {
                            type: 'string',
                            description: 'Comma-separated list of strengths',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                    },
                },
                Draft: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the draft',
                        },
                        userId: {
                            type: 'string',
                            description: 'Reference to the user who created the draft',
                        },
                        content: {
                            type: 'string',
                            description: 'Draft content text',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Draft creation timestamp',
                        },
                    },
                },
                Job: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the job',
                        },
                        userId: {
                            type: 'string',
                            description: 'Reference to the user',
                        },
                        description: {
                            type: 'string',
                            description: 'Job description or application content',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Job creation timestamp',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message',
                        },
                        authenticated: {
                            type: 'boolean',
                            description: 'Authentication status',
                        },
                    },
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Operation success status',
                        },
                        message: {
                            type: 'string',
                            description: 'Success message',
                        },
                    },
                },
            },
        },
    },
    apis: ['./app/api/**/*.ts'], // Path to the API files
};

const specs = swaggerJsdoc(options);

export async function GET() {
    return NextResponse.json(specs);
}