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
            },
            requirements: {
              type: "string",
            },
            salaryMin: {
              type: "number",
              example: 150000,
            },
            salaryMax: {
              type: "number",
              example: 250000,
            },
            currency: {
              type: "string",
              example: "KES",
            },
            deadline: {
              type: "string",
              format: "date",
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
