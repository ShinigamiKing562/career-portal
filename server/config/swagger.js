import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",

    info: {
      title: "Career Portal API",
      version: "1.0.0",
      description: "REST API for the Career Portal backend.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],

    tags: [
      {
        name: "Jobs",
        description: "Manage job postings",
      },
      {
        name: "Applications",
        description: "Manage job applications",
      },
    ],

    components: {
      schemas: {
        Job: {
          type: "object",
          required: [
            "title",
            "department",
            "location",
            "employmentType",
            "description",
            "requirements",
            "deadline",
          ],
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            title: {
              type: "string",
              example: "Backend Developer",
            },
            department: {
              type: "string",
              example: "Engineering",
            },
            location: {
              type: "string",
              example: "Nairobi",
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
              example: "Develop and maintain REST APIs.",
            },
            requirements: {
              type: "string",
              example: "Node.js, Express.js, MySQL",
            },
            salary: {
              type: "string",
              example: "KES 150,000",
            },
            deadline: {
              type: "string",
              format: "date",
              example: "2026-12-31",
            },
            status: {
              type: "string",
              enum: ["Open", "Closed"],
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
          required: ["firstName", "lastName", "email"],
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            jobId: {
              type: "integer",
              example: 4,
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
              example: "victor@example.com",
            },
            phone: {
              type: "string",
              example: "0712345678",
            },
            coverLetter: {
              type: "string",
              example: "I am interested in this position.",
            },
            resume: {
              type: "string",
              format: "binary",
              description: "Resume file uploaded by the applicant.",
            },
            resumeFilename: {
              type: "string",
              example: "1722693748291-resume.pdf",
              description: "Filename stored on the server.",
            },
            status: {
              type: "string",
              enum: [
                "Submitted",
                "Under Review",
                "Shortlisted",
                "Rejected",
                "Accepted",
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

        Pagination: {
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
              example: 42,
            },
            totalPages: {
              type: "integer",
              example: 5,
            },
          },
        },

        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation completed successfully.",
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Job not found",
            },
          },
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

export default swaggerJsdoc(options);
