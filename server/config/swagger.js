import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",

  info: {
    title: "Career Portal API",
    version: "1.0.0",
    description: "REST API for managing job listings and job applications.",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],

  tags: [
    {
      name: "Authentication",
      description: "Authentication and current-user endpoints",
    },
    {
      name: "Jobs",
      description: "Job listing management",
    },
    {
      name: "Applications",
      description: "Job application management",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token.",
      },
    },

    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          firstName: {
            type: "string",
            example: "Victor",
          },
          lastName: {
            type: "string",
            example: "Kamau",
          },
          email: {
            type: "string",
            format: "email",
            example: "admin@example.com",
          },
          role: {
            type: "string",
            example: "admin",
          },
        },
      },

      CurrentUser: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          firstName: {
            type: "string",
            example: "Victor",
          },
          lastName: {
            type: "string",
            example: "Kamau",
          },
          email: {
            type: "string",
            format: "email",
            example: "admin@example.com",
          },
          role: {
            type: "string",
            example: "admin",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-26T19:58:55.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-26T19:58:55.000Z",
          },
        },
      },

      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "admin@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "password123",
          },
        },
      },

      LoginResponse: {
        type: "object",
        properties: {
          user: {
            $ref: "#/components/schemas/User",
          },
          token: {
            type: "string",
            description: "JWT authentication token.",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },

      Job: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 14,
          },
          title: {
            type: "string",
            maxLength: 50,
            example: "Chef",
          },
          department: {
            type: "string",
            maxLength: 50,
            example: "Service",
          },
          location: {
            type: "string",
            maxLength: 50,
            example: "Kasarani",
          },
          employmentType: {
            type: "string",
            enum: [
              "Full-time",
              "Part-time",
              "Contract",
              "Internship",
              "Temporary",
              "Remote",
            ],
            example: "Full-time",
          },
          description: {
            type: "string",
            example: "Cook amazing food.",
          },
          requirements: {
            type: "string",
            example: "Previous professional cooking experience.",
          },
          salary: {
            type: "string",
            maxLength: 50,
            example: "200000.00",
          },
          currency: {
            type: "string",
            maxLength: 10,
            example: "KES",
          },
          imagePath: {
            type: "string",
            description: "Filename of the image stored on the server.",
            example: "d8ab771f-0a7d-442c-a16c-6ed91b5ff9c3.jpeg",
          },
          imageUrl: {
            type: "string",
            format: "uri",
            description: "Public URL of the job image.",
            example:
              "http://localhost:5000/uploads/job_pictures/d8ab771f-0a7d-442c-a16c-6ed91b5ff9c3.jpeg",
          },
          deadline: {
            type: "string",
            format: "date-time",
            example: "2026-08-25T21:00:00.000Z",
          },
          status: {
            type: "string",
            enum: ["Draft", "Open", "Closed", "Archived"],
            example: "Open",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Application: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          jobId: {
            type: "integer",
            example: 14,
          },
          firstName: {
            type: "string",
            maxLength: 20,
            example: "John",
          },
          lastName: {
            type: "string",
            maxLength: 20,
            example: "Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john.doe@example.com",
          },
          phone: {
            type: "string",
            maxLength: 20,
            example: "+254712345678",
          },
          nationalId: {
            type: "string",
            maxLength: 50,
            example: "12345678",
          },
          skills: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["JavaScript", "Node.js", "MariaDB"],
          },
          supportingLinks: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
            example: [
              "https://github.com/example",
              "https://linkedin.com/in/example",
            ],
          },
          coverLetter: {
            type: "string",
            maxLength: 5000,
            example:
              "I am interested in this position because my experience matches the requirements.",
          },
          resumeFilename: {
            type: "string",
            description: "Filename of the resume stored on the server.",
            example: "1722693748291-resume.pdf",
          },
          resumeUrl: {
            type: "string",
            format: "uri",
            description: "Public URL of the uploaded resume.",
            example:
              "http://localhost:5000/uploads/resumes/1722693748291-resume.pdf",
          },
          status: {
            type: "string",
            enum: [
              "Submitted",
              "Under Review",
              "Interview",
              "Offer",
              "Rejected",
              "Withdrawn",
            ],
            example: "Submitted",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Resource not found",
          },
        },
      },
    },
  },

  paths: {
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login",
        description: "Authenticate a user and receive a JWT token.",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Login successful",
                    },
                    data: {
                      $ref: "#/components/schemas/LoginResponse",
                    },
                  },
                },
              },
            },
          },

          401: {
            description: "Invalid email or password",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },

    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current user",
        description: "Return the currently authenticated user.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          200: {
            description: "Authenticated user retrieved successfully",
          },

          401: {
            description: "Authentication failed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },

    "/api/jobs": {
      get: {
        tags: ["Jobs"],
        summary: "List jobs",
        description: "Retrieve a paginated list of jobs with optional filters.",

        parameters: [
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 10,
            },
          },
          {
            name: "search",
            in: "query",
            schema: {
              type: "string",
            },
          },
          {
            name: "department",
            in: "query",
            schema: {
              type: "string",
            },
          },
          {
            name: "location",
            in: "query",
            schema: {
              type: "string",
            },
          },
          {
            name: "employmentType",
            in: "query",
            schema: {
              type: "string",
              enum: [
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Temporary",
                "Remote",
              ],
            },
          },
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              enum: ["Draft", "Open", "Closed", "Archived"],
              default: "Open",
            },
          },
          {
            name: "sort",
            in: "query",
            schema: {
              type: "string",
              enum: [
                "created_at",
                "deadline",
                "title",
                "department",
                "location",
              ],
              default: "created_at",
            },
          },
          {
            name: "order",
            in: "query",
            schema: {
              type: "string",
              enum: ["ASC", "DESC"],
              default: "DESC",
            },
          },
        ],

        responses: {
          200: {
            description: "Jobs retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Jobs retrieved successfully",
                    },
                    data: {
                      type: "object",
                      properties: {
                        jobs: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/Job",
                          },
                        },
                        pagination: {
                          type: "object",
                          properties: {
                            page: {
                              type: "integer",
                              example: 1,
                            },
                            limit: {
                              type: "integer",
                              example: 10,
                            },
                            total: {
                              type: "integer",
                              example: 25,
                            },
                            totalPages: {
                              type: "integer",
                              example: 3,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      post: {
        tags: ["Jobs"],
        summary: "Create a job",
        description: "Create a new job listing with an image.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: [
                  "title",
                  "department",
                  "location",
                  "employmentType",
                  "description",
                  "requirements",
                  "image",
                  "deadline",
                ],
                properties: {
                  title: {
                    type: "string",
                    maxLength: 50,
                    example: "Chef",
                  },
                  department: {
                    type: "string",
                    maxLength: 50,
                    example: "Service",
                  },
                  location: {
                    type: "string",
                    maxLength: 50,
                    example: "Kasarani",
                  },
                  employmentType: {
                    type: "string",
                    enum: [
                      "Full-time",
                      "Part-time",
                      "Contract",
                      "Internship",
                      "Temporary",
                      "Remote",
                    ],
                  },
                  description: {
                    type: "string",
                    example: "Cook amazing food.",
                  },
                  requirements: {
                    type: "string",
                    example: "Previous professional cooking experience.",
                  },
                  salary: {
                    type: "string",
                    maxLength: 50,
                    example: "200000",
                  },
                  currency: {
                    type: "string",
                    maxLength: 10,
                    example: "KES",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                    description: "Job image. JPEG, PNG, or WEBP, maximum 5 MB.",
                  },
                  deadline: {
                    type: "string",
                    format: "date-time",
                    example: "2026-08-25T21:00:00.000Z",
                  },
                  status: {
                    type: "string",
                    enum: ["Draft", "Open", "Closed", "Archived"],
                    default: "Draft",
                  },
                },
              },
            },
          },
        },

        responses: {
          201: {
            description: "Job created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Job created successfully",
                    },
                    data: {
                      $ref: "#/components/schemas/Job",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },
        },
      },
    },

    "/api/jobs/title/{title}": {
      get: {
        tags: ["Jobs"],
        summary: "Get job by title",

        parameters: [
          {
            name: "title",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            example: "Chef",
          },
        ],

        responses: {
          200: {
            description: "Job retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Jobs retrieved successfully",
                    },
                    data: {
                      $ref: "#/components/schemas/Job",
                    },
                  },
                },
              },
            },
          },

          404: {
            description: "Job not found",
          },
        },
      },
    },

    "/api/jobs/{jobId}": {
      get: {
        tags: ["Jobs"],
        summary: "Get job by ID",

        parameters: [
          {
            name: "jobId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        responses: {
          200: {
            description: "Job retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Job retrieved successfully",
                    },
                    data: {
                      $ref: "#/components/schemas/Job",
                    },
                  },
                },
              },
            },
          },

          404: {
            description: "Job not found",
          },
        },
      },

      patch: {
        tags: ["Jobs"],
        summary: "Update a job",
        description: "Update an existing job listing.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "jobId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    maxLength: 50,
                  },
                  department: {
                    type: "string",
                    maxLength: 50,
                  },
                  location: {
                    type: "string",
                    maxLength: 50,
                  },
                  employmentType: {
                    type: "string",
                    enum: [
                      "Full-time",
                      "Part-time",
                      "Contract",
                      "Internship",
                      "Temporary",
                      "Remote",
                    ],
                  },
                  description: {
                    type: "string",
                  },
                  requirements: {
                    type: "string",
                  },
                  salary: {
                    type: "string",
                    maxLength: 50,
                  },
                  currency: {
                    type: "string",
                    maxLength: 10,
                  },
                  image: {
                    type: "string",
                    format: "binary",
                    description:
                      "Optional replacement image. JPEG, PNG, or WEBP, maximum 5 MB.",
                  },
                  deadline: {
                    type: "string",
                    format: "date-time",
                  },
                  status: {
                    type: "string",
                    enum: ["Draft", "Open", "Closed", "Archived"],
                  },
                },
              },
            },
          },
        },

        responses: {
          200: {
            description: "Job updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Job updated successfully",
                    },
                    data: {
                      $ref: "#/components/schemas/Job",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Validation error",
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },

          404: {
            description: "Job not found",
          },
        },
      },

      delete: {
        tags: ["Jobs"],
        summary: "Delete a job",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "jobId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        responses: {
          204: {
            description: "Job deleted successfully",
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },

          404: {
            description: "Job not found",
          },
        },
      },
    },

    "/api/jobs/{jobId}/applications": {
      get: {
        tags: ["Applications"],
        summary: "List applications for a job",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "jobId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        responses: {
          200: {
            description: "Applications retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Applications retrieved successfully",
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Application",
                      },
                    },
                  },
                },
              },
            },
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },
        },
      },

      post: {
        tags: ["Applications"],
        summary: "Submit a job application",
        description: "Submit an application for a job with a resume.",

        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: [
                  "firstName",
                  "lastName",
                  "email",
                  "phone",
                  "nationalId",
                  "skills",
                  "coverLetter",
                  "resume",
                ],
                properties: {
                  firstName: {
                    type: "string",
                    maxLength: 20,
                    example: "John",
                  },
                  lastName: {
                    type: "string",
                    maxLength: 20,
                    example: "Doe",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    example: "john.doe@example.com",
                  },
                  phone: {
                    type: "string",
                    maxLength: 20,
                    example: "+254712345678",
                  },
                  nationalId: {
                    type: "string",
                    maxLength: 50,
                    example: "12345678",
                  },
                  skills: {
                    type: "string",
                    description:
                      "JSON-encoded array containing at least one skill.",
                    example: '["JavaScript","Node.js","MariaDB"]',
                  },
                  supportingLinks: {
                    type: "string",
                    description:
                      "Optional JSON-encoded array of supporting links.",
                    example:
                      '["https://github.com/example","https://linkedin.com/in/example"]',
                  },
                  coverLetter: {
                    type: "string",
                    maxLength: 5000,
                    example:
                      "I am interested in this position because my experience matches the requirements.",
                  },
                  resume: {
                    type: "string",
                    format: "binary",
                    description: "Resume file uploaded by the applicant.",
                  },
                },
              },
            },
          },
        },

        parameters: [
          {
            name: "jobId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        responses: {
          201: {
            description: "Application submitted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Application submitted successfully",
                    },
                    data: {
                      $ref: "#/components/schemas/Application",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Validation error or missing resume",
          },

          404: {
            description: "Job not found",
          },

          409: {
            description: "Applicant has already applied for this job",
          },
        },
      },
    },

    "/api/applications": {
      get: {
        tags: ["Applications"],
        summary: "List all applications",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          200: {
            description: "Applications retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Applications retrieved successfully",
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Application",
                      },
                    },
                  },
                },
              },
            },
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },
        },
      },
    },

    "/api/applications/{applicationId}": {
      get: {
        tags: ["Applications"],
        summary: "Get application by ID",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "applicationId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        responses: {
          200: {
            description: "Application retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Application retrieved successfully",
                    },
                    data: {
                      $ref: "#/components/schemas/Application",
                    },
                  },
                },
              },
            },
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },

          404: {
            description: "Application not found",
          },
        },
      },

      delete: {
        tags: ["Applications"],
        summary: "Delete application",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "applicationId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        responses: {
          204: {
            description: "Application deleted successfully",
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },

          404: {
            description: "Application not found",
          },
        },
      },
    },

    "/api/applications/{applicationId}/status": {
      patch: {
        tags: ["Applications"],
        summary: "Update application status",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "applicationId",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: {
                    type: "string",
                    enum: [
                      "Submitted",
                      "Under Review",
                      "Interview",
                      "Offer",
                      "Rejected",
                      "Withdrawn",
                    ],
                    example: "Under Review",
                  },
                },
              },
            },
          },
        },

        responses: {
          200: {
            description: "Application status updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Application status updated successfully",
                    },
                    data: {
                      $ref: "#/components/schemas/Application",
                    },
                  },
                },
              },
            },
          },

          400: {
            description: "Invalid application status",
          },

          401: {
            description: "Authentication required",
          },

          403: {
            description: "Admin access required",
          },

          404: {
            description: "Application not found",
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;