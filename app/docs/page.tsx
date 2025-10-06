"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function DocsPage() {
    const [spec, setSpec] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpec = async () => {
            try {
                const response = await fetch('/api/docs');
                if (!response.ok) {
                    throw new Error('Failed to load API specification');
                }
                const data = await response.json();
                setSpec(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load documentation');
            } finally {
                setLoading(false);
            }
        };

        fetchSpec();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading API Documentation...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                        <h2 className="text-lg font-semibold text-red-800 mb-2">
                            Documentation Error
                        </h2>
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                API Documentation
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Interactive documentation for the Career AI Assistant API
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                v1.0.0
                            </span>
                            <a
                                href="/"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                ← Back to App
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="max-w-7xl mx-auto">
                    {spec && (
                        <SwaggerUI
                            spec={spec}
                            docExpansion="list"
                            defaultModelExpandDepth={2}
                            defaultModelsExpandDepth={1}
                            displayOperationId={false}
                            displayRequestDuration={true}
                            filter={true}
                            showExtensions={true}
                            showCommonExtensions={true}
                            tryItOutEnabled={true}
                            deepLinking={true}
                            layout="BaseLayout"
                            plugins={[]}
                            supportedSubmitMethods={['get', 'post', 'put', 'delete', 'patch']}
                        />
                    )}
                </div>
            </div>

            <style jsx global>{`
                /* Hide default Swagger UI topbar */
                .swagger-ui .topbar {
                    display: none;
                }
                
                /* Improve overall styling */
                .swagger-ui {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                /* Better info section */
                .swagger-ui .info {
                    margin: 30px 0;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 8px;
                }
                
                .swagger-ui .info .title {
                    color: white;
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                
                .swagger-ui .info .description {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1.1rem;
                }
                
                /* Scheme container styling */
                .swagger-ui .scheme-container {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                }
                
                /* Operation sections */
                .swagger-ui .opblock-tag {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin: 30px 0 15px 0;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #e2e8f0;
                }
                
                /* Individual operations */
                .swagger-ui .opblock {
                    border-radius: 8px;
                    margin-bottom: 15px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                }
                
                /* HTTP method colors */
                .swagger-ui .opblock.opblock-get {
                    border-left: 4px solid #10b981;
                }
                
                .swagger-ui .opblock.opblock-post {
                    border-left: 4px solid #3b82f6;
                }
                
                .swagger-ui .opblock.opblock-put {
                    border-left: 4px solid #f59e0b;
                }
                
                .swagger-ui .opblock.opblock-delete {
                    border-left: 4px solid #ef4444;
                }
                
                /* Operation headers */
                .swagger-ui .opblock .opblock-summary {
                    padding: 15px 20px;
                    background: #fafbfc;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .swagger-ui .opblock .opblock-summary-method {
                    font-weight: 700;
                    text-transform: uppercase;
                    padding: 4px 8px;
                    border-radius: 4px;
                    color: white;
                    min-width: 70px;
                    text-align: center;
                }
                
                /* Try it out button */
                .swagger-ui .btn.try-out__btn {
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-weight: 500;
                    transition: all 0.2s;
                }
                
                .swagger-ui .btn.try-out__btn:hover {
                    background: #2563eb;
                    transform: translateY(-1px);
                }
                
                /* Execute button */
                .swagger-ui .btn.execute {
                    background: #10b981;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                
                .swagger-ui .btn.execute:hover {
                    background: #059669;
                    transform: translateY(-1px);
                }
                
                /* Parameter inputs */
                .swagger-ui .parameters-col_description input,
                .swagger-ui .parameters-col_description textarea {
                    border: 2px solid #e2e8f0;
                    border-radius: 6px;
                    padding: 8px 12px;
                    transition: border-color 0.2s;
                }
                
                .swagger-ui .parameters-col_description input:focus,
                .swagger-ui .parameters-col_description textarea:focus {
                    border-color: #3b82f6;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                
                /* Response section */
                .swagger-ui .responses-inner {
                    padding: 20px;
                    background: #f8fafc;
                    border-radius: 8px;
                    margin-top: 15px;
                }
                
                /* Model sections */
                .swagger-ui .model-box {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 10px 0;
                }
                
                .swagger-ui .model-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .swagger-ui .model {
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    padding: 15px;
                    overflow-x: auto;
                }
                
                .swagger-ui .model-toggle {
                    font-size: 0.875rem;
                    color: #6b7280;
                    margin-left: 10px;
                    cursor: pointer;
                }
                
                .swagger-ui .model-toggle:hover {
                    color: #3b82f6;
                }
                
                /* Schema property styling */
                .swagger-ui .property-row {
                    padding: 8px 0;
                    border-bottom: 1px solid #f3f4f6;
                }
                
                .swagger-ui .property-row:last-child {
                    border-bottom: none;
                }
                
                .swagger-ui .prop-name {
                    font-weight: 600;
                    color: #1f2937;
                }
                
                .swagger-ui .prop-type {
                    color: #059669;
                    font-weight: 500;
                }
                
                .swagger-ui .prop-format {
                    color: #7c3aed;
                    font-style: italic;
                }
                
                /* Schema section headers */
                .swagger-ui .models-control {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin: 30px 0 20px 0;
                    padding: 15px 0;
                    border-bottom: 2px solid #e2e8f0;
                }
                
                /* Fix schema container */
                .swagger-ui .scheme-container {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                }
                
                /* Model example styling */
                .swagger-ui .model-example {
                    background: #f1f5f9;
                    border: 1px solid #cbd5e1;
                    border-radius: 6px;
                    padding: 15px;
                    margin-top: 15px;
                }
                
                /* Fix for broken schema display */
                .swagger-ui .models {
                    border: none;
                    background: transparent;
                }
                
                .swagger-ui .model-container {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    margin: 10px 0;
                    overflow: hidden;
                }
                
                .swagger-ui .model-box-control {
                    background: #f8fafc;
                    padding: 15px 20px;
                    border-bottom: 1px solid #e2e8f0;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .swagger-ui .model-box-control:hover {
                    background: #f1f5f9;
                }
                
                .swagger-ui .model-box-control .model-title {
                    margin: 0;
                    border: none;
                    padding: 0;
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #1f2937;
                }
                
                /* Filter box */
                .swagger-ui .operation-filter-input {
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 12px 16px;
                    font-size: 16px;
                    width: 100%;
                    max-width: 400px;
                    transition: border-color 0.2s;
                }
                
                .swagger-ui .operation-filter-input:focus {
                    border-color: #3b82f6;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                
                /* Responsive improvements */
                @media (max-width: 768px) {
                    .swagger-ui .info {
                        margin: 15px;
                        padding: 15px;
                    }
                    
                    .swagger-ui .opblock .opblock-summary {
                        padding: 10px 15px;
                    }
                    
                    .swagger-ui .operation-filter-input {
                        font-size: 16px;
                    }
                }
            `}</style>
        </div>
    );
}